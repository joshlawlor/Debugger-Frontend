import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenService from "../../utils/tokenService";
import './SignUpForm.css'
const SignUpForm = ({backendURL}) => {
    const [userCred, SetUserCred] = useState({username: "", email: "", password: "", confirmPassword: ""})
    const [errorCode, setErrorCode] = useState(0);
    let navigate = useNavigate()

    function handleChange(event){
        SetUserCred({ ...userCred, [event.target.id]: event.target.value });
    };

    async function testUserCred(){
        console.log(userCred)
        await fetch(backendURL + '/users/signup', {method: "POST", body: JSON.stringify(userCred),
        headers: new Headers({'content-type': 'application/json'})})
        .then((response) =>{
            if(!response.ok){
                console.log(response.body);
            }else{
                setErrorCode(0);
                console.log(response);
                return response.json();
            }
        }).then(({token}) =>{
            tokenService.setToken(token);
        }).catch(err =>{
            console.log(err)
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        if(userCred.password === userCred.confirmPassword){
            testUserCred();
          navigate('/posts', {replace:true})
          window.location.reload(false)

        }
        else{
          setErrorCode(1);
        }
      }


    return (
        <div class="signupContainer">

            <div class="signupFormBox">

            <form class='signupForm' onSubmit={handleSubmit}>
      <br/>
      <h3>User Sign Up</h3>
        {(errorCode===1)?<p className='error'>passwords don't match</p>:null}
        {(errorCode===2)?<p className='error'>this email is already associated with an account</p>:null}
        <label htmlFor="Username">Username</label>
        <input onChange={handleChange} type="username" name="username" id="username" />
        <label htmlFor="Email">Email</label>
        <input onChange={handleChange} type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input onChange={handleChange} type="password" name="password" id="password"/>
        <label htmlFor="password">confirm password</label>
        <input onChange={handleChange} type="confirmPassword" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Sign Up</button>
        <br/>
    </form>
            </div>


        </div>
      
    )
}
export default SignUpForm