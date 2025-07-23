import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("stock", parseInt(formData.stock));

    images.forEach((image) => payload.append("images", image));

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3NGY5NDZhMDA2MjM1N2FjYTk3MTQ4In0sImlhdCI6MTc1MjUxMjYxMX0.mQZUcEoJ2s1B3q9KZbOftH26fEdkeOsiZM3w6PONvek";

      const response = await axios.post("http://localhost:5000/product/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
      });

      Swal.fire("Success!", "Product created successfully.", "success");
      console.log("Product Created:", response.data);

      // Reset form and file input
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
      });
      setImages([]);
      e.target.reset(); // Clears file input and form fields
    } catch (error) {
      Swal.fire("Error", error.response?.data?.details || "Failed to create product", "error");
      console.error("Create Product Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold">Create Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Electronics">Electronics</option>
        <option value="Kids">Kids</option>
        <option value="Accessories">Accessories</option>
        <option value="Furniture">Furniture</option>
      </select>

      <input
        type="number"
        name="stock"
        placeholder="Stock (optional)"
        value={formData.stock}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
};

export default CreateProductForm;
