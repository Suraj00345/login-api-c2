
import { useState } from "react";




function Login({setIsLoggedIn, setId}){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

  async function clickHandler(e){
    e.preventDefault();

    try{
       const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          
          username: username,
          password: password,
           // optional, defaults to 60
        }),
      });


      const data = await res.json();

      if(res.ok){
        localStorage.setItem("token", data.token)
        localStorage.setItem("id", data.id)
        setId(data.id);
        setIsLoggedIn(true);
      } else {
        setError(data.message)
      }
      
    }catch(error){
     console.log(error);
    }
  }


  return (
    <div className="main-container">
        <form className="login-form">
            <h1>Login Page</h1>

            <div>
                <label id="username">Enter Username</label>
                <input
                 type = "text"
                 id="username"
                 required
                 autoComplete="off"
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                />
            </div>

            <div>
                <label id="Password">Enter password</label>
                <input
                 type ="password"
                 id="password"
                 required
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <button onClick={clickHandler}>Login</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    </div>
  )

}

export default Login;