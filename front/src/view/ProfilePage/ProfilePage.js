import React from 'react';
import styles from './ProfilePage.module.css';
import $ from 'jquery';
import { Navigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Authenticator from '../../controllers/Authenticator/Authenticator';
import EditableInput from '../../components/EditableInput/EditableInput';
import EditablePassword from '../../components/EditablePassword/EditablePassword';

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
    appointments = [];
    userData = {
      id: '',
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
        this.alterData = this.alterData.bind(this);
        this.getAppointments = this.getAppointments.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
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
                  this.getAppointments();
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

    async getAppointments () {
      this.appointments = (await Authenticator.getAppointments()).data;
      this.appointments = this.appointments.map((app) => {
        return (
          <tr data-app-id={app.id} key={app.id}>
            <td style={{padding:"20px"}}>{app.appointmentDate.split("T")[0]}</td>
            <td style={{padding:"20px"}}>{app.appointmentTime}</td>
            <td style={{padding:"20px"}}>{app.reason}</td>
            <td style={{padding:"20px"}}>{app.doctorId}</td>
            <td style={{padding:"20px"}}>
              <button data-app-id={app.id} onClick={(e) => {this.cancelAppointment(e)}}>Cancel</button>
            </td>
          </tr>
        );
      })
      this.setState({
        rerenderKey: this.state.rerenderKey + 1
      });
    }

    async cancelAppointment (event) {
      let appId = event.target.getAttribute("data-app-id");
      let response = await Authenticator.handleCancelAppointment(appId);
      console.log(response);

      if (response.status === 100 || response.status === 200) {
        this.appointments = this.appointments.filter((app) => {
          if (parseInt(app.key) === parseInt(appId)) {
            return false;
          }
          return true;
        })
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });

        toast.info("Appointment cancelled successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
      } else {
        toast.error('Error occured on server side. Please contact with your Administrator!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          this.setState({
            rerenderKey: this.state.rerenderKey + 1
          });
      }
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

    async alterData (name, value) {
      if (name === "password") {
        // Update Password
        let res = await Authenticator.handleUpdatePassword({
          oldPassword: value.oldPassword,
          newPassword: value.newPassword
        });
        if (res.status == 100 || res.status == 200) {
          this.userData[name] = bcrypt.hashSync(value.newPassword);
          toast.info("Password has been changed successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          this.setState({
            rerenderKey: this.state.rerenderKey + 1
          });
        } else {
          console.log("Wystąpił błąd po stronie serwera");
        }
        return res;

      } else if (name.startsWith("address")) {
        // Update Address
        let property = name.split(".")[1];
        this.userData.address[property] = value;
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
        return await Authenticator.handleUpdateAddress(this.userData.address);
      } else {
        // Update User
        this.userData[name] = value;
        this.setState({
          rerenderKey: this.state.rerenderKey + 1
        });
        return await Authenticator.handleUpdateUser(this.userData);
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
            <div className="container">
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
                      <div className="col-md-6 col-sm-6" key={this.state.rerenderKey}>
                          <div className="team-info">
                          <h3 style={{ display: "inline-block", marginTop: 0}}>Personal data</h3>
                            <EditableInput alterData={this.alterData} notEditable={true} type="text" display="inline-block" marginBottom="0" marginTop="20px" label="Username" name="username" value={this.userData.username} required={true} />
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="First Name" name="firstName" value={this.userData.firstName} required={true}/>
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="Last Name" name="lastName" value={this.userData.lastName} required={true}/>

                            <div className="team-contact-info">
                                <EditableInput alterData={this.alterData} type="text" icon="fa-phone" name="phone" label="Phone" value={this.userData.phone} required={true}/>
                                <EditableInput alterData={this.alterData} type="email" icon="fa-envelope-o" name="email" label="Email" value={this.userData.email} required={true}/>
                                <EditableInput alterData={this.alterData} type="date" icon="fa-calendar-plus-o" name="birthDate" label="Birth Date" value={this.userData.birthDate.split("T")[0]} required={true}/>
                                <EditableInput alterData={this.alterData} type="text" icon="fa-id-card" name="idCard" label="ID Card" value={this.userData.idCard} required={true}/>
                            </div>
                          </div>
                          <div className="team-info">
                          <h3 style={{ display: "inline-block", marginTop: 0}}>Address data</h3>
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" marginTop="20px" label="Street" name="address.street" value={this.userData.address.street} required={true}/>
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="Postal Code" name="address.postalCode" value={this.userData.address.postalCode} required={true}/>
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="City" name="address.city" value={this.userData.address.city} required={true}/>
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="State" name="address.state" value={this.userData.address.state} />
                            <EditableInput alterData={this.alterData} type="text" display="inline-block" marginBottom="0" label="Country" name="address.country" value={this.userData.address.country} required={true}/>
                          <h3 style={{ display: "inline-block", marginTop: "20px"}}>Change Your Password</h3>
                          <EditablePassword alterData={this.alterData} type="password" display="inline-block" marginBottom="0" label="Password" name="password" value={this.userData.password} required={true}/>
                          <h3 style={{ display: "inline-block", marginTop: "20px", marginBottom: "20px"}}>Your appointments</h3>
                          <table key={this.state.rerenderKey}>
                            <tbody>
                              <tr>
                                <th style={{paddingLeft: "20px", paddingRight: "20px", textAlign:"center"}}>Date</th>
                                <th style={{paddingLeft: "20px", paddingRight: "20px", textAlign:"center"}}>Time</th>
                                <th style={{paddingLeft: "20px", paddingRight: "20px", textAlign:"center"}}>Reason</th>
                                <th style={{paddingLeft: "20px", paddingRight: "20px", textAlign:"center"}}>Doctor</th>
                                <th style={{paddingLeft: "20px", paddingRight: "20px", textAlign:"center"}}>Operations</th>
                              </tr>
                              {this.appointments}
                            </tbody>
                          </table>
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
    );
    }
}

export default ProfilePage;
