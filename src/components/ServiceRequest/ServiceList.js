import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Alert, AlertTitle } from "@mui/material";
import { Table, Button } from "react-bootstrap";
import { API_PATH } from "../../utils/api";

function ServiceList({ setShow, setData, render }) {
  const [loading, setLoading] = useState(false);
  const [services, setService] = useState([]);
  const [alert, setAlert] = useState({ display: false, message: "" });

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      await fetch(`${API_PATH}/service`, {
        method: "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "success") {
            setService(data.service);
          } else {
            setAlert({ display: true, message: data.message });
          }
        })
        .catch((err) => {
          setLoading(false);
          setAlert({
            display: true,
            message: "Something went wrong try again later",
          });
        });
    };
    getList();
  }, [render]);

  if (loading)
    return (
      <>
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />{" "}
      </>
    );
  else
    return (
      <>
        {alert.display ? (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {alert.message}
            <strong> - check it out!</strong>
          </Alert>
        ) : (
          <Table striped bordered hover style={{ backgroundColor: "white" }}>
            <thead>
              <tr>
                <th>Customer contact</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.email}</td>
                    <td>{service.description}</td>
                    <td>{service.status}</td>
                    <td>{service.createdBy.name}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setShow(true);
                          setData({
                            _id: service._id,
                            email: service.email,
                            description: service.description,
                            status: service.status,
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <h6 style={{ margin: "auto", textAlign: "center" }}>
                      No records found
                    </h6>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </>
    );
}

export default ServiceList;
