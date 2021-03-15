import React from 'react';
import image1 from './img/hero.jpg'
import './home.css'
import jwt_decode from "jwt-decode";
import { upload, setdata, viewdata } from '../function/api'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            decode: '',
            data: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event.target.files[0])
        this.setState({
            file: event.target.files[0]
        })
    }

    componentDidMount() {
        viewdata().then((res) => {
            console.log(res['data'])
            this.setState({ data: res['data'] })
        })
        if (localStorage.getItem('token') == null) {
            window.location.href = 'login';
        }
        if (localStorage.getItem('token') != null) {
            this.setState({ decode: jwt_decode(localStorage.getItem('token')) })
        }

    };

    logout = () => {
        localStorage.clear()
        window.location.href = 'login';
    }

    uploader = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.file,
            this.state.file.name
        );
        console.log(this.state.file)
        upload(formData).then((res) => {
            console.log(res['name'], res['id'])
            setdata({ 'iduser': this.state.decode.id, 'nameuser': this.state.decode.name, 'imgname': res['name'], 'idimg': res['id'] }).then((res) => {
                if (res['status'] == 'success') {
                    window.location.reload()
                }
            })


        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="home"><i className="fas fa-film mr-2" />Catalog-Z</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link nav-link-1 active"  aria-current="page" href="/home">Photos</a>
                                </li>
                                <li >
                                    <a className="nav-link" style={{cursor:"-webkit-grab",cursor:"grab"}}>{this.state.decode.name}</a>
                                </li>
                                <li >
                                    <a className="nav-link " style={{ color: "red" ,cursor:"-webkit-grab",cursor:"grab"}} onClick={this.logout}>Logout</a>
                                </li>
                                {/* <li className="nav-item">
                  <a className="nav-link nav-link-3" href="about.html">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-link-4" href="contact.html">Contact</a>
                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="tm-hero d-flex justify-content-center align-items-center" data-parallax="scroll" data-image-src={image1}>

                    {/* <form className="d-flex tm-search-form">
            <input className="form-control tm-search-input" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success tm-search-btn" type="submit">
              <i className="fas fa-search" />
            </button>
          </form> */}

                    {/* <div>
                        <input type="file" onChange={this.handleChange} />
                    </div> */}
                    <div style={{ width: "30%", textAlign: "center" }}>
                        <input class="form-control form-control-lg" type="file" onChange={e => this.setState({ file: e.target.files[0] })} />
                        <div style={{ paddingTop: "20px" }}>
                            <a className="btn btn-primary tm-btn-next" onClick={this.uploader}>submit</a>
                        </div>

                    </div>


                </div>
                <div className="container-fluid tm-container-content tm-mt-60">
                    <div className="row mb-4">
                        <h2 className="col-6 tm-text-primary">
                            Photos
            </h2>
                        {/* <div className="col-6 d-flex justify-content-end align-items-center">
                            <form action className="tm-text-primary">
                                Page <input type="text" defaultValue={1} size={1} className="tm-input-paging tm-text-primary" /> of 200
              </form>
                        </div> */}

                    </div><div className="row tm-mb-90 tm-gallery">
                        {this.state.data.map((value, index) => {
                            console.log(value)
                            return (

                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                                    <figure className="effect-ming tm-video-item">
                                        <img src={`https://drive.google.com/uc?export=view&id=` + value[0]} alt="Image" className="img-fluid" />
                                        <figcaption className="d-flex align-items-center justify-content-center">
                                            <h2>{value[3]}</h2>
                                            {/* <a href={`detail/`+value[0]}>View more</a> */}
                                            <Link
                                                to={{
                                                    pathname: "/detail",
                                                    state: value[0] // your data array of objects
                                                }}
                                            ></Link>
                                        </figcaption>
                                    </figure>
                                    <div className="d-flex justify-content-between tm-text-gray">
                                        <span className="tm-text-gray-light">{value[2]}</span>
                                        <span>0 views</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* row */}
                    {/* <div className="row tm-mb-90">
                        <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                            <a href="javascript:void(0);" className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</a>
                            <div className="tm-paging d-flex">
                                <a href="javascript:void(0);" className="active tm-paging-link">1</a>
                                <a href="javascript:void(0);" className="tm-paging-link">2</a>
                                <a href="javascript:void(0);" className="tm-paging-link">3</a>
                                <a href="javascript:void(0);" className="tm-paging-link">4</a>
                            </div>
                            <a href="javascript:void(0);" className="btn btn-primary tm-btn-next">Next Page</a>
                        </div>
                    </div> */}
                </div> {/* container-fluid, tm-container-content */}
                {/* <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
                    <div className="container-fluid tm-container-small">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
                                <h3 className="tm-text-primary mb-4 tm-footer-title">About Catalog-Z</h3>
                                <p>Catalog-Z is free <a rel="sponsored" href="https://v5.getbootstrap.com/">Bootstrap 5</a> Alpha 2 HTML Template for video and photo websites. You can freely use this TemplateMo layout for a front-end integration with any kind of CMS website.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
                                <h3 className="tm-text-primary mb-4 tm-footer-title">Our Links</h3>
                                <ul className="tm-footer-links pl-0">
                                    <li><a href="#">Advertise</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Our Company</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
                                <ul className="tm-social-links d-flex justify-content-end pl-0 mb-5">
                                    <li className="mb-2"><a href="https://facebook.com"><i className="fab fa-facebook" /></a></li>
                                    <li className="mb-2"><a href="https://twitter.com"><i className="fab fa-twitter" /></a></li>
                                    <li className="mb-2"><a href="https://instagram.com"><i className="fab fa-instagram" /></a></li>
                                    <li className="mb-2"><a href="https://pinterest.com"><i className="fab fa-pinterest" /></a></li>
                                </ul>
                                <a href="#" className="tm-text-gray text-right d-block mb-2">Terms of Use</a>
                                <a href="#" className="tm-text-gray text-right d-block">Privacy Policy</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-12 px-5 mb-3">
                                Copyright 2020 Catalog-Z Company. All rights reserved.
              </div>
                            <div className="col-lg-4 col-md-5 col-12 px-5 text-right">
                                Designed by <a href="https://templatemo.com" className="tm-text-gray" rel="sponsored" target="_parent">TemplateMo</a>
                            </div>
                        </div>
                    </div>
                </footer> */}
            </div>
        )
    }
}

export default Home;
