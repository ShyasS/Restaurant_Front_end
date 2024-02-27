import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import './index.css';

const HomeFourthComp = () => {
  return (
    <div className="HomeForthComp">
      <Container>
        <Row className="text-center">
          <Col lg={12} md={12} xs={12} sm={12}>
            <h1
              className="mt-md-5"
              style={{ fontFamily: 'serif', fontSize: '50px' }}
            >
              Sign up to receive news and offers from us!
            </h1>
            </Col>
           <Col lg={{span:4, offset:4}}  md={{span:9, offset:2}} xs={12} sm={12} >
            <div className="mb-3">
              <input
                type="email"
                id="HomeFourthInput"
                className="form-control py-2 mt-5 text-center"
                placeholder="Email address*"
              />
            </div>
            </Col>
            <Col lg={12} xs={12} sm={12}>
            <Button
              className="ms-4 mt-2 my-global-button"
              // style={{
              //   borderRadius: '0px',
              //   padding: '10px 30px',
              //   backgroundColor: '#c9913a',
              //   borderColor: '#c9913a'
              // }}
            >
              CONTACT US
            </Button>
            </Col>
            <Col lg={12} xs={12} sm={12}>
            <h5 className="mt-4" style={{ color: 'black' }}>
              * We promise not to spam your inbox in any way
            </h5>
            </Col>

        </Row>
      </Container>
    </div>
  );
};

export default HomeFourthComp;
