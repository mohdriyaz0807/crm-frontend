import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Alert } from "@mui/material";
import { API_PATH } from "../../utils/api";

function AddLeadsForm({ setData, data, render, reRender }) {

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error",
  });

  const handleAdd = async () => {
    const response = await fetch(`${API_PATH}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
    const lead = await response.json()
    if (lead.message === "success") {
      setLoading(false);
      setData({ ...data, email: "", description: "" });
      setAlert({
        display: true,
        message: "Lead created successfully",
        severity: "success",
      });
    } else {
      setLoading(false);
      setAlert({ display: true, message: lead.message, severity: "error" });
    }
    reRender(!render);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`${API_PATH}/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
      const lead = await response.json()
      if (lead.message === "success") {
        setLoading(false);
        setData({ status: "new", email: "", description: "" });
        setAlert({
          display: true,
          message: "Lead Edited successfully",
          severity: "success",
        });
      } else {
        setLoading(false);
        setAlert({ display: true, message: lead.message, severity: "error" });
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

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (data._id) handleEdit();
    else handleAdd();
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
            <Form.Label>Lead Contacts </Form.Label>
            <Form.Control
              placeholder="Email"
              type="email"
              onChange={handleOnChange}
              value={data.email}
              name="email"
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Lead description </Form.Label>
            <Form.Control
              placeholder="Lead description"
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
                  <option value="new">new</option>
                  <option value="contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Confirmed">Confirmed</option>
                </>
              ) : (
                <option value="new">new</option>
              )}
            </Form.Control>
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

export default AddLeadsForm;
