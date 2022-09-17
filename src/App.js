import './App.css';
import M from 'materialize-css'
import React, { useEffect, useState } from 'react'
import {Link, Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm'
import PostDetailsPage from './pages/PostDetailsPage/PostDetailsPage';
import userServices from './utils/userServices';
import tokenService from './utils/tokenService';
import { useNavigate} from 'react-router-dom';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import PostsPage from './pages/PostsPage/PostsPage'
const backendURL = "https://bugbuddy-backend.herokuapp.com"

function App() {
  const [user, setUser] = useState(userServices.getUser())
  const navigate = useNavigate()

  // const [loggedIn, setLoggedIn] = useState(0)
  // console.log(loggedIn)
  

  // IF LOGGED IN
  if(tokenService.loginCheck() == true){
    const loggedIn = "true"
    console.log(`${{user}}Logged In`, loggedIn)

    function handleLogout() {
      userServices.logout()
      navigate('/posts')
  }

    return (
      <div className="App">
       
       <div class="nav-wrapper">
       <ul id="nav-mobile" class="right hide-on-med-and-down"className='navbar'>
        <li><Link to='/'>Profile</Link></li>
        <li><Link to='/posts'>Posts</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
        <button onClick={handleLogout}>Logout</button>
     </ul>
       </div>
       
  
       <Routes>
        <Route path='/' element={<ProfilePage backendURL={backendURL}/>}/>
        <Route path='/posts' element={<PostsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/posts/:postId/edit' element={<EditPostPage backendURL={backendURL}/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='/login' element={<LoginForm backendURL = {backendURL}/>}/>
        <Route path='/signup' element={<SignUpForm backendURL = {backendURL}/>}/>
       </Routes>
      </div>
    );
  }
  else //NOT LOGGED IN
  {
    const loggedIn = false
    console.log('User is not Logged In', loggedIn)
    return (
      <div className="App">
       
       <ul className='navbar'>
        
          <li><Link to='/posts'>Posts</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
       </ul>
  
       <Routes>
        <Route path='/' element={<PostsPage backendURL={backendURL}/>}/>
        <Route path='/posts' element={<PostsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='/login' element={<LoginForm backendURL = {backendURL}/>}/>
        <Route path='/signup' element={<SignUpForm backendURL = {backendURL}/>}/>
       </Routes>
      </div>
    )
  }

  
}

export default App;
