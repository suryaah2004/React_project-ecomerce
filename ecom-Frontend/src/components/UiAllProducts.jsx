import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../service/All-API'
import { Link } from 'react-router-dom'

const AllProducts = () => {
    const [productDetails, setProductDetails] = useState([])
    useEffect(() => {
        allProducts()
    }, [])

    const allProducts = async () => {
        try {
            const response = await getAllProduct()
            console.log(response);
            if (response.status === 200) {
                setProductDetails(response.data.products)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="flex gap-4 bg-amber-950  text-green-900 p-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">

            {productDetails.map((items, i) => (
                <div
                    key={i}
                    className="max-w-xs snap-center bg-amber-50 shadow-md hover:shadow-lg rounded-md overflow-hidden shrink-0"
                >
                    <Link to={`/getSingleProduct/${items._id}`} data={items}>

                        <div className="relative">
                            <img
                                className="w-52 h-40 object-cover"
                                src={`http://localhost:5000/uploads/${items.image}`}
                                alt='image'
                            />

                            <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm">
                                SALE
                            </span>

                        </div>

                        <div className="p-4">

                            <h3 className="text-lg font-semibold mb-1 text-gray-800">
                                {items.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Stock:{items.stock}
                            </p>
                            <p className="text-gray-600 text-sm mb-3"></p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl text-gray-800">
                                    ₹{items.price}
                                </span>

                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
            }
        </div >
    )
}

export default AllProducts


