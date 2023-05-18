import React, { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import AddContactsForm from "./AddContactsForm";
import ContatsList from "./ContactsList";

function Contacts() {
  const [show, setShow] = useState(false);
  const [render, reRender] = useState(false);
  return (
    <div
    style={{
        backgroundColor: "#ffffe0c4",
        padding: "20px 0",
        borderRadius: 5,
        boxShadow: "3px 3px 20px #c98aff",
      }}
    >
      <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Contacts</h2>
            <Button
              variant="success"
              className="float-right"
              onClick={() => setShow(!show)}
            >
              {!show ? "New Contact" : "Close"}
            </Button>
          </Col>
        </Row>
        <br/>
        {show && <Row>
          <Col>
            <AddContactsForm reRender={reRender} render={render} />
          </Col>
        </Row>}
        <Row>
          <Col>
            <ContatsList render={render} reRender={reRender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contacts;
