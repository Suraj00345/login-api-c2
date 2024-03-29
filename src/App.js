import { useEffect } from "react";
import { useState } from "react";
import Profile from "./components/Profile";
import Login from "./components/Login";


function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [loading, setLoading] = useState(true);
const [id, setId] = useState("");


 useEffect(()=>{
  async function fetchData(){
  setLoading(true);


if(localStorage.getItem("token") && localStorage.getItem("id")){
  const resp = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    }, 
  })

  if(resp.ok){
    setId(localStorage.getItem("id"));
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}
setLoading(false);

  }
 fetchData();

 },[]);

  if(loading){
    return(
      <div className="loader">
        <p className="custom-loader">Loading....</p>
      </div>
    )
  }


  return (
    <>
     {isLoggedIn? <Profile id={id} setIsLoggedIn={ setIsLoggedIn}/>:<Login setIsLoggedIn={setIsLoggedIn} setId={setId}/>}
    </>
  );
}

export default App;
