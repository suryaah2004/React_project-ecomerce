import React, { useState } from "react";
import { addProducts } from "../service/All-API";
const AddProduct = () => {

    const [product, setProduct] = useState(
        {
            name: "",
            productCode: "",
            price: "",
            category: "",
            description: "",
            stock: ""
        }
    )

    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("name", product.name)
            formdata.append('productCode', product.productCode)
            formdata.append('price', product.price)
            formdata.append('category', product.category)
            formdata.append('description', product.description)
            formdata.append('stock', product.stock)
            formdata.append('image', image)

            const res = await addProducts(formdata)
            console.log(res.data)

            setProduct({
                name: "",
                productCode: "",
                price: "",
                category: "",
                description: "",
                stock: ""
            })
            setImage(null)
        }

        catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-amber-100 p-6 w-[50em] rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="text"
                        name="productCode"
                        placeholder="Product Code"
                        value={product.productCode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Add Product
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AddProduct;





