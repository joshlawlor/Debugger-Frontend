import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenService from "../../utils/tokenService";


const PostForm= ({backendURL}) => {

    const navigate = useNavigate()
    const initialState = {
        title: "",
        content: "",
    }

    const [formData, setFormData] = useState(initialState)

    const userToken = tokenService.getToken()


    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    
    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${backendURL}/posts/`, {
            method: "POST", body: JSON.stringify(formData),
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                setFormData(initialState)
                return response.json()
            })
            .then(response => {
                navigate('/posts', { replace: true })
                window.location.reload(false);
            })


    }

    return (
        <form className='newPost' class='form' onSubmit={handleSubmit}>
        <h2>Make a New Post!</h2>

        <label htmlFor="title">Title</label>
        <input onChange={handleChange} type="text" name="title" id="title" />
        <label htmlFor="content">Content</label>
        <input onChange={handleChange} type="textarea" name="content" id="content" />
        {/* <label htmlFor="author">Author</label>
    <input onChange={handleChange} type="string" name="author" id="author" /> */}
        <button type="submit">Make Post</button>
        <br />
    </form>



    )
}

export default PostForm