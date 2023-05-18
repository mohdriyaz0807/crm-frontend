import React, { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import AddLeadsForm from "./AddLeadsForm";
import LeadList from "./LeadList";

function Leads() {
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
        backgroundColor: "#90ee90c4",
        padding: "20px 0",
        borderRadius: 5,
        boxShadow: "3px 3px 20px #c98aff",
      }}
    >
      <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Leads</h2>
            <Button
              variant="success"
              className="float-right"
              onClick={() => {
                setShow(!show);
                setData({ email: "", description: "", status: "new" });
              }}
            >
              {!show ? "New lead" : "Close"}
            </Button>
          </Col>
        </Row>
        <br/>
        {show && <Row>
          <Col>
            <AddLeadsForm data={data} setData={setData} render={render} reRender={reRender} />
          </Col>
        </Row>}
        <Row>
          <Col>
            <LeadList
              setData={setData}
              setShow={setShow}
              render={render}
              reRender={reRender}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leads;
