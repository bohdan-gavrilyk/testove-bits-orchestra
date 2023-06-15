import { Product } from '../types/Product';
import { ReviewsInterface } from '../types/ReviewsInterface';
import { client } from './fetchClient';

const shedule = process.env.NODE_ENV === 'development';

export const getProduct = () => {
  return client.get<Product[]>(shedule ? '/products' : '/products.json');
};

export const getReviews = () => {
  return client.get<ReviewsInterface[]>(shedule ? '/reviews' : '/reviews.json');
};
