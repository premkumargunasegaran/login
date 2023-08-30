import React, { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
 
  useEffect(()=>{
    let username =  sessionStorage.getItem("username")
      if(username === "" || username === null){
        navigate("/login")
      }
     
  },[])
  return <div className="">
    
  <div className=" header bg-primary ">
    <div className="container d-flex header bg-primary justify-content-between py-2">
    <h1 className="text-white">Logo</h1> 
    <button className="bg-success btn text-white"><Link to="/login" className="text-white text-decoration-none">Logout</Link></button>
    </div>
  
  </div>
  <h2 className="mt-2">Dashboard</h2>
  </div>;
}

export default Home;
