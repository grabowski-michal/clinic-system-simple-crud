import React from 'react';
import styles from './ProfilePage.module.css';
import { Navigate } from "react-router-dom";

import Authenticator from '../../controllers/Authenticator/Authenticator';

class ProfilePage extends React.Component {
    loggedInNavComponents = new Map([
        ["profileComponent", <li className="profile-btn"><a href="/profile">Manage account</a></li>],
        ["appointmentComponent", <li className="appointment-btn"><a href="/appointment">Make an appointment</a></li>],
        ["logoutComponent", <li className="logout-btn"><a href="/logout">Logout</a></li>]
    ]);
    guestNavComponents = new Map([
        ["loginComponent", <li className="login-btn"><a href="/login">Login</a></li>],
        ["registerComponent", <li className="register-btn"><a href="/register">Register</a></li>]
    ]);
    navigateComponent = "";
    shownComponents = new Map();
    userData = {
      address: {
        street: '',
        postalCode: '',
        city: '',
        state: '',
        street: '',
      },
      birthDate: '',
      email: '',
      firstName: '',
      idCard: '',
      lastName: '',
      phone: '',
      username: ''
    }

    loaded = false;

    constructor () {
        super();
        this.state = {
            rerenderKey: 0
        };

        this.validateLoggedIn = this.validateLoggedIn.bind(this);
        this.validateOnlyForGuests = this.validateOnlyForGuests.bind(this);
    }

    componentDidMount() {
      if (this.loaded === false) {
          Authenticator.getLoginInfo().then((response) => {
              if (response.logged === false) {
                  this.shownComponents = this.guestNavComponents;
                  this.validateLoggedIn();
              } else {
                  this.shownComponents = this.loggedInNavComponents;
                  this.validateOnlyForGuests();
                  this.getUserData();
              }
              this.setState({
                  rerenderKey: this.state.rerenderKey + 1
              });
          })
      }
      this.loaded = true;
    }

    async getUserData () {
      this.userData = (await Authenticator.getUserData()).data;
      this.setState({
        rerenderKey: this.state.rerenderKey + 1
      });
    }

    validateLoggedIn () {
      if (this.props.authRequired) {
        this.navigateComponent = <Navigate to="/" replace={true} />
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
      }
    }

    validateOnlyForGuests () {
      if (this.props.onlyForGuests) {
        this.navigateComponent = <Navigate to="/" replace={true} />
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
      }
    }

    render () {
        return (
    <div className={styles.ProfilePage}>
        <section className="preloader" style={{ display: "none" }}>
            <div className="spinner">
                  <span className="spinner-rotate"></span>
            </div>
        </section>
        <header>
            <div className="container">
                  <div className="row">

                      <div className="col-md-4 col-sm-5">
                            <p>Welcome to a Professional Health Care</p>
                      </div>
                            
                      <div className="col-md-8 col-sm-7 text-align-right">
                            <span className="phone-icon"><i className="fa fa-phone"></i> 010-060-0160</span>
                            <span className="date-icon"><i className="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM (Mon-Fri)</span>
                            <span className="email-icon"><i className="fa fa-envelope-o"></i> <a href="#">info@company.com</a></span>
                      </div>

                  </div>
            </div>
        </header>
        <section className="navbar navbar-default navbar-static-top" role="navigation">
            <div className="container">

                  <div className="navbar-header">
                      <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span>
                      </button>
                      <a href="/" className="navbar-brand"><i className="fa fa-h-square"></i>ealth Center</a>
                  </div>
                  <div className="collapse navbar-collapse" key={this.state.rerenderKey}>
                      <ul className="nav navbar-nav navbar-right">
                            <li><a href="/" className="smoothScroll">Home</a></li>
                            <li><a href="/#about" className="smoothScroll">About Us</a></li>
                            <li><a href="/#team" className="smoothScroll">Doctors</a></li>
                            <li><a href="/#news" className="smoothScroll">News</a></li>
                            <li><a href="/#google-map" className="smoothScroll">Contact</a></li>
                            {/* Guest part */}
                            { this.shownComponents.get("loginComponent") }
                            { this.shownComponents.get("registerComponent")  }
                            {/* Logged in part */}
                            { this.shownComponents.get("profileComponent") }
                            { this.shownComponents.get("appointmentComponent")  }
                            { this.shownComponents.get("logoutComponent") }
                      </ul>
                  </div>

            </div>
        </section>
        <section id="team" data-stellar-background-ratio="1" style={{paddingTop: 0}}>
            <div className="container" key={this.state.rerenderKey}>
                  <div className="row">

                      <div className="col-md-12 col-sm-12">
                            <div className="about-info">
                                <h2 className="wow fadeInUp" data-wow-delay="0.1s">Your account details</h2>
                            </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-4 col-sm-4">
                            <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                                <img src="images/slider1.jpg" className="img-responsive" alt="" />
                            </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                          <div className="team-info">
                          <h3 style={{ display: "inline-block", marginTop: 0}}>Personal data</h3>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0, marginTop: "20px"}}>Username:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.username }</p>
                              &nbsp;<i className="fa fa-edit"></i>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>First Name:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.firstName }</p>
                              &nbsp;<i className="fa fa-edit"></i>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>Last Name:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.lastName }</p>
                              &nbsp;<i className="fa fa-edit"></i>
                            </div>

                            <div className="team-contact-info">
                                  <p><i className="fa fa-phone"></i> Phone: <span style={{ color: "black" }}>{ this.userData.phone } &nbsp;<i className="fa fa-edit"></i></span></p>
                                  <p><i className="fa fa-envelope-o"></i> Email: <span style={{ color: "black" }}>{ this.userData.email } &nbsp;<i className="fa fa-edit"></i></span></p>
                                  <p><i className="fa fa-calendar-plus-o"></i> Birth date: <span style={{ color: "black" }}>{ this.userData.birthDate.split("T")[0] } &nbsp;<i className="fa fa-edit"></i></span></p>
                                  <p><i className="fa fa-id-card"></i> ID Card: <span style={{ color: "black" }}>{ this.userData.idCard } &nbsp;<i className="fa fa-edit"></i></span></p>
                            </div>
                          </div>
                          <div className="team-info">
                          <h3 style={{ display: "inline-block", marginTop: 0}}>Address data</h3>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0, marginTop: "20px"}}>Street:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.address.street }&nbsp; <i className="fa fa-edit"></i></p>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>Postal Code:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.address.postalCode }&nbsp; <i className="fa fa-edit"></i></p>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>City:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.address.city }&nbsp; <i className="fa fa-edit"></i></p>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>State:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.address.state }&nbsp; <i className="fa fa-edit"></i></p>
                            </div>
                            <div>
                              <p style={{ display: "inline-block", marginBottom: 0}}>Country:&nbsp;</p><p style={{ display: "inline-block", color: "black", marginBottom: 0 }}>{ this.userData.address.country }&nbsp; <i className="fa fa-edit"></i></p>
                            </div>
                          </div>
                      </div>
                      
                  </div>
            </div>
        </section>         
        <footer data-stellar-background-ratio="5" style={{ paddingTop: 0 }}>
            <div className="container">
                  <div className="row">

                      <div className="col-md-4 col-sm-4">
                            <div className="footer-thumb"> 
                                <h4 className="wow fadeInUp" data-wow-delay="0.4s">Contact Info</h4>
                                <p>Fusce at libero iaculis, venenatis augue quis, pharetra lorem. Curabitur ut dolor eu elit consequat ultricies.</p>

                                <div className="contact-info">
                                      <p><i className="fa fa-phone"></i> 010-070-0170</p>
                                      <p><i className="fa fa-envelope-o"></i> <a href="#">info@company.com</a></p>
                                </div>
                            </div>
                      </div>

                      <div className="col-md-4 col-sm-4"> 
                            <div className="footer-thumb"> 
                                <h4 className="wow fadeInUp" data-wow-delay="0.4s">Latest News</h4>
                                <div className="latest-stories">
                                      <div className="stories-image">
                                          <a href="#"><img src="images/news-image.jpg" className="img-responsive" alt="" /></a>
                                      </div>
                                      <div className="stories-info">
                                          <a href="#"><h5>Amazing Technology</h5></a>
                                          <span>March 08, 2018</span>
                                      </div>
                                </div>

                                <div className="latest-stories">
                                      <div className="stories-image">
                                          <a href="#"><img src="images/news-image.jpg" className="img-responsive" alt="" /></a>
                                      </div>
                                      <div className="stories-info">
                                          <a href="#"><h5>New Healing Process</h5></a>
                                          <span>February 20, 2018</span>
                                      </div>
                                </div>
                            </div>
                      </div>

                      <div className="col-md-4 col-sm-4"> 
                            <div className="footer-thumb">
                                <div className="opening-hours">
                                      <h4 className="wow fadeInUp" data-wow-delay="0.4s">Opening Hours</h4>
                                      <p>Monday - Friday <span>06:00 AM - 10:00 PM</span></p>
                                      <p>Saturday <span>09:00 AM - 08:00 PM</span></p>
                                      <p>Sunday <span>Closed</span></p>
                                </div> 

                                <ul className="social-icon">
                                      <li><a href="#" className="fa fa-facebook-square" attr="facebook icon"></a></li>
                                      <li><a href="#" className="fa fa-twitter"></a></li>
                                      <li><a href="#" className="fa fa-instagram"></a></li>
                                </ul>
                            </div>
                      </div>

                      <div className="col-md-12 col-sm-12 border-top">
                            <div className="col-md-4 col-sm-6">
                                <div className="copyright-text"> 
                                      <p>Copyright &copy; 2018 Your Company 
                                      
                                      | Design: <a rel="nofollow" href="https://www.facebook.com/tooplate" target="_parent">Tooplate</a></p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="footer-link"> 
                                      <a href="#">Laboratory Tests</a>
                                      <a href="#">Departments</a>
                                      <a href="#">Insurance Policy</a>
                                      <a href="#">Careers</a>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-2 text-align-center">
                                <div className="angle-up-btn"> 
                                      <a href="#top" className="smoothScroll wow fadeInUp" data-wow-delay="1.2s"><i className="fa fa-angle-up"></i></a>
                                </div>
                            </div>   
                      </div>
                      
                  </div>
            </div>
        </footer>
        <div key={this.state.rerenderKey}>
            { this.navigateComponent }
        </div>
    </div>
    );
    }
}

export default ProfilePage;
