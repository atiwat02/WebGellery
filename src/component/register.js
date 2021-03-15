import React, { Component } from 'react'
import {signup} from '../function/api'
import './login.css'
export default class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lastname: '',
            email: '',
            password: '',
        };
    }


    sendata = () => {
        console.log(this.state.name)
        console.log(this.state.lastname)
        console.log(this.state.email)
        console.log(this.state.password)
        signup({'name':this.state.name+" "+this.state.lastname,"email":this.state.email,"password":this.state.password}).then((res)=>{
            if(res['status'] == "success"){
                window.location.href = 'login';
            }
        })
      }

    render() {
        return (
            <div className='container'>
                <div >
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <input type="text" id="form3Example1" className="form-control" value={this.state.name} onChange={e => this.setState({name: e.target.value})}   />
                                <label className="form-label" htmlFor="form3Example1">First name</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <input type="text" id="form3Example2" className="form-control" value={this.state.lastname} onChange={e => this.setState({lastname: e.target.value})}/>
                                <label className="form-label" htmlFor="form3Example2">Last name</label>
                            </div>
                        </div>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                        <input type="email" id="form3Example3" className="form-control" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                        <input type="password" id="form3Example4" className="form-control"value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>
                    {/* Checkbox */}
                    {/* <div className="form-check d-flex justify-content-center mb-4">
          <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" defaultChecked />
          <label className="form-check-label" htmlFor="form2Example3">
            Subscribe to our newsletter
          </label>
        </div> */}
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={this.sendata}>Sign up</button>
                    {/* Register buttons */}
                    <div className="text-center">
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
