import React from 'react';
import styles from './RegisterPage.module.css';
import $ from 'jquery';
import { Navigate } from "react-router-dom";

import Authenticator from '../../controllers/Authenticator/Authenticator';

class RegisterPage extends React.Component {
  loggedInNavComponents = new Map([
      ["profileComponent", <li className="profile-btn"><a href="/profile">Manage account</a></li>],
      ["appointmentComponent", <li className="appointment-btn"><a href="/appointment">Make an appointment</a></li>],
      ["logoutComponent", <li className="logout-btn"><a href="/logout">Logout</a></li>]
  ]);
  guestNavComponents = new Map([
      ["loginComponent", <li className="login-btn"><a href="/login">Login</a></li>],
      ["registerComponent", <li className="register-btn"><a href="/register">Register</a></li>]
  ]);
  shownComponents = new Map();
  navigateComponent = "";
  maxDate = "2005-01-01";

  loaded = false;
  blockedForm = false;
  registered = false;

  constructor () {
       super();
       this.state = {
            rerenderKey: 0
       };

       let today = new Date();
       let year = (today.getFullYear() - 18);
       let month = ((today.getMonth() + 1) < 10? "0" + (today.getMonth() + 1) : (today.getMonth() + 1));
       let day = (today.getDate() < 10? "0" + today.getDate() : today.getDate());
       if (month === "02" && day === "29") day = "28";

       this.maxDate = year + "-" + month + "-" + day;

       this.handleRegister = this.handleRegister.bind(this);
       this.validateLoggedIn = this.validateLoggedIn.bind(this);
       this.validateOnlyForGuests = this.validateOnlyForGuests.bind(this);
  }

  onInput (e) {
    let form = e.target.parentElement.parentElement.parentElement;
    const formFields = form.elements;

    for (var i in formFields) {
      let field = formFields[i];
      if (field.tagName === "INPUT") {
        field.setCustomValidity("");
      }
    }
  }

  handleValidation (form) {
    const formFields = form.elements;
    let errors = {};

    const atLeastOneAlphabeticalLowerChar = new RegExp("^(?=.*[a-z])");
    const atLeastOneAlphabeticalUpperChar = new RegExp("^(?=.*[A-Z])");
    const atLeastOneNumericChar = new RegExp("^(?=.*[0-9])");
    const atLeastOneSpecialChar = new RegExp("^(?=.*[!@#$%^&*])");
    const atLeastEightChars = new RegExp("^(?=.{8,})");

    if (!atLeastOneAlphabeticalLowerChar.test(formFields["password"].value)) {
      errors.password = "Password needs to contain at least one lowercase alphabetical character";
      formFields["password"].setCustomValidity(errors.password);
      formFields["password"].reportValidity();

    } else if (!atLeastOneAlphabeticalUpperChar.test(formFields["password"].value)) {
      errors.password = "Password needs to contain at least one uppercase alphabetical character";
      formFields["password"].setCustomValidity(errors.password);
      formFields["password"].reportValidity();

    } else if (!atLeastOneNumericChar.test(formFields["password"].value)) {
      errors.password = "Password needs to contain at least one numeric character";
      formFields["password"].setCustomValidity(errors.password);
      formFields["password"].reportValidity();

    } else if (!atLeastOneSpecialChar.test(formFields["password"].value)) {
      errors.password = "Password needs to contain at least one special character";
      formFields["password"].setCustomValidity(errors.password);
      formFields["password"].reportValidity();

    } else if (!atLeastEightChars.test(formFields["password"].value)) {
      errors.password = "Password needs to have at least 8 characters";
      formFields["password"].setCustomValidity(errors.password);
      formFields["password"].reportValidity();

    } else if (formFields["password"].value !== formFields["confirm-password"].value) {
      errors.password = "Passwords are not the same";
      formFields["confirm-password"].setCustomValidity(errors.password);
      formFields["confirm-password"].reportValidity();
    } else {
      formFields["confirm-password"].setCustomValidity("");
      formFields["confirm-password"].reportValidity();
    }

    if (JSON.stringify(errors) === '{}') return false;
    else return true;
  }

