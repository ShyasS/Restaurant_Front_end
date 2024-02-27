/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
import { Image } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '20px 0',
       
        overflow: 'hidden'
      }}
    >
      <Container>
        <Row 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
          md={3}
        >
          <Col md={3} xs={9}>
            <h3 style={{ color: '#c6ac83', marginTop: '20px' }}>WE ARE HERE</h3>
            <p>82 Place Charles de Gaulle, Paris</p>
            <p>+91 801-555-99-43</p>
          </Col>
          <Col md={1} xs={12}>
            <hr
              style={{
                border: '0',
                borderTop: '1px solid #c6ac83',
                marginTop: '20px',
                width: '100%'
              }}
            />
          </Col>
          <Col lg={3} xs={12} md={4}>
            <Image
              src={require('../assets/img/grandIndiaLogo1.png')}
              style={{ height: '70px', width: '190px' }}
              className="ms-4"
            />
            <p>
              A distinctive, well-preserved and comfortable space, high-quality
              products, authentic cuisine, food and drinks are done flawlessly.
            </p>
            <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: '50px' }} />
            <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: '20px' }} />
            <FontAwesomeIcon
              icon={faPinterest}
              style={{ marginLeft: '20px' }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ marginLeft: '20px' }}
            />
          </Col>
          <Col md={1} xs={12}>
            <hr style={{ color: '#c6ac83' }} />
          </Col>
          <Col md={3} xs={12}>
            <h3 style={{ color: '#c6ac83', marginTop: '20px' }}>
              OPENING TIME
            </h3>
            <p style={{ marginTop: '10px', color: '#c6ac83' }}>
              82 Place Charles de Gaulle, Paris
            </p>
            <p style={{ color: '#c6ac83' }}>+91 801-555-99-43</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
