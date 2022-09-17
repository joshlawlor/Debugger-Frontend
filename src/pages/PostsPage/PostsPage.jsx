import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";
import tokenService from "../../utils/tokenService";

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
                <div>
                    <PostForm backendURL={backendURL}/>
                    <h1>Debugging Posts</h1>
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
            )


        }else{
            return (
            <div>
                    <h1>Debugging Posts</h1>
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
            )

        }

   


}

export default PostsPage