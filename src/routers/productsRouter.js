const express = require('express');
const Product = require('../models/Product'); // Modelo de MongoDB
const router = express.Router();

// Renderiza la lista de productos
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === 'true' }] }
      : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    };

    const result = await Product.paginate(filter, options);

    res.render('products', {
      title: 'Lista de Productos',
      products: result.docs,
      pagination: {
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
        nextPage: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
        currentPage: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      },
    });
  } catch (error) {
    
    res.status(500).render('error', { error: error.message });

    console.log('Error en /api/products:', error); 
  }
});


router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).render('error', { error: 'Producto no encontrado' });
    }

    res.render('productDetail', {
      title: `Detalles de ${product.title}`,
      product,
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, stock, status } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      status,
    });

    await newProduct.save();

    res.redirect('/products'); 
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});


router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).render('error', { error: 'Producto no encontrado' });
    }

    res.redirect(`/products/${pid}`); 
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});


router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).render('error', { error: 'Producto no encontrado' });
    }

    res.redirect('/products'); 
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
