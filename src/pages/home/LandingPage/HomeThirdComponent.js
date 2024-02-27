/* eslint-disable global-require */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import './index.css';

const HomeThirdComponent = () => {
  return (
    <div className="HomeThirdComp">
      <Container>
        <Row className="text-white py-md-5">
          <Col lg={{ span: 5, offset: 0 }} md={12} sm={12} xs={11} className="mt-5 ms-3">
            <h3
              className="mt-3"
              style={{ color: '#c6ac83', fontFamily: 'serif' }}
            >
              WHY CHOOSE US
            </h3>
            <hr className="HomeThirdHR" />
            <h1 className="HomeThirdH1">
              WE ALWAYS WANT OUR CUSTOMERS TO BE SATISFIED
            </h1>
            <Col lg={12} sm={12} xs={11} md={12}>
              <p
                className="mt-3"
                style={{ fontSize: '16px', color: '#c6ac83' }}
              >
                The restaurant has a luxurious and elegant space, ensuring that
                utensils, tables and chairs and other items are always clean.
                Customers will feel secure and comfortable at home when dining
                at our restaurant. Donec ullamcorper justo ac dolor sagittis
                mattis.
              </p>
            </Col>
            <Row className="mt-5">
              <Col lg={{ span: 7, offset: 0 }} sm={12} md={6} xs={10}>
                <ul>
                  <li>MUSIC AND SPACE</li>
                  <br />
                  <li>ATMOSPHERE OF FUN</li>
                </ul>
              </Col>
              <Col lg={{ span: 5, offset: 0 }} sm={12} md={6} xs={10}>
                <ul>
                  <li>EXPERIENCE THE COZY SPACE</li>
                  <br />
                  <li>EVERYTHING IS ALWAYS CLEAN AND TIDY</li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col
            lg={{ span: 6, offset: 0 }}
            md={{span:11}}
            sm={12}
            xs={12}
            id="HomeThirdImg"
            className="mt-5 ms-md-5"
          >
            <Image
              className="h-100 w-100 ms-3"
              src={require('../../../assets/img/HomeThirdImg.jpg')}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeThirdComponent;
