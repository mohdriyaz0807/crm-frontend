import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@mui/material/Alert";
import { Table, Dropdown } from "react-bootstrap";
import { API_PATH } from "../utils/api";
import { Loader } from "./Loader";

function AllowAccess() {
  const [render, reRender] = useState(false);
  const [accessUsers, setAccessUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error",
  });
  const [working, setWorking] = useState(false)

  useEffect(() => {
    const getPeople = async () => {
      setLoading(true);
      await fetch(`${API_PATH}/access`, {
        method: "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setLoading(false);
            setAccessUsers(data.users);
          } else {
            setLoading(false);
            setAlert({ display: true, message: data.message, severity: "error" });
          }
        })
        .catch((err) => {
          console.log(err);
          
        });
    };
    getPeople();
  }, [render]);

  const handleChange = async (id, permission) => {
    setWorking(true)
    await fetch(`${API_PATH}/access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: id, permission: permission }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setAlert({
            display: true,
            message: "Changes have been made successfully",
            severity: "success",
          });
          reRender(!render);
        } else {
          setAlert({ display: true, message: data.message, severity: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setWorking(false)
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
        {working && <Loader />}
        {alert.display ? (
          <Alert
            variant="filled"
            severity={alert.severity}
            onClose={() => {
              setAlert({ display: false });
            }}
            sx={{ marginBottom: 3 }}
          >
            {alert.message}
          </Alert>
        ) : (
          <></>
        )}
        <div style={{maxWidth: '85vw'}}>
        <Table
          striped
          bordered
          hover
          responsive
          style={{ backgroundColor: "#fff", boxShadow: "3px 3px 20px #c98aff" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Level</th>
              <th>Access</th>
              <th>Allow Access</th>
            </tr>
          </thead>
          <tbody>
            {accessUsers ? (
              accessUsers.map((user) => (
                <tr key={user._id}>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.access}</th>
                  <th>{user.permission}</th>
                  <th>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Modify
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          as="button"
                          onClick={() => {
                            handleChange(user._id, "none");
                          }}
                        >
                          None
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => {
                            handleChange(user._id, "view");
                          }}
                        >
                          View Only
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => {
                            handleChange(user._id, "edit");
                          }}
                        >
                          View and Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                </tr>
              ))
            ) : (
              <h1>No Users to display</h1>
            )}
          </tbody>
        </Table>
        </div>
      </>
    );
}

export default AllowAccess;
