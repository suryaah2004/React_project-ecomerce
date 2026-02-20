import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, getSingleProduct, } from '../service/All-API'

const SingleProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await getSingleProduct(id)
      if (response.status === 200) {
        setProduct(response.data.product)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const incrementQty = () => {
  if (quantity < product.stock) {
    setQuantity(prev => prev + 1)
  } 
}

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
    
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: quantity
      })
      navigate('/cart')
    } catch (error) {
  alert(error.response.data.message)
}

  }

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-amber-50 p-20 rounded shadow-md flex gap-6">
        <img
          src={`http://65.2.132.121:5000/api/uploads/${product.image}`}
          alt={product.name}
          className="w-96 h-72 object-cover rounded "
        />

        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="my-2">{product.description}</p>
          <p className="font-semibold">Stock: {product.stock}</p>
          <p className="font-semibold mb-4">Code: {product.productCode}</p>

          <div className="flex items-center gap-4 mb-4">
            <button onClick={decrementQty} className="px-3 bg-gray-300 rounded">−</button>
            <span className="font-bold">{quantity}</span>
            <button onClick={incrementQty} className="px-3 bg-gray-300 rounded">+</button>
          </div>

          <p className="text-xl font-bold mb-4">₹{product.price}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct


