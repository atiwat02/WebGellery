import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import { upload, setdata, viewdata } from '../function/api'
import image1 from './img/hero.jpg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      decode: '',
      data: [],
    }
  }

  componentDidMount() {
    console.log("dkfjs", window.location.href.split('/')[3])
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
  render() {
    const { state } = this.props.location
    console.log("kkkkk", state)
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
                  <a className="nav-link nav-link-1 active" aria-current="page" href="/home">Photos</a>
                </li>
                <li >
                  <a className="nav-link" style={{ cursor: "-webkit-grab", cursor: "grab" }}>{this.state.decode.name}</a>
                </li>
                <li >
                  <a className="nav-link " style={{ color: "red", cursor: "-webkit-grab", cursor: "grab" }} onClick={this.logout}>Logout</a>
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
          {/* <div style={{ width: "30%", textAlign: "center" }}>
                        <input class="form-control form-control-lg" type="file" onChange={e => this.setState({ file: e.target.files[0] })} />
                        <div style={{ paddingTop: "20px" }}>
                            <a className="btn btn-primary tm-btn-next" onClick={this.uploader}>submit</a>
                        </div>

                    </div> */}


        </div>
        <div className="container-fluid tm-container-content tm-mt-60">
          <div className="row mb-4">
            <h2 className="col-12 tm-text-primary">Photo Detail</h2>
          </div>
          <div className="row tm-mb-90">
            <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
              <img src={`https://drive.google.com/uc?export=view&id=` + state} alt="Image" className="img-fluid" />
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
              <div className="tm-bg-gray tm-video-details">
                {/* <p className="mb-4">
                  Please support us by making <a href="https://paypal.me/templatemo" target="_parent" rel="sponsored">a PayPal donation</a>. Nam ex nibh, efficitur eget libero ut, placerat aliquet justo. Cras nec varius leo.
                </p> */}
                <div className="text-center mb-5">
                  <a href={`https://drive.google.com/uc?id=` + state + `&export=download`} className="btn btn-primary tm-btn-big">Download</a>
                </div>
                {/* <div className="mb-4 d-flex flex-wrap">
                  <div className="mr-4 mb-2">
                    <span className="tm-text-gray-dark">Dimension: </span><span className="tm-text-primary">1920x1080</span>
                  </div>
                  <div className="mr-4 mb-2">
                    <span className="tm-text-gray-dark">Format: </span><span className="tm-text-primary">JPG</span>
                  </div>
                </div> */}
                {/* <div className="mb-4">
                  <h3 className="tm-text-gray-dark mb-3">License</h3>
                  <p>Free for both personal and commercial use. No need to pay anything. No need to make any attribution.</p>
                </div>
                <div>
                  <h3 className="tm-text-gray-dark mb-3">Tags</h3>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Cloud</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Bluesky</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Nature</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Background</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Timelapse</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Night</a>
                  <a href="#" className="tm-text-primary mr-4 mb-2 d-inline-block">Real Estate</a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <h2 className="col-12 tm-text-primary">
              Related Photos
            </h2>
          </div>
          <div className="row mb-3 tm-gallery">

            {this.state.data.map((value, index) => {
              console.log(value)
              return (
                value[0] != state ?
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
                  : null
              )
            })}

          </div> {/* row */}
        </div> {/* container-fluid, tm-container-content */}

      </div>
    )
  }
}
