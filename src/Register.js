import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const [userdata, setuserdata] = useState({
    name: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    country: "",
    address: "",
  });
  const [error, seterror] = useState({});
  const [selectedGender, setSelectedGender] = useState("male"); // Default selected option
  const navigate = useNavigate();

  const validate = () => {
    let isvalid = true;
    let errObj = {};
    if (userdata.name.trim() == "") {
      errObj.name = "Name is Required";
      isvalid = false;
    }
    if (userdata.password.trim() == "") {
      errObj.password = "password is Required";
      isvalid = false;
    }
    if (userdata.fullname.trim() == "") {
      errObj.fullname = "fullname is Required";
      isvalid = false;
    }
    if (!/\S+@\S+\.\S+/.test(userdata.email)) {
      errObj.email = "Please enter a valid Email Address.";
      isvalid = false;
    }
    if (userdata.phone.trim() == "") {
      errObj.phone = "phone is Required";
      isvalid = false;
    }
    if (userdata.country.trim() == "") {
      errObj.country = "country is Required";
      isvalid = false;
    }
    if (userdata.address.trim() == "") {
      errObj.address = "address is Required";
      isvalid = false;
    }
    seterror(errObj);

    return isvalid;
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuserdata({
      ...userdata,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newobject = { ...userdata, selectedGender };
    if (validate()) {
      console.log(newobject);
      await axios.post("http://localhost:8000/user", newobject);
      toast.success("Register Completed");
      setuserdata({
        name: "",
        password: "",
        fullname: "",
        email: "",
        phone: "",
        country: "",
        address: "",
      });
      navigate("/login");
    }
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className="row justify-content-center">
      <div className=" col-md-8 ">
        <form className="container">
          <div className="card">
            <div className="card-header">
              <h3>User Registration</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      User Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="name"
                      value={userdata.name}
                      onChange={onInputChange}
                    />
                  </div>
                  <span className="text-danger d-block text-start">
                    {error.name}
                  </span>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control mt-2"
                      name="password"
                      value={userdata.password}
                      onChange={onInputChange}
                    />
                    <span className="text-danger d-block text-start">
                      {error.password}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="fullname"
                      value={userdata.fullname}
                      onChange={onInputChange}
                    />
                    <span className="text-danger d-block text-start">
                      {error.fullname}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="email"
                      value={userdata.email}
                      onChange={onInputChange}
                    />
                    <span className="text-danger d-block text-start">
                      {error.email}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="phone"
                      value={userdata.phone}
                      onChange={onInputChange}
                    />
                    <span className="text-danger d-block text-start">
                      {error.phone}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Country <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="country"
                      value={userdata.country}
                      onChange={onInputChange}
                    />
                    <span className="text-danger d-block text-start">
                      {error.country}
                    </span>
                  </div>
                </div>

                <div className="col-md-12 mb-2">
                  <div className="form-group fw-bold  d-flex justify-content-center flex-column align-items-baseline">
                    <label htmlFor="">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={userdata.address}
                      onChange={onInputChange}
                    ></textarea>
                    <span className="text-danger d-block text-start">
                      {error.address}
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label
                    className="form-check-label w-100 text-start fw-bold"
                    htmlFor="flexRadioDefault1"
                  >
                    Gender <span className="text-danger">*</span>
                  </label>
                  <div className="form-check text-start">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="male"
                      checked={selectedGender === "male"}
                      onChange={handleGenderChange}
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check text-start">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="female"
                      checked={selectedGender === "female"}
                      onChange={handleGenderChange}
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-start">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button type="button" className="btn btn-danger ms-3">
                <Link to="/" className="text-white text-decoration-none">
                  Back
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
