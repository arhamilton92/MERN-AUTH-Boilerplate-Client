import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '../core/Layout'

const Reset = ({ match }) => { // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset Password'
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token)
        if(token) {
            setValues({ ...values, name, token })
        }
        // eslint-disable-next-line
    }, [])

    const { name, token, newPassword, buttonText } = values

    const handleChange = (event) => {
        setValues({...values, newPassword: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting...'})
        console.log('send request')
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/resetpassword`,
            data: { newPassword, resetPasswordLink: token }
        })
        .then(res => {
            console.log('RESET PASSWORD SUCCESS', res);
            toast.success(res.data.message);
            setValues({ ...values, buttonText: 'Password Reset Success' })
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data);
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Reset Password'});
        })
    }

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <input onChange={handleChange} value={newPassword} type="password" className="form-control" placeholder="password" required />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 text-center">
                <ToastContainer />
                <h1 className="p-5">{ name } </h1>
                <h4 className="p-5">Please enter a new password.</h4>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
};

export default Reset