  async handleRegister(event) {
    event.preventDefault();
    if (this.blockedForm === false) {
      const form = event.target;
      const formFields = form.elements;

      if (this.handleValidation(form) === true) return;

      this.blockedForm = true;
      $(".preloader").css({display: "opacity(1)"});
      this.setState({
        rerenderKey: this.state.rerenderKey + 1
      });

      const registerData = {
        firstName: formFields["first-name"].value,
        lastName: formFields["last-name"].value,
        username: formFields["username"].value,
        email: formFields["email"].value,
        idCard: formFields["id-card"].value,
        phone: formFields["phone"].value,
        birthDate: formFields["birth-date"].value,
        password: formFields["password"].value,
        address: {
          street: formFields["street"].value,
          postalCode: formFields["postal-code"].value,
          city: formFields["city"].value,
          state: formFields["state"].value,
          country: formFields["country"].value,
        }
      };

      const response = await Authenticator.handleRegister(registerData);

      $(".preloader").css({display: "none"});
      this.blockedForm = false;
      this.registered = true;
      this.setState({
        rerenderKey: this.state.rerenderKey + 1
      });
      setTimeout(() => {
        this.navigateComponent = <Navigate to="/login" replace={true} />
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
      }, 3000);
    }
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
         <div className={styles.LoginPage}>
          <section className="preloader" style={{ display: "none" }}>
               <div className="spinner">
                    <span className="spinner-rotate"></span>
               </div>
          </section>
          <header>
               <div className="container">
                    <div className="row">
     
                         <div className="col-md-4 col-sm-5">
                              <p></p>
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
                              <li><a href="/" className="smoothScroll">Go Back to Home Page</a></li>
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
                              <img src="images/slider2.jpg" className="img-responsive" alt="" />
                         </div>
     
                         <div className="col-md-6 col-sm-6" key={this.state.rerenderKey}>
                              <form id="appointment-form" role="form" method="post" onSubmit={(event) => this.handleRegister(event)} style={{ display: (this.blockedForm || this.registered) ? "none" : "initial" }}>
                                   <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                                        <h2>Register</h2>
                                   </div>
     
                                   <div className="wow fadeInUp" data-wow-delay="0.8s">
                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="first-name">First Name <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="first-name" name="first-name" placeholder="First Name" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="last-name">Last Name <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="last-name" name="last-name" placeholder="Last Name" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="username">Username <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" name="username" defaultValue="" className="form-control" placeholder="Login" disabled={this.blockedForm} required/>
                                        </div>
     
                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="email">Email <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="id-card">Identification Card Number <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="id-card" name="id-card" placeholder="ID Card" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                            <label htmlFor="telephone">Phone Number <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                            <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="birth-date">Birth Date <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                              <input type="date" className="form-control" id="birth-date" name="birth-date" placeholder="Date" max={this.maxDate} disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                             <label htmlFor="password">Password <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="password" name="password" defaultValue="" className="form-control" placeholder="Type your password" disabled={this.blockedForm} onInput={(e) => this.onInput(e)} required/>
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <label htmlFor="confirm-password">Confirm password <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                              <input type="password" name="confirm-password" defaultValue="" className="form-control" placeholder="Repeat your password" onInput={(e) => this.onInput(e)} disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-12 col-sm-12" style={{marginBottom:"20px"}}>
                                          <h3>Residential Address</h3>
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <label htmlFor="street">Street, House and Home Number <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="street" name="street" placeholder="Street" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="postal-code">Postal Code <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="postal-code" name="postal-code" placeholder="Postal Code" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="city">City <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                             <input type="text" className="form-control" id="city" name="city" placeholder="City" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="state">State</label>
                                             <input type="text" className="form-control" id="state" name="state" placeholder="State" disabled={this.blockedForm}/>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="country">Country <span style={{color: "red", fontWeight: "bold" }}>*</span></label>
                                              <input type="text" className="form-control" id="country" name="country" placeholder="Country" disabled={this.blockedForm} required/>
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <button className="form-control" id="cf-submit" name="submit" disabled={this.blockedForm}>Submit Button</button>
                                        </div>
                                   </div>
                              </form>
                              <form id="appointment=form" role="form" style={{ display: this.registered ? "initial" : "none" }}>
                                <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                                    <h2>Thank you for registering! Now you'll be redirected to login page...</h2>
                                  </div>
                              </form>
                         </div>
    
                    </div>
               </div>
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
  )}
}

export default RegisterPage;
