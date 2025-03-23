import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/MyJourney.module.scss";

import angularLogo from '../images/angularjs.svg';
import bootstrapLogo from '../images/bootstrap.svg';
import csharpLogo from '../images/csharp.svg';
import dotnetLogo from '../images/dotnet.svg';
import githubLogo from '../images/github.svg';
import html5Logo from '../images/html5.svg';
import javascriptLogo from '../images/javascript.svg';
import nodejsLogo from '../images/nodejs.svg';
import reactLogo from '../images/react.svg';
import typescriptLogo from '../images/typescript.svg';

const images = [
  angularLogo,
  bootstrapLogo,
  csharpLogo,
  dotnetLogo,
  githubLogo,
  html5Logo,
  javascriptLogo,
  nodejsLogo,
  reactLogo,
  typescriptLogo
];

const MyJourney = () => {
  return (
    <div className="main">
      {/* Primera sección: Imágenes pequeñas */}
      <Container fluid className=" py-4">
        <div className="text-center">
          <h1>My Journey</h1>
        </div>
        <Row className="justify-content-center">
          {images.map((image, index) => (
            <Col key={index} xs="auto" className="p-2">
              <img src={image} alt={`Imagen ${index}`} style={{ width: '60px', height: '60px' }} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Segunda sección: Texto e imagen */}
      <Container fluid className="bg-primary text-white py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <h2>Título de la sección</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel
              consectetur commodo, nisl nunc aliquet nunc, vel aliquet nunc nisl vel nunc.
            </p>
          </Col>
          <Col md={6}>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyJourney;
