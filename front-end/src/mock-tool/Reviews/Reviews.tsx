import React, { useState } from 'react';
import './Reviews.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Formik, Form, Field, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import {
  Button, Col, FormCheck, FormControl, FormGroup, FormLabel, FormText, Row,
} from 'react-bootstrap';
import { ReviewsInterface } from '../../types/ReviewsInterface';

type Props = {
  reviews: ReviewsInterface[];
  addReview: (newReview:ReviewsInterface) => void;
};

export const Reviews: React.FC<Props> = ({ reviews, addReview }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 1);
  const handleReadAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const validationSchema = Yup.object().shape({
    text: Yup.string().required('Comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().nullable(),
    agreement: Yup.boolean().oneOf([true], 'Agreement is required').required('Agreement is required'),
  });

  interface FormValues {
    text: string;
    name: string;
    email: string;
    phone: string;
    agreement: boolean;
  }

  const initialValues = {
    text: '',
    name: '',
    email: '',
    phone: '',
    agreement: false,
  };
  const handleSubmit = (values:FormValues, actions: FormikHelpers<FormValues>): void => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const formatValues = {
      ...values, phone: values.phone ? values.phone : '-', date: currentDate, id: +reviews.length + 1,
    };

    addReview(formatValues);
    actions.resetForm();
  };

  return (
    <>
      <div className="container">
        {displayedReviews.map(review => (
          <div className="comment" key={review.id}>
            <p className="comment__name">{review.name}</p>
            <p className="comment__date">{review.date}</p>
            <div className="comment__stars">
              <FontAwesomeIcon icon={faStar} className="s1" />
              <FontAwesomeIcon icon={faStar} className="s2" />
              <FontAwesomeIcon icon={faStar} className="s3" />
              <FontAwesomeIcon icon={faStar} className="s4" />
              <FontAwesomeIcon icon={faStar} className="s5" />
            </div>
            <p className="comment__text">
              {review.text}
            </p>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
            <a href="#" className="comment__link">Read more</a>
          </div>
        ))}
        <button
          type="button"
          className="button border"
          onClick={handleReadAllReviews}
        >
          {showAllReviews ? 'Hide comments' : 'Read all reviews'}
        </button>
        <h2 className="Form__title">Leave a Review</h2>
        <p className="Form__subTitle">Your email will not be published. Required fields are marked *</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Row>
                <Col>
                  <FormGroup controlId="text" className="">
                    <Field as="textarea" name="text" placeholder="Comment *" className="form-control" />
                    {errors.text && touched.text && (
                      <FormText>{errors.text}</FormText>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup controlId="name">
                    <Field as={FormControl} name="name" placeholder="Name *" />
                    {errors.name && touched.name && <FormText>{errors.name}</FormText>}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="email">
                    <Field as={FormControl} name="email" placeholder="Email *" />
                    {errors.email && touched.email && <FormText>{errors.email}</FormText>}
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup controlId="phone">
                <Field as={FormControl} name="phone" placeholder="Phone (optional)" />
                {errors.phone && touched.phone && <FormText>{errors.phone}</FormText>}
              </FormGroup>

              <FormGroup controlId="agreement">
                <FormCheck>
                  <Row>
                    <Col>
                      <Field
                        type="checkbox"
                        name="agreement"
                        id="agreement"
                        className="form-check-input"
                      />
                      <FormLabel className="form-check-label">
                        I agree to the terms and conditions
                      </FormLabel>

                    </Col>
                  </Row>
                  <Row>
                    {errors.agreement && touched.agreement && (
                      <FormText>{errors.agreement}</FormText>
                    )}
                  </Row>
                </FormCheck>
              </FormGroup>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
