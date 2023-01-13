import React from 'react';
import styles from './RegisterPage.module.css';

import Authenticator from '../../controllers/Authenticator/Authenticator';

class RegisterPage extends React.Component {
  loginComponent = "";
  registerComponent = "";
  appointmentComponent = "";

  loaded = false;

  constructor () {
       super();
       this.state = {
            rerenderKey: 0
       };

       this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formFields = form.elements;
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

    Authenticator.handleRegister(registerData);
  }

  componentDidMount() {
       if (this.loaded === false) {
            Authenticator.getLoginInfo().then((response) => {
                 if (response.logged === false) {
                      this.loginComponent = <li className="login-btn"><a href="/login">Login</a></li>;
                      this.registerComponent = <li className="register-btn"><a href="/register">Register</a></li>;
                 } else {
                      this.appointmentComponent = <li className="appointment-btn"><a href="/#appointment">Make an appointment</a></li>;
                 }
                 this.setState({
                      rerenderKey: this.state.rerenderKey + 1
                 });
            })
       }
       this.loaded = true;
  }

  render () {
    return (
         <div className={styles.LoginPage}>
          <section className="preloader">
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
                         <a href="index.html" className="navbar-brand"><i className="fa fa-h-square"></i>ealth Center</a>
                    </div>
                    <div className="collapse navbar-collapse" key={this.state.rerenderKey}>
                         <ul className="nav navbar-nav navbar-right">
                              <li><a href="/" className="smoothScroll">Go Back to Home Page</a></li>
                              { this.loginComponent }
                              { this.registerComponent }
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
     
                         <div className="col-md-6 col-sm-6">
                              <form id="appointment-form" role="form" method="post" onSubmit={(event) => this.handleRegister(event)}>
                                   <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                                        <h2>Register</h2>
                                   </div>
     
                                   <div className="wow fadeInUp" data-wow-delay="0.8s">
                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="first-name">First Name</label>
                                             <input type="text" className="form-control" id="first-name" name="first-name" placeholder="First Name" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="last-name">Last Name</label>
                                             <input type="text" className="form-control" id="last-name" name="last-name" placeholder="Last Name" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="username">Username</label>
                                             <input type="text" name="username" defaultValue="" name="username" className="form-control" placeholder="Login" />
                                        </div>
     
                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="email">Email</label>
                                             <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                             <label htmlFor="id-card">Identification Card Number</label>
                                             <input type="text" className="form-control" id="id-card" name="id-card" placeholder="ID Card" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                            <label htmlFor="telephone">Phone Number</label>
                                            <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="birth-date">Birth Date</label>
                                             <input type="date" className="form-control" id="birth-date" name="birth-date" placeholder="Date" />
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                             <label htmlFor="password">Password</label>
                                             <input type="password" name="password" defaultValue="" className="form-control" placeholder="Type your password" />
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <label htmlFor="confirm-password">Confirm password</label>
                                              <input type="password" name="confirm-password" defaultValue="" className="form-control" placeholder="Repeat your password" />
                                        </div>

                                        <div className="col-md-12 col-sm-12" style={{marginBottom:"20px"}}>
                                          <h3>Residential Address</h3>
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <label htmlFor="street">Street, House and Home Number</label>
                                             <input type="text" className="form-control" id="street" name="street" placeholder="Street" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="postal-code">Postal Code</label>
                                             <input type="text" className="form-control" id="postal-code" name="postal-code" placeholder="Postal Code" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="city">City</label>
                                             <input type="text" className="form-control" id="city" name="city" placeholder="City" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="state">State</label>
                                             <input type="text" className="form-control" id="state" name="state" placeholder="State" />
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                              <label htmlFor="country">Country</label>
                                              <input type="text" className="form-control" id="country" name="country" placeholder="Country" />
                                        </div>

                                        <div className="col-md-12 col-sm-12">
                                              <button className="form-control" id="cf-submit" name="submit">Submit Button</button>
                                        </div>
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
     </div>
  )}
}

export default RegisterPage;
