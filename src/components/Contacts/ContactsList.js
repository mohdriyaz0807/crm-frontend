import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Alert, AlertTitle } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table } from "react-bootstrap";
import { Loader } from "../Loader";
import { API_PATH } from "../../utils/api";
import Swal from "sweetalert2";

function ContatsList(props) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ display: false, message: "" });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      await fetch(`${API_PATH}/contact`, {
        method: "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "success") {
            setContacts(data.contacts);
          } else {
            setAlert({ display: true, message: data.message });
          }
        })
        .catch((err) => {
          setAlert({
            display: true,
            message: err - "Something went wrong try again later",
          });
        });
    };
    getList();
  }, [props.render]);

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'error',
      title: "Delete",
      text: "Are you sure you want to delete ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if(result.isConfirmed){
        onDelete(id)
      }
    })
  };

  const onDelete = async (id) => {
    setDeleting(true)
    await fetch(`${API_PATH}/contact/${id}`, {
      method: "PUT",
      headers: {
        auth: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          props.reRender(!props.render);
        }
      })
      .catch((err) => {
        setAlert({
          display: true,
          message: err - "Something went wrong try again later",
        });
      });
      setDeleting(false)
  };

  if (loading)
    return (
      <>
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />
      </>
    );
  else
    return (
      <>
        {deleting && <Loader/>}
        {alert.display ? (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {alert.message}
            <strong> - check it out!</strong>
          </Alert>
        ) : (
          <div style={{maxWidth: '85vw'}}>
          <Table
            striped
            responsive
            bordered
            hover
            style={{ backgroundColor: "white" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.company}</td>
                    <td onClick={() => handleDelete(contact._id)}>
                      <DeleteIcon fontSize="small" />
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

export default ContatsList;
