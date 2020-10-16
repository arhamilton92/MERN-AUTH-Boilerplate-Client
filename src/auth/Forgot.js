import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import Layout from '../core/Layout'

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request Password Reset Link'
    });

    const { email, buttonText } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting...'})
        console.log('send request')
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/recoverpassword`,
            data: { email }
        })
        .then(res => {
            console.log('FORGOTPASSWORD SUCCESS', res);
            toast.success(res.data.message);
            setValues({ ...values, buttonText: 'Requested' })
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data);
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Request Password Request Link'});
        })
    }

    const passwordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" placeholder="example@email.com" />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5">Forgot Password</h1>
                {passwordForm()}
            </div>
        </Layout>
    )
};

export default Forgot
