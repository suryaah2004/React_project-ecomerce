import { axiosInstance } from "./commonAPI";

export const register = async (data) => {
  return await axiosInstance.post("register", data);
};

export const login = async (data) => {
  return await axiosInstance.post('login', data)
}

export const logOut = async (data) => {
  return await axiosInstance.get('/logOut', data)
}

export const getAllProduct = async (data) => {
  return await axiosInstance.get('/product/getAllProduct', data)
}

export const addProducts = async (data) => {
  return await axiosInstance.post('/product/create-product', data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    }
  )
}

export const updateProducts = async (id, data) => {
  return axiosInstance.put(`/product/update/${id}`, data);
};

export const getSingleProduct = async (id) => {
  return axiosInstance.get(`/product/getSingleProduct/${id}`);
};
export const deleteProduct = async (id) => {
  return axiosInstance.delete(`/product/delete/${id}/`)
}

export const addToCart = async (data) => {
  return await axiosInstance.post('/cart/addCart', data)
}
export const updateCart = async (productId, quantity) => {
  return await axiosInstance.put('/cart/updateCart', { productId, quantity }, { withCredentials: true })
}

export const getAllCart = async (data) => {
  return await axiosInstance.get('/cart/getCart', data)
}

export const deleteCart = async (productId, data) => {
  return await axiosInstance.delete(`/cart/deleteCart/${productId}`, data)
}


export const confirmOrder = (id, data) => {
  return axiosInstance.post(`/order/updateOrder/${id}`, data, { withCredentials: true });
};

export const getAllOrder = async (data) => {
  return await axiosInstance.get('/order/getAllOrder', data)
}
export const updateOrder = (id,data) => {
  return axiosInstance.put(`/order/updateStatus/${id}`, { status:data} )};

export const getSingleOrder = async (id) => {
  return await axiosInstance.get(`/order/singleOrder/${id}`,{ withCredentials: true })
}

export const UserOrder = async (id, data) => {
  return await axiosInstance.get(`/order/singleOrder/${id}`, data, { withCredentials: true })
}

export const createOrder = async () => {
  return await axiosInstance.post('/order/createOrder',{}, { withCredentials: true })
}

export const cancelOrder=async(id)=>{
  return await axiosInstance.delete(`/order/cancelOrder/${id}`,{},{ withCredentials: true })
}

export const getMyOrders =async(data)=>{
  return await axiosInstance.get('/order/myOrder',data, { withCredentials: true })
}

export const getAllCategories = async (data) => {
  return await axiosInstance.get('/categories/allCategory', data)
}
export const getSingleCategory=async(id,data)=>{
  return await axiosInstance.get(`/categories/singleCategory/${id}`,data)
}

export const getAllUsers = async (data) => {
  return await axiosInstance.get('/admin/getAllUser/', data)
}
export const toggleUserStatus = async (id, data) => {
  return await axiosInstance.put(`/admin/toggleUserStatuss/${id}`, data)
}

export const getSingleUsers = async (data) => {
  return await axiosInstance.get('/admin/getSingleUser', data)
}

export const updateUser = async (id, data) => {
  return await axiosInstance.patch(`/update/${id}`, data)
}

export const addCategories = async (data) => {
  return await axiosInstance.post('/categories/createCategory', data)
}
export const updateCategory = async (id, value) => {
  return await axiosInstance.put(`/categories/updateCategory/${id}`, { name: value })
}

export const deleteCategory = async (id) => {
  return await axiosInstance.delete(`/categories/deleteCategory/${id}`)
}



