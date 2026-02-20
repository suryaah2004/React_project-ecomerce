import React, { useState } from "react";
import AllProducts from "../components/UiAllProducts";
import { getAllCategories } from '../service/All-API'
import { useEffect } from "react";

const ProductList = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const Categories = await getAllCategories()
            if (Categories.status === 200)
                setCategory(Categories.data.Categories)
            console.log(Categories)
        }
        catch (error) {
            console.log('server error', error)
        }
    }

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">All Products</h1>

            
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border p-2 rounded w-60"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex items-center gap-2 text-sm font-semibold">
                    <span
                        className={`cursor-pointer ${category === "all" ? "text-blue-600" : ""}`}

                        onClick={() => getCategories()}
                    >
                        All Products
                    </span>
                    <span>|</span>

                    <span
                        className={`cursor-pointer ${category === "Kids" ? "text-blue-600" : ""}`}
                        onClick={() => setCategory("Kids")}
                    >
                        Kids
                    </span>
                    <span>|</span>

                    <span
                        className={`cursor-pointer ${category === "Women" ? "text-blue-600" : ""}`}
                        onClick={() => setCategory("Women")}
                    >
                        Women
                    </span>
                    <span>|</span>

                    <span
                        className={`cursor-pointer ${category === "Men" ? "text-blue-600" : ""}`}
                        onClick={() => setCategory("Men")}
                    >
                        Men
                    </span>
                </div>


            </div>

            
            <AllProducts search={search} category={category} page={page} />

           
            <div className="flex justify-center mt-8 gap-2">
                <button onClick={() => setPage(1)} className="px-3 py-1 border">1</button>
                <button onClick={() => setPage(2)} className="px-3 py-1 border">2</button>
                <button onClick={() => setPage(3)} className="px-3 py-1 border">3</button>
            </div>

        </div>
    );
};

export default ProductList;



