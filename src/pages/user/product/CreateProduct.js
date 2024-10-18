import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themeContext";
import { useAddProduct } from "../../../hooks/Product/useProduct";
import LocationSelectorp from "../../../components/Location/LocationP";
import CategoryList from "./components/categoryList";
import { useToastDesign } from "../../../context/ToastService";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  Col,
  Row,
  Button,
} from "antd";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  tablePlugin,
  InsertTable,
  // InsertCodeBlock,
} from "@mdxeditor/editor";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateProduct = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [fettle, setFettle] = useState("in_stock");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useToastDesign();
  const { mutate: addProductMutation } = useAddProduct();

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleImageChange = (info) => {
    const files = info.fileList.map((file) => ({
      file: file.originFileObj,
      preview: URL.createObjectURL(file.originFileObj),
    }));

    if (files.length <= 4) {
      setSelectedFiles(files);
    } else {
      alert("You can only upload up to 4 files.");
    }
  };

  const handleCategoryChange = (newSelectedCategories) => {
    setCategory(
      newSelectedCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }))
    );
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setPrice("");
    } else {
      setPrice(value);
    }
  };

  const handleLocationChange = (formattedLocation) => {
    setLocation(formattedLocation);
  };

  const handleSubmit = async (values) => {
    // Ensure the required fields are filled
    if (!title || !category.length || !price) {
      addNotification("Please fill out all required fields", "error");
      return;
    }

    const numericPrice = parseFloat(price);
    const numericQuantity = parseInt(quantity);

    // Check for valid price and quantity
    if (isNaN(numericPrice)) {
      addNotification("Price is not a valid number", "error");
      return;
    }

    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      addNotification("Quantity is not valid", "error");
      return;
    }

    // Prepare new product data
    const newProductData = {
      title,
      quantity: numericQuantity,
      description: description,
      condition,
      fettle,
      location,
      category: category.map((cat) => cat.id).filter(Boolean),
      price: numericPrice,
      phone_number,
      images: selectedFiles.map((file) => file.file),
    };

    setLoading(true);
    try {
      await addProductMutation(newProductData, {
        onSuccess: () => {
          navigate("/san_pham");
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-24 font-bold mb-6">Tạo Sản Phẩm</h1>
      <Form
        onFinish={handleSubmit} // Dùng onFinish để xử lý submit
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        style={{
          width: "100%",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Tên sản phẩm" name="productName">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Số lượng" name="productQuantity">
              <InputNumber
                min={1} // Đảm bảo số lượng phải >= 1
                value={quantity}
                onChange={(value) => setQuantity(value)}
              />
            </Form.Item>
            <Form.Item
              label="Upload Images (max 4)"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                listType="picture-card"
                multiple
                maxCount={4}
                onChange={handleImageChange}
                beforeUpload={() => false} // Ngăn không cho tự động tải lên
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Tình Trạng">
              <Radio.Group
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <Radio value="new"> Mới </Radio>
                <Radio value="used"> Đã Sử Dụng </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Trạng Thái" name="fettle">
              <Select value={fettle} onChange={(value) => setFettle(value)}>
                <Select.Option value="in_stock">Còn Hàng</Select.Option>
                <Select.Option value="out_of_stock">Hết Hàng</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Chi tiết sản phẩm">
              <MDXEditor
                markdown={description}
                plugins={[
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertTable />
                      </>
                    ),
                  }),
                  tablePlugin(),
                ]}
                onChange={(value) => setDescription(value)} // Thay đổi ở đây
                style={{ width: "100%", height: "500px" }} // Điều chỉnh chiều rộng và chiều cao
              />
            </Form.Item>

            <Form.Item label="Vị Trí" name="location">
              <LocationSelectorp
                onLocationChange={handleLocationChange}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Danh Mục" name="category">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                Danh Mục
              </label>
              <CategoryList
                selectedCategories={category}
                onCategoryChange={handleCategoryChange}
              />
            </Form.Item>

            <Form.Item label="Giá Tiền" name="price">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={handlePriceChange}
                className={`w-full p-2 border rounded-md ${
                  theme === "dark"
                    ? "bg-zinc-700 text-white border-zinc-600"
                    : "bg-white text-black border-zinc-800"
                }`}
              />
            </Form.Item>
            <Form.Item label="Số Điện Thoại" name="phone_number">
              <Input
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10} // Giới hạn số ký tự nhập vào
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          {loading ? "Đang Tạo..." : "Tạo Sản Phẩm"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
