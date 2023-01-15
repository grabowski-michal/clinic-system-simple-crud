import React from 'react';
import styles from './SystemPage.module.css';
import $ from 'jquery';
import { Navigate } from "react-router-dom";

import Authenticator from '../../controllers/Authenticator/Authenticator';

class SystemPage extends React.Component {
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

  loaded = false;

  constructor () {
      super();
      this.state = {
          rerenderKey: 0
      };

      this.initDate = this.initDate.bind(this);
      this.validateLoggedIn = this.validateLoggedIn.bind(this);
      this.validateOnlyForGuests = this.validateOnlyForGuests.bind(this);
  }

  initDate() {
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    $("#date").attr("min", tomorrow.toISOString().split("T")[0]);
  }

  validateDate (e) {
    var day = new Date(e.target.value).getUTCDay();
    if([6,0].includes(day)){
      e.preventDefault();
      e.target.value = '';
      e.target.setCustomValidity("Weekends not allowed");
      e.target.reportValidity();
    }
  }

  componentDidMount() {
      if (this.loaded === false) {
          this.initDate();
          Authenticator.getLoginInfo().then((response) => {
                if (response.logged === false) {
                    this.shownComponents = this.guestNavComponents;
                    this.validateLoggedIn();
                } else {
                    this.shownComponents = this.loggedInNavComponents;
                    this.validateOnlyForGuests();
                }
                this.setState({
                    rerenderKey: this.state.rerenderKey + 1
                });
          })
      }
      this.loaded = true;
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
  <div className={styles.SystemPage}>
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
      <section id="appointment" data-stellar-background-ratio="3">
          <div className="container">
                <div className="row">

                    <div className="col-md-6 col-sm-6">
                          <img src="images/appointment-image.jpg" className="img-responsive" alt="" />
                    </div>

                    <div className="col-md-6 col-sm-6">
                          <form id="appointment-form" role="form" method="post" action="#">
                              <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                                    <h2>Make an appointment</h2>
                              </div>

                              <div className="wow fadeInUp" data-wow-delay="0.8s">
                                    <div className="col-md-6 col-sm-6">
                                        <label htmlFor="date">Select Date</label>
                                        <input id="date" type="date" name="date" defaultValue="" className="form-control" onInput={(e) => this.validateDate(e)} />
                                    </div>

                                    <div className="col-md-6 col-sm-6">
                                        <label htmlFor="date">Select Time</label>
                                        <input id="time" type="time" name="time" defaultValue="" className="form-control" min="08:00" max="18:00" step="3600000" />
                                        <small>Appointment hours are 8am to 6pm</small>
                                    </div>

                                    <div className="col-md-6 col-sm-6">
                                        <label htmlFor="select">Select Department</label>
                                        <select className="form-control">
                                              <option>General Health</option>
                                              <option>Cardiology</option>
                                              <option>Dental</option>
                                              <option>Medical Research</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 col-sm-12">
                                        <label htmlFor="Message">Additional Message</label>
                                        <textarea className="form-control" rows="5" id="message" name="message" placeholder="Message"></textarea>
                                        <button type="submit" className="form-control" id="cf-submit" name="submit">Submit Button</button>
                                    </div>
                              </div>
                          </form>
                    </div>

                </div>
          </div>
      </section>


      <section id="google-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.3030413476204!2d100.5641230193719!3d13.757206847615207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf51ce6427b7918fc!2sG+Tower!5e0!3m2!1sen!2sth!4v1510722015945" width="100%" height="350" frameBorder="0" style={{ border:0 }} allowFullScreen></iframe>
      </section>           
      <footer data-stellar-background-ratio="5">
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

export default SystemPage;
