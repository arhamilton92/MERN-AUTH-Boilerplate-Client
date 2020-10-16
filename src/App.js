import React from 'react';

import Layout from './core/Layout'

const App = () => {
  return (
    <div>
      <Layout>
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="p-5">React Node mongoDB Authentication Boilerplate</h1>
          <h2>MERN STACK</h2>
          <hr />
          <p className="">This app was created as practice at creating a secure production-ready app with user and admin authentication, 
          and for use as a starting point for future ReactJS projects.</p>
          <br/>
          <p>This app supports signup with verification through an email link, login, and password reset/recovery. It contains protected routes only admins may access, private routes all logged in users may access, and the ability to edit certain profile content. </p>
          <hr />
          <h4>Tools used:</h4>
          <br></br>
          <p>MongoDB Atlas - cloud server</p>
          <p>JSON Web Token - authentication & authorization</p>
          <p>SendGrid - email verification service</p>
          <p>Google & Facebook Signup/Login</p>
        </div>
      </Layout>
    </div>
  )
}

export default App;
