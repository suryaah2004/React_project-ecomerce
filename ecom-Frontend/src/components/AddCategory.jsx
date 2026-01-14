import React, { useEffect, useState } from 'react'
import { addCategories, deleteCategory, getAllCategories, updateCategory } from '../service/All-API'
import axios from 'axios'
import { axiosInstance } from '../service/commonAPI'
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
    const response = await addCategories(field)
    console.log(response)
    setModalOpen(false)
    setField({ name: "" })
    AllCategories()

  }

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
              <button onClick={handleAddCategory()} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50" >
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




//single order

// import React, { useEffect, useState } from "react";
// import { getSingleOrder } from "../service/All-API";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [order, setOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchLatestOrder();
//   }, []);

//   const fetchLatestOrder = async () => {
//     try {
//       const res = await getSingleOrder();
//       const orders = res.data.orders;

//       if (orders && orders.length > 0) {
//         setOrder(orders[orders.length - 1]);
//       }
//     } catch (error) {
//       console.log("Fetch order error:", error);
//     }
//   };

//   const handleConfirmOrder = () => {
//     setShowModal(false);
//     navigate("/order");
//   };

//   if (!order || !order.items || order.items.length === 0) {
//     return <p className="text-center mt-10">Order is empty</p>;
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="md:col-span-2 space-y-6">
//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PERSONAL INFORMATION</h2>
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Name" />
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Address" />
//             <input className="w-full border p-2 rounded" placeholder="Phone Number" />
//           </div>

//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PAYMENT</h2>
//             <label className="flex items-center gap-2">
//               <input type="radio" checked readOnly />
//               Cash on Delivery (COD)
//             </label>
//           </div>

//           <div className="border rounded p-4">
//             <button
//               onClick={() => setShowModal(true)}
//               className="w-full bg-black text-white py-3 rounded font-semibold"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>


//         <div className="border rounded p-4 space-y-4">
//           {order.items.map((item, index) => (
//             <div
//               key={index}
//               className="flex gap-4 items-center border-b pb-3"
//             >
              
//               <img
//                 src={
//                   item.productId?.image
//                     ? `http://localhost:5000/uploads/${item.productId.image}`
//                     : "/placeholder.png"
//                 }
//                 alt={item.productId?.name || "Product"}
//                 className="w-20 h-16 object-cover rounded"
               
//               />

//               <div className="flex-1">
//                 <p className="font-semibold">
//                   {item.productId?.name || "Product"}
//                 </p>
//                 <p className="text-sm">Qty: {item.quantity}</p>
//               </div>

//               <p className="font-semibold">
//                 ₹{(item.productId?.price || item.price) * item.quantity}
//               </p>
//             </div>
//           ))}

//           <div className="flex justify-between font-bold text-lg pt-4">
//             <span>Total:</span>
//             <span>₹{order.total || order.totalPrice}</span>
//           </div>
           
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-80">
//             <h2 className="font-bold mb-4">Confirm Order?</h2>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleConfirmOrder}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Checkout;




// import { getSingleOrder } from "../service/All-API";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [order, setOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();


//   useEffect(() => {
//     fetchLatestOrder();
//   }, []);

//   const fetchLatestOrder = async () => {
//     try {
//       const res = await getSingleOrder();
//       setOrder(res.data.order);
//     } catch (error) {
//       console.log("Fetch order error:", error);
//     }
//   };

//   const handleConfirmOrder = () => {
//     setShowModal(false);
//     navigate("/order");
//   };

//   if (!order || order.items.length === 0) {
//     return <p className="text-center mt-10">Order is empty</p>;
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 space-y-6">

//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PERSONAL INFORMATION</h2>
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Name" />
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Address" />
//             <input className="w-full border p-2 rounded" placeholder="Phone Number" />
//           </div>

//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PAYMENT</h2>
//             <label className="flex items-center gap-2">
//               <input type="radio" checked readOnly />
//               Cash on Delivery (COD)
//             </label>
//           </div>

//           <div className="border rounded p-4">
//             <button
//               onClick={() => setShowModal(true)}
//               className="w-full bg-black text-white py-3 rounded font-semibold"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>

//         <div className="border rounded p-4 space-y-4">
//           {order.items.map((item) => (
//             <div key={item.productId._id} className="border-b pb-3">
//               <h3 className="font-semibold">{item.productId.name}</h3>
//               <p>Qty: {item.quantity}</p>
//               <p className="font-semibold">
//                 ₹{item.productId.price * item.quantity}
//               </p>
//             </div>
//           ))}

//           <div className="flex justify-between font-bold text-lg">
//             <span>Total:</span>
//             <span>₹{order.totalPrice}</span>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-80">
//             <h2 className="font-bold mb-4">Confirm Order?</h2>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleConfirmOrder}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Checkout;

//output

// import React, { useEffect, useState } from "react";
// import { getSingleOrder } from "../service/All-API";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [order, setOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchLatestOrder();
//   }, []);

//   const fetchLatestOrder = async () => {
//     try {
//       // backend returns orders array
//       const res = await getSingleOrder();
//       const orders = res.data.orders;

//       if (orders && orders.length > 0) {
//         // take latest order
//         setOrder(orders[orders.length - 1]);
//       }
//     } catch (error) {
//       console.log("Fetch order error:", error);
//     }
//   };

//   const handleConfirmOrder = () => {
//     setShowModal(false);
//     navigate("/order");
//   };

//   if (!order || !order.items || order.items.length === 0) {
//     return <p className="text-center mt-10">Order is empty</p>;
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 space-y-6">
//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PERSONAL INFORMATION</h2>
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Name" />
//             <input className="w-full border p-2 mb-3 rounded" placeholder="Address" />
//             <input className="w-full border p-2 rounded" placeholder="Phone Number" />
//           </div>

//           <div className="border rounded p-4">
//             <h2 className="font-bold mb-4">PAYMENT</h2>
//             <label className="flex items-center gap-2">
//               <input type="radio" checked readOnly />
//               Cash on Delivery (COD)
//             </label>
//           </div>

//           <div className="border rounded p-4">
//             <button
//               onClick={() => setShowModal(true)}
//               className="w-full bg-black text-white py-3 rounded font-semibold"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>

//         <div className="border rounded p-4 space-y-4">
//           {order.items.map((item, index) => (
//             <div key={index} className="border-b pb-3">
//               <p>Qty: {item.quantity}</p>
//               <p className="font-semibold">
//                 ₹{item.price * item.quantity}
//               </p>
//             </div>
//           ))}

//           <div className="flex justify-between font-bold text-lg">
//             <span>Total:</span>
//             <span>₹{order.total}</span>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-80">
//             <h2 className="font-bold mb-4">Confirm Order?</h2>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleConfirmOrder}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Checkout;
// import React, { useEffect, useState } from "react";
