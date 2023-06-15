import React, { useState } from 'react';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faHeart, faS } from '@fortawesome/free-solid-svg-icons';
import {
  far,
} from '@fortawesome/free-regular-svg-icons';
import './Card.scss';
import { Product } from '../../types/Product';

library.add(faS, far, faHeart);
type Props = {
  product: Product;
};

export const Card:React.FC<Props> = ({ product }) => {
  const [favorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div
      className="card"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={classNames(
          'card__img',
          { hover: isHovered },
        )}
      >
        <img
          src={isHovered ? product.changingImg : product.mainImg}
          alt="card-img"
        />
        <FontAwesomeIcon
          icon={favorite ? faHeart : ['far', 'heart']}
          onClick={handleFavorite}
          size="xl"
          className="card__favorite"
        />
        <span className="card__recommend">Shop by room</span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="card__details">Product details</a>
      </div>
      <div className="card__body">
        <div className="card__info">
          <p className="card__name">{product.name}</p>
          <p className="card__price">{`${product.price}$`}</p>
        </div>
        <p className="card__description">
          COREtec Premium Lorem ipsum dolor sit amet.
        </p>
        <div className="card__footer">
          <div className="card__avalaible avalaible-card">
            <div
              className={classNames('avalaible-card__circle', {
                'avalaible-card__circle-red': product.count <= 0,
              })}
            />
            <div className="avalaible-card__text">{`Availeble Now ${product.count}Sf`}</div>
          </div>
          <div className="card__compare">
            <Form.Check reverse label="Compare" />
          </div>
        </div>
      </div>

    </div>
  );
};
