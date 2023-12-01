import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Demo3() {
  const [listUser, setListUser] = useState([]);
  const [listUserSearch, setListUserSerach] = useState([]);
  const [user, setUser] = useState({
    name: "",
    address: "",
    date: "",
  });

  const [check, setCheck] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4070/user1")
      .then((response) => {
        setListUser(response.data);
        setListUserSerach(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, [user, check]);
  const handleTakeValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleAddValue = async () => {
    await axios.post("http://localhost:4070/user1", user);
    setUser({
      name: "",
      address: "",
      date: "",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4070/user1/${id}`).then(() => {
      setUser({
        name: "",
        address: "",
        date: "",
      });
    });
  };

  const handleEdit = (id) => {
    let updateUser = listUser.find((item) => item.id == id);
    setCheck(updateUser);
  };
  const handleUpdate = async () => {
    await axios.put(`http://localhost:4070/user1/${check.id}`, check);
    setCheck("");
  };

  // cosnt[(result, setResult)] = useState({});
  const handleSearch = async (e) => {
    let name = e.target.value;

    // const result1 = await axios.get(`http://localhost:4070/user1?name=${name}`);
    // setListUser(result1.data);
    let nameSearch = listUser.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setSearch(nameSearch);
    setListUser(result.data);
  };
  return (
    <>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="e-tabs mb-3 px-3">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Manager User
                  </a>
                </li>
              </ul>
            </div>
            <div className="row flex-lg-nowrap">
              <div className="col mb-3">
                <div className="e-panel card">
                  <div className="card-body">
                    <div className="e-table">
                      <div className="table-responsive table-lg mt-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="align-top">
                                <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                                  STT
                                </div>
                              </th>
                              <th>Name</th>
                              <th className="sortable">Address</th>
                              <th className="max-width">Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Enter data table */}
                            {(listUser > 0 ? listUser : listUserSearch).map(
                              (item, index) => (
                                <tr key={index}>
                                  <td className="align-middle">
                                    <div style={{ textAlign: "center" }}>
                                      {index + 1}
                                    </div>
                                  </td>
                                  <td className="align-middle text-center">
                                    {item.name}
                                  </td>
                                  <td className="text-nowrap align-middle">
                                    {item.address}
                                  </td>
                                  <td className="text-nowrap align-middle">
                                    <span>{item.date}</span>
                                  </td>
                                  <td className="text-center align-middle">
                                    <div className="btn-group align-top">
                                      <button
                                        className="btn btn-sm btn-outline-secondary badge"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#user-form-modal1"
                                        onClick={() => handleEdit(item.id)}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-secondary badge"
                                        type="button"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <i className="fa fa-trash" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center px-xl-3">
                      <button
                        className="btn btn-success btn-block"
                        type="button"
                        data-toggle="modal"
                        data-target="#user-form-modal"
                      >
                        New User
                      </button>
                    </div>
                    <hr className="my-3" />
                    <hr className="my-3" />
                    <div>
                      <div className="form-group">
                        <label>Search by Name:</label>
                        <div>
                          <input
                            className="form-control w-100"
                            type="text"
                            placeholder="name"
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Form Modal */}
            <div
              className="modal fade"
              role="dialog"
              tabIndex={-1}
              id="user-form-modal"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create User</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="py-1">
                      <form className="form" noValidate>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Enter username"
                                    value={user.name}
                                    // onChange={(e) => {
                                    //   const { name, value } = e.target;
                                    //   setUser({ ...user, [name]: value });
                                    // }}
                                    onChange={handleTakeValue}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={user.address}
                                    // onChange={(e) => {
                                    //   const { name, value } = e.target;
                                    //   setUser({ ...user, [name]: value });
                                    // }}
                                    onChange={handleTakeValue}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Date</label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="date"
                                    value={user.date}
                                    // onChange={(e) => {
                                    //   const { name, value } = e.target;
                                    //   setUser({ ...user, [name]: value });
                                    // }}

                                    onChange={handleTakeValue}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col d-flex justify-content-end">
                            <button
                              onClick={handleAddValue}
                              className="btn btn-primary"
                              type="button"
                              data-dismiss="modal"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              role="dialog"
              tabIndex={-1}
              id="user-form-modal1"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create User</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="py-1">
                      <form className="form" noValidate>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Enter username"
                                    value={check.name}
                                    onChange={(e) =>
                                      setCheck({
                                        ...check,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={check.address}
                                    onChange={(e) =>
                                      setCheck({
                                        ...check,
                                        address: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Date</label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="date"
                                    value={check.date}
                                    onChange={(e) =>
                                      setCheck({
                                        ...check,
                                        date: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col d-flex justify-content-end">
                            <button
                              onClick={handleUpdate}
                              className="btn btn-primary"
                              type="button"
                              data-dismiss="modal"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
