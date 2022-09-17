import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../../components/CommentForm/CommentForm";
import userServices from "../../utils/userServices";
import tokenService from "../../utils/tokenService";

const EditPostPage = ({ backendURL, loggedIn }) => {
    const url = backendURL
    const navigate = useNavigate();

    const { postId } = useParams();
    const initialState = {
        title: "",
        content: "",
        comments: []
    }

    const [post, setPost] = useState(initialState)
    
    const user = userServices.getUser()
    const userToken = tokenService.getToken()


    useEffect(() => {
        async function getPost() {
            let response = await axios.get(`${url}/posts/${postId}/edit`, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            const data = response.data
            console.log(data[0])
            setPost(data[0])
        }
        getPost();
    }, [])

    function handleDelete() {
        console.log('POST ID', postId)
        async function deletePost() {
            let response = await axios.delete(`${backendURL}/posts/${postId}`, { headers: { Authorization: `${userToken}` } })
            navigate('/posts')
        }
        deletePost()
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) =>{
        console.log(e.target.value)
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)
        axios.put(`${backendURL}/posts/${postId}/edit`, formData, { headers: { Authorization: `${userToken}` } })
        .then(response => {
            setFormData(initialState)
            window.location.reload(false)
        })
    }

    return (
        <div class='postDetailBox'>

            <div class='details'>   <h1>Title: {post.title}</h1>
            <p>By: {post.author}</p>
            <h4> {post.content}</h4>
            <button onClick={handleDelete} postId={post._id}>DELETE POST</button>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor='title'>Title:<br/>
                    <input type="text" id='title' onChange={handleChange} ></input>
                </label>
                <br />
                <label htmlFor='content'>Content:<br />
                    <input value={formData?.content} type='textarea' id='content' onChange={handleChange} />
                </label>
                <br /> <br />
                <button type='submit'>Edit Post</button>

            </form>
            </div>
         

         
            {/* Need to make delete button only visible to author of post */}
            <br />
            {post.comments.map((comment) => { return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div> })}

        </div>
    )

}
export default EditPostPage