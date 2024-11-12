import React, { useEffect, useState, useRef } from "react";
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineWarning,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProduct,
  useProductDetail,
} from "../../../hooks/Product/useProduct";
import CategoryList from "./components/categoryList";
import { useToastDesign } from "../../../context/ToastService";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  tablePlugin,
  InsertTable,
} from "@mdxeditor/editor";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  message,
  Row,
  Col,
  Typography,
} from "antd";
const { Text } = Typography;
const { Option } = Select;

const EdtProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId);
  const fileInputRef = useRef(null);
  const { mutate: editProductMutation } = useEditProduct();
  const { addNotification } = useToastDesign();

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    condition: "",
    fettle: "",
    media: [],
    location: "",
    category: [],
    description: "",
    price: "",
    phone_number: "",
  });
  const [markdown, setMarkdown] = useState(formData.description);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        quantity: product.quantity || "",
        condition: product.condition || "",
        fettle: product.fettle || "",
        media: product.file || [],
        location: product.location || "",
        category: product.category || [],
        description: product.description || "",
        price: product.price || "",
        phone_number: product.phone_number || "",
      });
      setMarkdown(product.description || "");
      setSelectedFiles(Array.isArray(product.media) ? product.media : []);
    }
  }, [product]);

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is undefined.");
      navigate(-1);
    }
  }, [productId, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...files].slice(0, 4);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (newCategories) => {
    setFormData((prev) => ({
      ...prev,
      category: newCategories,
    }));
  };

  const handleSubmit = async (values) => {
    // values sẽ chứa tất cả các trường từ form
    if (!productId) {
      addNotification("ID sản phẩm không hợp lệ.", "warning");
      return;
    }

    try {
      await editProductMutation({
        productId,
        edtProduct: { ...values, media: selectedFiles },
      });
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDescriptionChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
    setFormData((prev) => ({ ...prev, description: newMarkdown }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Chỉnh Sửa Sản Phẩm</h1>

      <div className="mb-4 p-4 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center">
        <AiOutlineWarning size={24} className="mr-2 text-red-600" />
        <Text>Hãy chắc chắn rằng mỗi hình ảnh không vượt quá 5MB.</Text>
      </div>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          {/* Image Upload Section */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Upload Images (max 4)">
              <Upload
                onChange={handleImageChange}
                fileList={selectedFiles}
                accept="image/*"
                multiple
                showUploadList={false} // Tắt hiển thị danh sách hình ảnh tải lên
              >
                <div className="flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                  <AiOutlinePlus className="text-gray-500" size={24} />
                  <span className="text-gray-500">Chọn hình ảnh</span>
                </div>
              </Upload>

              {/* Hiển thị hình ảnh đã tải lên */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {product.medias && product.medias.length > 0 ? (
                  product.medias.map((media, index) => (
                    <div key={index} className="relative">
                      <img
                        src={media.media} // Sử dụng URL từ `medias`
                        alt={`Media ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <AiOutlineDelete
                        className="absolute top-1 right-1 text-red-500 cursor-pointer"
                        onClick={() => handleRemoveImage(index)} // Cần điều chỉnh nếu bạn có chức năng xóa
                      />
                    </div>
                  ))
                ) : (
                  <Text>Không có hình ảnh nào được tải lên.</Text>
                )}
              </div>
            </Form.Item>
          </Col>

          {/* Product Information Section */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Tên sản phẩm">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
              />
            </Form.Item>
            <Form.Item label="Số lượng">
              <InputNumber
                min={1}
                name="quantity"
                value={formData.quantity}
                onChange={(value) =>
                  setFormData({ ...formData, quantity: value })
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Chi Tiết Sản Phẩm">
              <MDXEditor
                key={markdown}
                markdown={markdown} // Sử dụng giá trị từ state markdown
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
                onChange={handleDescriptionChange} // Cập nhật khi thay đổi
                style={{ width: "100%", height: "500px" }}
              />
            </Form.Item>
          </Col>

          {/* Product Details Section */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Tình Trạng">
              <Select
                name="condition"
                value={formData.condition}
                onChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
                placeholder="Chọn tình trạng"
              >
                <Option value="new">Mới</Option>
                <Option value="used">Đã Sử Dụng</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Trạng Thái">
              <Select
                name="fettle"
                value={formData.fettle}
                onChange={(value) =>
                  setFormData({ ...formData, fettle: value })
                }
                placeholder="Chọn Chất Lượng"
              >
                <Option value="in_stock">Còn hàng</Option>
                <Option value="out_of_stock">Hết hàng</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Vị Trí">
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Nhập vị trí"
              />
            </Form.Item>
            <Form.Item label="Giá">
              <InputNumber
                name="price"
                value={formData.price}
                onChange={(value) => setFormData({ ...formData, price: value })}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Số Điện Thoại">
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
            <Form.Item label="Danh Mục">
              <Select
                mode="multiple"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                placeholder="Chọn danh mục"
              >
                {/* Replace with your category options */}
                <Option value="category1">Danh Mục 1</Option>
                <Option value="category2">Danh Mục 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit" className="mr-2">
            Cập Nhật Sản Phẩm
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700"
          >
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EdtProduct;
