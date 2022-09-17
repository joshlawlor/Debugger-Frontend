import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tokenService from '../../utils/tokenService'
import axios from 'axios'


const CommentForm = ({post}) => {
    const backendURL = 'http://localhost:9000'
    const navigate = useNavigate()
    const initialState = {
        title: "",
        content: "",
    }
    const userToken = tokenService.getToken()


    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('FORM DATA:', formData)

        axios.post(`${backendURL}/posts/${post._id}/comments`, formData)
        .then(response => {
            setFormData(initialState)
            return response.json()
        })
        // navigate(`/posts/${post._id}`, {replace:true})
        window.location.reload(false);
    }


    return (
        <div>
            <h4>Comment below</h4>
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor='title'>Title:<br/>
                <input type="text" id='title' onChange={handleChange} />
            </label>
            <br/>
            <label htmlFor='content'>Content:<br/>
                <input type='textarea' id='content' onChange={handleChange}/>
            </label>
            <br/> <br/>
            <button type='submit'>Post Comment</button>

        </form>


        </div>
    )
}

export default CommentForm