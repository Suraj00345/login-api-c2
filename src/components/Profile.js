import { useEffect, useState } from "react";

function Profile({ id, setIsLoggedIn }) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function x() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    }
    x();
  }, [id]);


  const LogoutHandler= ()=>{
   localStorage.removeItem("id");
   localStorage.removeItem("token");
   setIsLoggedIn(false);
  }

  if (loading) {
    return (
      <div className="loader">
        <p className="custom-loader">Loading....</p>
      </div>
    );
  }


  if(error){
    return <p className="error-box">Error: {error.message}</p>
  }

  return (
  <div className="box">
        <button onClick={LogoutHandler} className="btn">Logout</button>

    <div className="name-img">
        <h1>{data?.firstName} {data?.lastName}</h1>
        <img src={data.image} alt="" />
    </div> 
    
     <p>
       <span className="key">Email:</span>
       <span className="value">{data.email}</span>
     </p>
     <p>
       <span className="key">Phone:</span>
       <span className="value">{data.phone}</span>
     </p>
     <p>
       <span className="key">Birthday:</span>
       <span className="value">{data.birthday}</span>
     </p>
    <p>
       <span className="key">Gender:</span>
       <span className="value">{data.gender}</span>
     </p>
     <p>
       <span className="key">University:</span>
       <span className="value">{data.university}</span>
     </p>
     <p>
       <span className="key">Company:</span>
       <span className="value">{data.company.name}</span>
     </p>
     <p>
       <span className="key">job Title:</span>
       <span className="value">{data.company.title}</span>
     </p>
     <p>
       <span className="key">Department:</span>
       <span className="value">{data.company.department}</span>
     </p>
     

     </div>
     );
}

export default Profile;
