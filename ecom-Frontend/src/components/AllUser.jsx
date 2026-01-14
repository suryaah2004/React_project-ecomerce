import React, { useEffect, useState, } from 'react'
import { getAllUsers, toggleUserStatus, } from '../service/All-API'

const AllUser = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = async () => {
        try {
            const result = await getAllUsers()
            if (result.status === 200) {
                setUsers(result.data.Users)
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleUser = async (id) => {
        try {
            await toggleUserStatus(id)
            getAllUser()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text-black'>
            <div className="text-gray-900 bg-gray-200">
                <div className="p-4 flex">
                    <h1 className="text-3xl">Users</h1>
                </div>

                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Name</th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th className="text-left p-3 px-5">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((items, index) => (
                                <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                                    <td className="p-3 px-5">{items.name}</td>
                                    <td className="p-3 px-5">{items.email}</td>

                                    <td className="p-3 px-5 flex justify-end">
                                        <button
                                            onClick={() => toggleUser(items._id)}
                                            className={`rounded p-2 text-white ${items.isActive
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                                }`}
                                        >
                                            {items.isActive ? "Disable" : "Enable"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AllUser




