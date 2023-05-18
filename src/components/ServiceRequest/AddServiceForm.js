import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Alert } from "@mui/material";
import { API_PATH } from "../../utils/api";

function AddServiceForm({ setData, data, render, reRender }) {
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error",
  });
  
  const handleAdd = async () => {
    setLoading(true);
    const response = await fetch(`${API_PATH}/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const service = await response.json();
    if (service.message === "success") {
      setLoading(false);
      setData({ ...data, email: "", description: "" });
      setAlert({
        display: true,
        message: "service created successfully",
        severity: "success",
      });
    } else {
      setLoading(false);
      setAlert({ display: true, message: service.message, severity: "error" });
    }
    reRender(!render);
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_PATH}/service`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
      const service = await response.json()
      if (service.message === "success") {
        setLoading(false);
        setData({ status: "created", email: "", description: "" });
        setAlert({
          display: true,
          message: "service edited successfully",
          severity: "success",
        });
      } else {
        setLoading(false);
        setAlert({
          display: true,
          message: service.message,
          severity: "error",
        });
      }
    } catch (err) {
      setLoading(false);
      setAlert({
        display: true,
        message: "Something went wrong...",
        severity: "error",
      });
    }
    reRender(!render);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (data._id) handleEdit();
    else handleAdd();
  };

  const handleOnChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data));
    temp[property] = value;
    setData(temp);
  };

  return (
    <>
      {alert.display && (
        <>
          <Alert
            variant="filled"
            severity={alert.severity}
            onClose={() => {
              setAlert({ display: false });
            }}
          >
            {alert.message}
          </Alert>
          <br />
        </>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Row style={{ display: "felx", alignItems: "flex-end" }}>
          <Form.Group as={Col} md="3">
            <Form.Label>Email Contacts </Form.Label>
            <Form.Control
              placeholder="Contact email"
              type="email"
              onChange={handleOnChange}
              value={data.email}
              name="email"
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Service request </Form.Label>
            <Form.Control
              placeholder="Service request description"
              type="text"
              onChange={handleOnChange}
              value={data.description}
              name="description"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="inlineFormCustomSelect">Status</Form.Label>
            <Form.Control
              as="select"
              id="inlineFormCustomSelect"
              onChange={handleOnChange}
              value={data.status}
              name="status"
            >
              {data._id ? (
                <>
                  <option value="created">Created</option>
                  <option value="open">Open</option>
                  <option value="in process">In process</option>
                  <option value="released">Released</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>{" "}
                </>
              ) : (
                <option value="created">Created</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="3" className="pt-4">
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  );
}

export default AddServiceForm;
