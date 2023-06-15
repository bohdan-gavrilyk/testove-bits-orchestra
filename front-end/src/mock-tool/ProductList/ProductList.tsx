import React from 'react';

import './ProductList.scss';
import { Container, Stack } from 'react-bootstrap';
import { Card } from '../Card';
import { Product } from '../../types/Product';

type Props = {
  products: Product[]
};

export const ProductList:React.FC<Props> = ({ products }) => {
  return (
    <Container>
      <h2 className="subTitle">The innovation leader in luxury vinyl plank</h2>
      <h1 className="title">Let`s Get Started</h1>
      <Stack direction="horizontal" className="align-items-stretch" gap={3}>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </Stack>
    </Container>
  );
};
