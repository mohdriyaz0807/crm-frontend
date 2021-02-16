import React, { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import AddLeadsForm from "./AddLeadsForm";
import LeadList from "./LeadList";

function Leads() {
  const [show, setShow] = useState("none");
  const [render,Rerender] = useState(false)
  const [data, setData] = useState({email : '' , description : "" , status : "new" })
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="float-left">Leads</h2>
            <Button variant="success" className="float-right" onClick={() => {if(show === "none") setShow("flex"); else setShow("none"); setData({email : '' , description : "" , status : "new" }) }} >{show === "none" ? "New lead" : "Close"  }</Button>
          </Col>
        </Row>
        <Row style={{display : show }}>
          <Col>
            <AddLeadsForm data={data} setData={setData} Rerender={Rerender}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <LeadList setData={setData} setShow={setShow} render={render} Rerender={Rerender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leads;