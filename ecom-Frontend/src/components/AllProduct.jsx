import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProduct } from '../service/All-API'
import { Link } from 'react-router-dom'

const AllProduct = () => {
  const [product, setProduct] = useState([])
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' })
  useEffect(() => {
    allProducts()
  }, [])

  const handleDelete = async () => {
    try {
      console.log(deleteModal.id)
      const result = await deleteProduct(deleteModal.id)

      console.log(result)
      setDeleteModal({ open: false, id: "" })
      allProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const allProducts = async () => {
    try {
      const result = await getAllProduct()
      console.log(result)
      if (result.status === 200) {
        setProduct(result.data.products)
        console.log(result.data.products);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="overflow-x-auto p-4">

        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Product Code</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Update</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {product.map((items, i) => (

              <tr key={i} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:5000/uploads/${items.image}`}
                    alt='name'
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="border px-4 py-2">{items.name}</td>
                <td className="border px-4 py-2">{items.productCode}</td>
                <td className="border px-4 py-2">₹{items.price}</td>
                <td className="border px-4 py-2">{items.category}</td>
                <td className="border px-4 py-2">{items.description}</td>
                <td className="border px-4 py-2">{items.stock}</td>
                <td className="border px-4 py-2"><button><Link to={`/adminDashboard/product/update/${items._id}`}><i className="fa-solid fa-pen-to-square"></i></Link></button></td>
                <td className="border px-4 py-2"><button onClick={() => setDeleteModal({ open: true, id: items._id })}>
                <i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
        {
          deleteModal.open &&
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg w-80 p-5">
              <p>Are you sure!!</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteModal({ open: false, id: '' })}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50" onClick={handleDelete} >
                  Delete
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default AllProduct


