import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../core/Layout';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token')

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(isAuth()._id)
            console.log('PROFILE UPDATE - PRIVATE', response)
            const {role, name, email} = response.data
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.log('PROFILE UPDATE ERROR - PRIVATE', error.response.data)
            if(error.response.status === 401) {
                signout(() => {
                    history.push('/signin')
                })
            }
        })
    }

    const { name, password, buttonText, role } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            data: { name, password },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('PROFILE UPDATE SUCCESS', res)
            updateUser(res, () => {
                setValues({...values, buttonText: 'Submit'})
                toast.success('Profile updated!')
            });
        })
        .catch(error => {
            console.log('PROFILE UPDATE ERROR', error.response.data.error)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Role
                </label>
                <input onChange={handleChange('name')} defaultValue={role} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
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
            <div className="col-md-6 offset-md-3 text-center">
                <ToastContainer />
                <h3 className="pt-3">Admin</h3>
                <h1 className="pb-5">Profile Update</h1>
                {updateForm()}
            </div>
        </Layout>
    )
}

export default Admin
