import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";
import tokenService from "../../utils/tokenService";
import M from 'materialize-css'
import './PostsPage.css'

const PostsPage = ({ backendURL, loggedIn } ) => {

    let navigate = useNavigate()

    console.log(loggedIn)

    const [posts, setPosts] = useState([]);


    
    

    async function getAllPosts() {
        await fetch(`${backendURL}/posts/`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setPosts([...response])
            })
    }

    useEffect(() => {
        getAllPosts();
    },
        [])


    
        if(loggedIn){
            return (
                <div class="postBox">
                    <h1 class="header">Welcome to BugBuddy!</h1>

                    <PostForm backendURL={backendURL}/>
                    <h1>Debugging Posts</h1>

                    <div class="postList">

                    <ul>
                        {posts.map(post => {
                            return (
                                <ul class="post">
                                    <li>{post.title} </li>
                                    <br/>
                                    <a href={`/posts/${post._id}`}><button>View</button></a>
                                    <br/>
                                    {/* <li>{post.content}</li> */}
                                </ul>
                            )
                        })}
                    </ul>
                    </div>
                    
                </div>
            )


        }else{
            return (
            <div>
                    <h1 class="header">Welcome to BugBuddy!</h1>

                    <h1>Debugging Posts</h1>
                    <div class="postList">

                    <ul>
                        {posts.map(post => {
                            return (
                                <ul>
                                    <li>{post.title}</li>
                                    <br/>
                                    <a href={`/posts/${post._id}`}><button>View</button></a>
                                    <br/>
                                </ul>
                            )
                        })}
                    </ul>
                    </div>
                    
                </div>
                
            )

        }

   


}

export default PostsPage