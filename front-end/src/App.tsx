import React, { useEffect, useState } from 'react';
import {
  Navigate, Route, Routes, Link,
} from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ProductList } from './mock-tool/ProductList';
import { Reviews } from './mock-tool/Reviews';
import { Product } from './types/Product';
import { ReviewsInterface } from './types/ReviewsInterface';
import './App.scss';
import { getProduct, getReviews } from './utils/api';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ReviewsInterface[]>([]);

  useEffect(() => {
    getProduct()
      .then(result => setProducts(result));
  }, []);

  useEffect(() => {
    getReviews()
      .then(result => setReviews(result));
  }, []);

  const addReview = (newReview:ReviewsInterface) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <>
      <Container>
        <Navbar expand="lg" variant="light" className="justify-content-between">
          <Navbar.Brand><Link to="/" className="nav-link">Home</Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/product-list" className="nav-link">Product List</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
          </Nav>
        </Navbar>
      </Container>

      <Routes>
        <Route path="/" element={<h1 className="title">Home page</h1>} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="product-list" element={<ProductList products={products} />}></Route>
        <Route path="reviews" element={<Reviews reviews={reviews} addReview={addReview} />}></Route>
        <Route
          path="*"
          element={(
            <h1 className="title">Page not found</h1>)}
        />
      </Routes>
    </>
  );
};
