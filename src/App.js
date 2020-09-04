import React from 'react';

import AsyncExample from './TypeAhead';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
          <h1 style={{marginTop: "20px", marginBottom: "20px"}}>Address Typeahead Demo</h1>
          <p>Start typing your address and possible candidates will appear...</p>
          <AsyncExample />
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
