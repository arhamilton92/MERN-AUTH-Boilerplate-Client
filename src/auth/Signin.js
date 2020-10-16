import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '../core/Layout';
import Google from './Google';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
        .then(res => {
            console.log('SIGNIN SUCCESS', res)
            // save the response (user, token) localstorage/cookie
            authenticate(res, () => {
                setValues({...values, email: '', password: '', buttonText: 'Submit'})
                // toast.success(`Hello ${res.data.user.name}, Welcome back!`)
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const informParent = (res) => {
        authenticate(res, () => {
            setValues({...values, email: '', password: '', buttonText: 'Submit'})
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" placeholder="example@email.com" />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Password
                </label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" placeholder="password" />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            {JSON.stringify(isAuth())}
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-5">Login</h1>
                <Google informParent={informParent} />
                {signinForm()}
                <br/>
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
            </div>
        </Layout>
    )
};

export default Signin
