import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Alert } from "@mui/material";
import { API_PATH } from "../../utils/api";

function AddContactsForm(props) {

  const [data, setData] = useState({ email: "", name: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error",
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_PATH}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
      const contact = await response.json()
      if (contact.message === "success") {
        setLoading(false);
        setAlert({
          display: true,
          message: "contact created successfully",
          severity: "success",
        });
        props.reRender(!props.render);
      } else {
        setLoading(false);
        setAlert({
          display: true,
          message: contact.message,
          severity: "error",
        });
      }
      setData({ email: "", name: "", company: "" });
    } catch (err) {
      setLoading(false);
      setAlert({
        display: true,
        message: "Something went wrong...",
        severity: "error",
      });
    }
  };

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data));
    temp[prop] = value;
    setData(temp);
  };

  return (
    <>
      {alert.display ? (
        <>
        <Alert
          severity={alert.severity}
          variant="filled"
          onClose={() => {
            setAlert({ display: false });
          }}
        >
          {alert.message}
        </Alert>
        <br/>
        </>
      ) : (
        <></>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Row style={{ display: "felx", alignItems: "flex-end" }}>
          <Form.Group as={Col} md="3">
            <Form.Label>Name </Form.Label>
            <Form.Control
              placeholder="Name"
              type="text"
              onChange={handleOnChange}
              name="name"
              value={data.name}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>E-mail </Form.Label>
            <Form.Control
              placeholder="email"
              type="email"
              onChange={handleOnChange}
              name="email"
              value={data.email}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Company </Form.Label>
            <Form.Control
              placeholder="company"
              type="text"
              onChange={handleOnChange}
              name="company"
              value={data.company}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="3" className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Please Wait" : "Submit"}
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  );
}

export default AddContactsForm;
