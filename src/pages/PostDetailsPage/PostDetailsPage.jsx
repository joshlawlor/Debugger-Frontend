import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../../components/CommentForm/CommentForm";
import userServices from "../../utils/userServices";
import tokenService from "../../utils/tokenService";

const PostDetailsPage = ({backendURL, loggedIn}) => {
    const url = backendURL
    const navigate = useNavigate();

    const {postId} = useParams();
    const initialState = {
        title: "",
        content: "",
        comments: []
    }

    const [post, setPost] = useState(initialState)

    const user = userServices.getUser()

    useEffect(() => {
        async function getPost() {
            let response = await axios.get(`${url}/posts/${postId}`, {method: "GET", headers: new Headers({'Content-Type': 'application/json'})})
            const data = response.data
            console.log(data[0])
            setPost(data[0])
        }
        getPost();
    }, [])

    

    // function checkOwner(){
    //     tokenService.ownerCheck()
    // }
    // const isOwner = tokenService.ownerCheck(post)
    // console.log('OWNER',isOwner)
    if(!loggedIn){ //GUEST USER
        return (
            <div>
                
                <h1>Title: {post.title}</h1>
                <h2>By: {post.author}</h2>
                <p>Content: {post.content}</p>
                {/* Need to make delete button only visible to author of post */}
                <br/>
                {post.comments.map((comment) => {return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div>})}
    
            </div>
        )
    }else{ //Logged in but not Owner
        return (
            <div>
                
                <h1>Title: {post.title}</h1>
                <h2>By: {post.author}</h2>
                <p>Content: {post.content}</p>
                {/* Need to make delete button only visible to author of post */}
                <CommentForm backendURL={url} post={post}/>
                <br/>
                {post.comments.map((comment) => {return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div>})}
    
            </div>
        )
    
    }
   
}
export default PostDetailsPage