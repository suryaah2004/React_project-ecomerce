import React, { useEffect, useState } from 'react'
import { addCategories, deleteCategory, getAllCategories, updateCategory } from '../service/All-API'
const AddCategory = () => {
  const [categories, setCategories] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [updateModal, setUpdateModal] = useState({ open: false, data: '', id: '' });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' })
  const [field, setField] = useState({ name: "" });

  useEffect(() => {
    AllCategories()
  }, [])

  const AllCategories = async () => {
    try {
      const response = await getAllCategories()
      console.log(response)
      if (response.status == 200) {
        setCategories(response.data.categories)
        console.log(response.data.categories)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  
  const handleAddCategory = async () => {
  try {
    console.log("Sending:", field);

    const response = await addCategories(field);
    console.log("Response:", response);

    setModalOpen(false);
    setField({ name: "" });
    AllCategories();
  } catch (error) {
    console.log("Add category error:",error);
  }
};


  const handleUpdateCategory = async () => {
    const result = await updateCategory(updateModal.id, updateModal.data)
    console.log(result)
    setUpdateModal({ open: false, id: '', data: '' })
    AllCategories()

  }
  const handleDeleteCategory = async () => {
    const result = await deleteCategory(deleteModal.id)
    console.log(result)
    setDeleteModal({ open: false, id: "" })
    AllCategories()

  }
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className='flex justify-between'><h2 className="text-xl font-semibold mb-4">All Categories</h2>
          <button className='bg-amber-500 px-3 rounded-full m-4' onClick={() => setModalOpen(true)}>Add</button></div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">

              <th className="p-3 border">Category Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Edit</th>
              <th className="p-3 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((items, index) => (
              <tr key={index} className="hover:bg-gray-100">

                <td className="p-3 border capitalize">{items.name}</td>
                <td className="p-3 border">hiiii</td>
                <td className="p-3 border"><button className='bg-amber-400 px-2' onClick={() => { setUpdateModal({ data: items.name, id: items._id, open: true }) }}>Update</button></td>
                <td className="p-3 border"><button className='bg-amber-400 px-2' onClick={() => { setDeleteModal({ open: true, id: items._id }), console.log(items._id) }}>Delete</button></td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="4"
                className="text-center p-4 text-gray-500 border"
              >
                No categories found
              </td>
            </tr>

          </tbody>
        </table>

      </div>
      {
        modalOpen &&
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-80 p-5">
            <h2 className="text-lg font-semibold mb-4">Ad Name</h2>

            <input
              value={field.name}
              onChange={(e) =>
                setField({ ...field, name: e.target.value })
              }
              type="text"
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button onClick={handleAddCategory} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50" >
                Save
              </button>
            </div>
          </div>
        </div>
      }
      {
        updateModal.open &&
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-80 p-5">
            <h2 className="text-lg font-semibold mb-4">Update Name</h2>

            <input
              value={updateModal.data}
              onChange={(e) => { setUpdateModal((prev) => ({ ...prev, data: e.target.value })) }
              }

              type="text"
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUpdateModal({ data: '', open: false })}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button onClick={handleUpdateCategory} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50" >
                Save
              </button>
            </div>
          </div>
        </div>
      }
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

              <button onClick={handleDeleteCategory} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50" >
                Delete
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default AddCategory


