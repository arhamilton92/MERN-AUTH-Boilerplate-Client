import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import Layout from '../core/Layout'

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
    });

    useEffect(() => {
        let token = match.params.token
        let { name } = jwt.decode(token)

        if(token) {
            setValues({...values, name, token})
        }
        // eslint-disable-next-line
    }, [])

    const { name, token } = values

    const clickSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token }
        })
        .then(res => {
            console.log('ACCOUNT ACTIVATED', res)
            setValues({...values, show: false})
            toast.success(res.data.message)
        })
        .catch(error => {
            console.log('ERROR ACTIVATING ACCOUNT', error.response.data.error)
            toast.error(error.response.data.error)
        })
    }

    const activationLink = () => (
        <div>
            <h1 className="p-5">Hello { name }, ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 text-center">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    )
};

export default Activate
