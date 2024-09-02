import React, { useState } from "react";
import { useAddProduct } from "../../../hooks/Product/useProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateDemo = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [fettle, setFettle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const { mutate: addProductMutation } = useAddProduct(); // Gọi hook trong component

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles(files);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategory((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((cat) => cat !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      toast.error("Price is not a valid number");
      return;
    }

    const newProductData = {
      title,
      quantity,
      description,
      condition,
      fettle,
      location,
      category,
      price: numericPrice,
      phone_number,
      media: selectedFiles,
    };

    addProductMutation(newProductData, {
      onSuccess: () => {
        toast.success("Sản phẩm đã được thêm thành công!");
        navigate("/san_pham");
      },
      onError: () => {
        toast.error("Failed to add product.");
      },
    });
  };
  return (
    <div>
      <h1>CreateDemo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Condition:</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fettle:</label>
          <input
            type="text"
            value={fettle}
            onChange={(e) => setFettle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <input
            type="checkbox"
            value="1"
            onChange={handleCategoryChange}
          />{" "}
          Category 1
          <input
            type="checkbox"
            value="2"
            onChange={handleCategoryChange}
          />{" "}
          Category 2
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
          <div>
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={file.preview}
                alt={`preview ${index}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />
            ))}
          </div>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateDemo;
