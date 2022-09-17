import React, {useState, useEffect} from 'react'
import userServices from '../../utils/userServices'
import tokenService from '../../utils/tokenService';
import { useNavigate , useParams} from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'
const ProfilePage = ({backendURL}) => {
    const [userPosts, setUserPosts] = useState([]);

    const userToken = tokenService.getToken()
    

    const navigate = useNavigate()

    const user = tokenService.getUserFromToken()
    const [userCred, SetUserCred] = useState({email: `${user.email}`});

    // const userCred = user.email
    async function getUsersPosts() {
        await fetch(`${backendURL}/users/posts/`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                console.log(response)
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setUserPosts([...response])
                
            })
    }

    function getUserCred(){
        // SetUserCred({...userCred, [email]: user.email, password: user.password });
        // SetUserCred({email: user.email})
        console.log('USER CRED RAN', userCred)

        return fetch(`${backendURL}/users/user`, {
        method: "POST",  
        headers: new Headers({'Content-type': 'application/json'}), 
        body: JSON.stringify(userCred)
        })
        .then((response) => {
            // console.log(response)
          if(response.ok) return response.json();
          throw new Error('Bad Credentials')
        }).then(({token}) => {
            console.log(`TOKEN `,token)
            tokenService.setToken(token);

        }).catch(err =>{
            console.log(err)
        })
        
    }

    useEffect(() => {
        getUsersPosts();
        getUserCred();
        
    },
        [])

    function refreshPost(){
        window.location.reload(false)
    }


    return (
        <div class='profileBox'>
            <h1 class='header'>Welcome {user.username}!</h1>

            <div class="userPostBox">
            <h2>Your Posts:</h2>
            <button onClick={refreshPost}>REFRESH POSTS</button>
            <ul>
                {userPosts.map(post => {
                    return (
                        <ul class="post">
                            <li>{post.title}</li>
                            <a href={`/posts/${post._id}/edit`}><button>EDIT</button></a>
                            <br/>
                        </ul>
                    )
                })}
            </ul>
            </div>
            
        </div>
    )
}


export default ProfilePage