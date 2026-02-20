import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../service/All-API'
import { Link } from 'react-router-dom'

const AllProducts = ({ limit, search, category = "all", page = 1 }) => {

    const [productDetails, setProductDetails] = useState([])

    useEffect(() => {
        allProducts()
    }, [])

    const allProducts = async () => {
        try {
            const response = await getAllProduct()
            if (response.status === 200) {
                setProductDetails(response.data.products)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    let filtered = productDetails;

    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    let displayProducts = filtered.slice(start, end);

    if (limit) {
        displayProducts = filtered.slice(0, limit);
    }
    return (
        <div className="bg-amber-950 text-green-900 p-6">
            <div className="grid grid-cols-1 my-5 sm:grid-cols-2 md:grid-cols-3 gap-6 ">

                {displayProducts.map((items, i) => (
                    <div
                        key={items._id || i}
                        className="bg-amber-50 shadow-md pb-10 hover:shadow-lg mb-10 rounded-md overflow-hidden"
                    >
                        <Link to={`/getSingleProduct/${items._id}`} state={items}>
                            <div className="relative ">
                                <img
                                    className="w-full h-96 object-cover"
                                    src={`http://65.2.132.121:5000/api/uploads/${items.image}`}
                                    alt="image"
                                />

                            </div>

                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-800 truncate">
                                    {items.name}
                                </h3>

                                <p className="text-gray-600 text-xs mt-1">
                                    Stock: {items.stock}
                                </p>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-lg text-gray-800">
                                        ₹{items.price}
                                    </span>

                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    );

}

export default AllProducts
