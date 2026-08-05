import './CSS/LoginSignup.css'
import { useState } from 'react';


export const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login= async () => {
    console.log("Login Function Executed",formData);
    let responseData;

    await fetch(`${import.meta.env.VITE_API_URL}/login`,{
      method: 'POST',
      headers: {
        'Accept':'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data) => responseData = data)

    if (responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }
}

  const signup= async () => {
    console.log("Sign Up Function Executed",formData);
    let responseData;

    await fetch(`${import.meta.env.VITE_API_URL}/signup`,{
      method: 'POST',
      headers: {
        'Accept':'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data) => responseData = data)

    if (responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }

}


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields"> 
          {state === "Sign Up" ? <input  type="text" name='username' value={formData.username} onChange={changeHandler} placeholder="Your Name" /> :<></>}
          <input  type="email" name='email' value={formData.email} onChange={changeHandler} placeholder="Email" />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder="Password" />
        </div>
        <button onClick={()=>{state === "Login" ? login(): signup()} }>Continue</button>
        {state === "Sign Up" 
        ?<p className="loginsignup-login">Already have an account? <span onClick={()=>setState("Login")}>Login Here</span></p>
        :<p className="loginsignup-login">Create an Account <span onClick={()=>setState("Sign Up")}>Click Here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing,I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
