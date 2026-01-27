import Products from "../model/productSchemaa.js";

// create product

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      productCode,
      description,
      price,
      category,
      stock,
    } = req.body;
    const imageFile = req.file ? req.file.filename : null;
    const productOne = await Products.findOne({ productCode })
    if (productOne) {
      return res.status(400).json('product code already exist try another one')
    }
    const newProduct = await Products.create({
      name,
      productCode,
      description,
      price,
      category,
      stock,
      image: imageFile
    });
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//getall product

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json({
      message: "All products fetched successfully",
      products
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};

// get single product

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
};

// update product

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      name,
      productCode,
      description,
      price,
      category,
      stock,
    } = req.body;

    const imageFile = req.file ? req.file.filename : null;

    const updateData = {
      name,
      productCode,
      description,
      price,
      category,
      stock,
    };

    if (imageFile) {
      updateData.image = imageFile;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message
    });
  }
};

// DELETE PRODUCT 

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message
    });
  }
};






