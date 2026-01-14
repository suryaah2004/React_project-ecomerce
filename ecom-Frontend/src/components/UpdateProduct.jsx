import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProducts, getSingleProduct } from "../service/All-API";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    productCode: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(id);
        setProduct({
          name: res.data.product.name || "",
          productCode: res.data.product.productCode || "",
          description: res.data.product.description || "",
          price: res.data.product.price || "",
          category: res.data.product.category || "",
          stock: res.data.product.stock || "",
          image: null,
        });
        console.log(res);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("productCode", product.productCode);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await updateProducts(id, formData);
      navigate("/adminDashboard/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Update Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="productCode"
          value={product.productCode}
          onChange={handleChange}
          type="text"
          placeholder="Product Code"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          type="number"
          placeholder="Stock"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;





