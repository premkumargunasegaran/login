import { React, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email , setEmail] = useState("") 
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
   sessionStorage.clear();
  },[])
 const navigate = useNavigate("/")
  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogindata({
      ...logindata,
      [name]: value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    // console.log(email);
   
    
    if (validate()) {
      axios.get(`http://localhost:8000/user?email=${logindata.email}` ).then((res)=>{
       console.log(res.data);
      if(res.data.length=== 0){
        toast.error("Please Enter Valid user");
       
      }
      else {
        const {email, password} = res.data[0]
        if(password === logindata.password){
          toast.success("login success");
          sessionStorage.setItem("username", email);
          navigate("/");
        }
        else{
          toast.error("Please Enter Valid Password");
        }
      }
      
      }).catch((err)=>{
        console.log("error", err);
      })
    }
  };
  const validate = () => {
    let isvalid = true;
    if (logindata.email == "") {
      toast.error("Enter Proper Mail ID");
      isvalid = false;
    }
    if (logindata.password.trim() === "") {
      toast.error("Enter Password");
      isvalid = false;
    }
    return isvalid;
  };
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4 card p-0">
        <div className="card-header">
          <h3 className="text-success text-center mt-2"> Login</h3>
        </div>
        <form className="px-2 mb-3 ">
          <div className="mb-3 mt-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label d-block text-start"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={logindata.email}
              onChange={handlechange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label d-block text-start"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={logindata.password}
              onChange={handlechange}
            />
          </div>

          <div className="text-start">
            <button
              type="submit"
              className="btn btn-primary me-2"
              onClick={handlesubmit} 
            >
              Login
            </button>
            <Link to="/register">Register</Link>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
