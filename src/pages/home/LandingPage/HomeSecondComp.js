/* eslint-disable global-require */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './index.css';

const HomeSecondComp = () => {
  return (
    <div className="HomeSecondMain">
      <Container style={{ paddingTop: '100px' }} fluid>
        <Row>
          <Col xs={12} sm={12} lg={{ span: 5, offset: 1 }} md={{span:8, offset:2}}>
            <Image
              src={require('../../../assets/img/HomeSecondImg.jpg')}
              className="HomeSecondImg"
              fluid
            />
          </Col>
          <Col
            xs={12}
            lg={{ span: 5, offset: 0 }}
            sm={12}
            md={{span:10, offset:2}}
            className="xs-justify-content-center mt-md-5 mt-lg-0"
          >
            <h6 style={{ color: 'black', fontWeight:'500' }} className="HomeSecH1">
              ABOUT RESTAURANT
            </h6>
            <br />
            <hr />
            <h1 className="HomeSecH2">ENJOY AN EXCEPTIONAL JOURNEY OF TASTE</h1>
            <br />
            <Col md={10}  sm={12} xs={12}>
              <p style={{ color: 'black' }}>
                Our buzzy food-hall style concept is inspired by international
                dining styles, especially in Asia. Explore the following
                fast-action food stations as busy chefs perform.
              </p>
              <br />
              <p  style={{ color: 'black' }}>
                Enjoy a verdant Garden to Glass experience. It’s in the view,
                it’s reflected in the design, and it infuses many drinks. In
                fact, all our delicious fresh ingredients are sustainably picked
                from our Jemima’s Kitchen Garden. Our flourishing range of
                cocktails, spirits, beers and wines are all made with integrity
                and offer something for every guest.
              </p>
            </Col>
            <br />
            {/* <Button style={{ backgroundColor: '#EB003D', padding: '15px 35px', borderRadius: "30px" }}>Know More</Button> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeSecondComp;
