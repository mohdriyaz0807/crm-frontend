import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Alert, AlertTitle } from "@mui/material";
import { Table, Button } from "react-bootstrap";
import { API_PATH } from "../../utils/api";

function LeadList({ setData, setShow, render }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ display: false, message: "" });

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      await fetch(`${API_PATH}/leads`, {
        method: "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "success") {
            setLeads(data.leads);
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
          <div style={{maxWidth: '85vw'}}>
          <Table striped bordered hover responsive style={{ backgroundColor: "white" }}>
            <thead>
              <tr>
                <th>Lead contact</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead._id}>
                    <td>{lead.email}</td>
                    <td>{lead.description}</td>
                    <td>{lead.status}</td>
                    <td>{lead.createdBy.name}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setData({
                            _id: lead._id,
                            email: lead.email,
                            description: lead.description,
                            status: lead.status,
                          });
                          setShow(true);
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
          </div>
        )}
      </>
    );
}

export default LeadList;
