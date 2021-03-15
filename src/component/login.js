import React, { Component, useState } from 'react'
import './login.css'
import {signin} from '../function/api'
export default class login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        };
    }
    componentDidMount(){
        if(localStorage.getItem('token') != null){
         window.location.href = 'home';
        }
    }

    
    sendata = () => {
        console.log(this.state.email)
        console.log(this.state.password)
        signin({'name':this.state.name+" "+this.state.lastname,"email":this.state.email,"password":this.state.password}).then((res)=>{
            if(res['status'] == "singin success"){
                window.location.href = 'home';
                localStorage.setItem('token',res['token'])
            }
        })
      }
    render() {
        return (
            <div className='container'>
                <div style={{ width: "30%" }}>

                    {/* Email input */}
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            {/* Checkbox */}
                            <a href="#!">Forgot password?</a>
                            {/* <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultValue id="form2Example3" defaultChecked />
                                <label className="form-check-label" htmlFor="form2Example3"> Remember me </label>
                            </div> */}
                        </div>
                        <div className="col">
                            {/* Simple link */}
                            {/* <a href="#!">Forgot password?</a> */}
                        </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={this.sendata}>Login</button>
                    {/* Register buttons */}
                    <div className="text-center">
                        <p>Not a member? <a href="register">Register</a></p>
                        {/* <p>or sign up with:</p>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fab fa-facebook-f" />
                        </button>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fab fa-google" />
                        </button>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fab fa-twitter" />
                        </button>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                            <i className="fab fa-github" />
                        </button> */}
                    </div>
                </div>
            </div>

        )
    }
}
