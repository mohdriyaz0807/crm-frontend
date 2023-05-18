import React, { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import ServiceList from "./ServiceList";
import AddServiceForm from "./AddServiceForm";

function Service() {
  const [show, setShow] = useState(false);
  const [render, reRender] = useState(false);
  const [data, setData] = useState({
    email: "",
    description: "",
    status: "new",
  });

  return (
    <div
      style={{
        backgroundColor: "#add8e6c4",
        padding: "20px 0",
        borderRadius: 5,
        boxShadow: "3px 3px 20px #c98aff",
      }}
    >
      <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Service</h2>
            <Button
              variant="success"
              className="float-right"
              onClick={() => {
                setShow(!show);
                setData({ email: "", description: "", status: "created" });
              }}
            >
              {!show ? "New Service request" : "Close"}
            </Button>
          </Col>
        </Row>
        <br />
        {show && (
          <Row>
            <Col>
              <AddServiceForm
                data={data}
                setData={setData}
                render={render}
                reRender={reRender}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <ServiceList
              setShow={setShow}
              setData={setData}
              render={render}
              reRender={reRender}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Service;
