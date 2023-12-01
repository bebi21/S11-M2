import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Demo() {
  const [listStudent, setListStudent] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4070/students").then((response) => {
      setListStudent(response.data);
    });
  }, [listStudent]);
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4070/students/${id}`);
  };
  const handleTakeValue = (e) => {
    const value = e.target.value;
    const normal = [...listStudent];

    if (value == "Age") {
      normal.sort((a, b) => {
        return b.Age - a.Age;
      });
      setRender(normal);
    } else if (value == "Salary") {
      normal.sort((a, b) => {
        return b.Salary - a.Salary;
      });
      setRender(normal);
    } else if (value == "Name") {
      setRender([]);
    }
  };
  return (
    <>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>
                    Filter <b>User</b>
                  </h2>
                </div>
                <div className="col-sm-4">
                  <select
                    onChange={handleTakeValue}
                    className="custom-select"
                    id="inputGroupSelect01"
                  >
                    <option selected>Filter</option>
                    <option defaultValue={1}>Name</option>
                    <option defaultValue={2}>Age</option>
                    <option defaultValue={3}>Salary</option>
                  </select>
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(render.length > 0 ? render : listStudent).map(
                  (item, index) => (
                    <tr key={index}>
                      <td>{item.Name}</td>
                      <td>{item.Age}</td>
                      <td>{item.Salary}</td>
                      <td>
                        <a className="add" title="Add" data-toggle="tooltip">
                          <i className="material-icons"></i>
                        </a>
                        <a className="edit" title="Edit" data-toggle="tooltip">
                          <i className="material-icons"></i>
                        </a>
                        <a
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                        >
                          <i className="material-icons"></i>
                        </a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
