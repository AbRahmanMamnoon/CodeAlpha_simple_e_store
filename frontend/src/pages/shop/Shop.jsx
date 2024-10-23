import React, { useState, useEffect } from 'react';
import { Product } from '../../component/product';
import AddProduct from '../../component/AddProduct';
import './shop.css'; // Import your separate CSS file

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // You can adjust this value

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.totalProducts / itemsPerPage)); // Assuming your API returns totalProducts
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        await fetchProducts(currentPage);
      } else {
        setError('Error adding product');
      }
    } catch (error) {
      setError('Failed to add product');
    }
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Mamnoon e-store</h1>
      </div>

      <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
        Add Product
      </button>

      <AddProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product._id} data={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || totalPages === 0}
        >
          Previous
        </button>

        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};
