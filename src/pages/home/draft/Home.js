/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption
} from 'mdb-react-ui-kit';
import { Col, Container, Row } from 'react-bootstrap';
import slider_1 from '../../../assets/img/slider_1.png';
import savor_spice from '../../../assets/img/savor_spice.png';
import delight_diversity from '../../../assets/img/delight_diversity.png';
import Services1 from '../../../assets/img/Services1.png';
import Services2 from '../../../assets/img/Services2.png';
import Services3 from '../../../assets/img/Services3.png';
import { TitleStyles } from './ReusedStyles';
import './home1.css';

const Section = styled.section`
  margin: 2rem 4rem;
  ${TitleStyles};
  .services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10vw;
    margin-top: 4rem;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vw;
      padding: 0 3vw;
      img {
        height: 2.8rem;
      }
      p {
        text-align: center;
        line-height: 2rem;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
      }
      button {
        padding: 0.6rem 3rem;
        letter-spacing: 0.2rem;
        border-radius: 2rem;
        font-size: 1.1rem;
        border: none;
        color: white;
        background-color: #fc4958;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #f9c74f;
        }
      }
    }
    .yellow {
      button {
        background-color: #f9c74f;
        &:hover {
          background-color: #fc4958;
        }
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    margin: 2rem;
    .services {
      grid-template-columns: 1fr;
    }
  }
`;

const Home = () => {
  return (
    <Container style={{ maxWidth: '100%' }}>
      <Row>
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem itemId={1}>
            <img src={slider_1} className="d-block w-100" alt="..." />
            <MDBCarouselCaption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={2}>
            <img
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
              className="d-block w-100"
              alt="..."
            />
            <MDBCarouselCaption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={3}>
            <img
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
              className="d-block w-100"
              alt="..."
            />
            <MDBCarouselCaption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarousel>
      </Row>
      <Row>
        <Col>
          <Section id="services">
            <Row>
              <Col xs={8} md={8} lg={6}>
                <div>
                  <img
                    src={savor_spice}
                    style={{ height: '40%', width: '40%' }}
                    alt="..."
                  />
                </div>
              </Col>
              <Col xs={8} md={8} lg={6}>
                <div>
                  <img
                    src={delight_diversity}
                    style={{ height: '40%', width: '40%' }}
                    alt="..."
                  />
                </div>
              </Col>
            </Row>
            <div className="title">
              <h1 className="yellow">What we do?</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tenetur, incidunt magnam labore ipsam vero minima maxime
                doloribus dolores ipsa soluta.
              </p>
            </div>
            <div className="services">
              <div className="service">
                <img src={Services2} alt="" />
                <p>
                  He Printing and Typesetting the industry.{' '}
                  <span>Lorem Ipsum</span> has been the Industry's
                </p>
              </div>
              <div className="service yellow">
                <img src={Services1} alt="" />
                <p>
                  He Printing and Typesetting the industry.{' '}
                  <span>Lorem Ipsum</span> has been the Industry's
                </p>
              </div>
              <div className="service">
                <img src={Services3} alt="" />
                <p>
                  He Printing and Typesetting the industry.{' '}
                  <span>Lorem Ipsum</span> has been the Industry's
                </p>
              </div>
            </div>
          </Section>
          '
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
