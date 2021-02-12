import React, { useEffect,useState } from 'react';
import { useHistory } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import store from "../../../../store/index";
import Modal from 'react-modal';
import registerServices from "./registerServices";

import { closeModal } from '../../../../actions';

const customStyles = {
    content: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    overlay: {
        backgroundColor: 'rgba(77,77,77,0.6)',
        zIndex: '10000'
    }
};

Modal.setAppElement( '#root' );

function LoginModal( props ) {
     let [OTP, setOTP] = useState("");
     let [email, setEmail] = useState("");
     let [number, setNumber] = useState("");
     let [message, setMessage] = useState("");
     let [isLogin, setIsLogin] = useState(true);
     let [password, setPassword] = useState("");
     let [withOTP, setWithOTP] = useState(false);
     let [sessionID, setSessionID] = useState("");
     let [verifyOTP, setVerifyOPT] = useState(false);
     let [emailOrNumber, setEmailOrNumber] = useState("");
     let [emailvalidation, setEmailValidation] = useState("");
     let [registerMessage, setRegisterMessage] = useState("");
     let [loginVerifyOTP, setLoginVerifyOTP] = useState(false);
     let [numbervalidation, setNumberValidation] = useState("");
     let [passwordValidation, setPasswordValidation] = useState("");
     let [loginEmailNumvalidation, setLoginEmailNumvalidation] = useState("");
     let [loginPasswordValidation, seLoginPasswordValidation] = useState("");

     let services = new registerServices();
     let history = useHistory();

     //REGISTER AND OTP IMPLEMENTATION
  const validations = () => {
    let status = true;
    if (
      !/^([a-z A-Z 1-9\.-]+)@([a-z -]{5,10}).([a-z]{2,3})(.[a-z]{2,3})?$/.test(
        email
      )
    ) {
      setEmailValidation(<p style={{ color: "red" }}> Invalid Email Id</p>);
      status = false;
    }
    if (!/^[0-9]{10}$/gi.test(number)) {
      setNumberValidation(
        <p style={{ color: "red" }}>Invalid Mobile Number</p>
      );
      status = false;
    }
    if (password.length < 5) {
      setPasswordValidation(
        <p style={{ color: "red" }}>
          {" "}
          Passoword should contain atleast five characters
        </p>
      );
      status = false;
    }
    return status;
  };

  let send_OTP = (e) => {
    setEmailValidation("");
    setNumberValidation("");
    setPasswordValidation("");
    e.preventDefault();

    if (validations()) {
      services.sendOTP(number).then((res) => {
        setSessionID(res.Details);
        setVerifyOPT(true);
      });
    }
  };

  let verify_OTP = (e) => {
    e.preventDefault();
    let data = {
      sessionID,
      OTP,
    };
    services.verifyOTP(data).then((res) => {
      if (res.data == undefined) {
        setRegisterMessage(<p style={{ color: "red" }}> Invalid OTP !!!</p>);
      } else {
        let data = {
          email,
          number,
          password,
          user_ID: number,
        };
        services.userRegistration(data).then((res) => {
         
          setEmail("");
          setNumber("");
          setPassword("");
          setOTP("");
          setRegisterMessage(
            <p style={{ color: "green" }}> Successfully Registered !!!</p>
          );
          setVerifyOPT(false);
        });
      }
    });
  };

  //LOGIN IMPLEMENTATION
  const loginValidation = () => {
    let status = true;
    if (emailOrNumber) {
      if (!withOTP) {
        if (isNaN(emailOrNumber)) {
          if (
            !/^([a-z A-Z 1-9\.-]+)@([a-z -]{5,10}).([a-z]{2,3})(.[a-z]{2,3})?$/.test(
              emailOrNumber
            )
          ) {
            setLoginEmailNumvalidation(
              <p style={{ color: "red" }}> Invalid Email Address</p>
            );
            status = false;
          }
        } else {
          if (!/^[0-9]{10}$/gi.test(emailOrNumber)) {
            setLoginEmailNumvalidation(
              <p style={{ color: "red" }}>Invalid Mobile Number</p>
            );
            status = false;
          }
        }
      } else {
        if (isNaN(emailOrNumber)) {
          setLoginEmailNumvalidation(
            <p style={{ color: "red" }}>
              {" "}
              Please Provide Mobile Number To Get OTP
            </p>
          );
          status = false;
        } else if (!/^[0-9]{10}$/gi.test(emailOrNumber)) {
          setLoginEmailNumvalidation(
            <p style={{ color: "red" }}>Invalid Mobile Number</p>
          );
          status = false;
        }
      }
    } else {
      setLoginEmailNumvalidation(
        <p style={{ color: "red" }}>
          {" "}
          Please Insert Email Address Or Mobile Number
        </p>
      );
      status = false;
    }
    if (!withOTP) {
      if (!password) {
        seLoginPasswordValidation(
          <p style={{ color: "red" }}>Please Provide Password</p>
        );
        status = false;
      }
    }
    return status;
  };
 
  let user_LoginOTP = (e) => {
    e.preventDefault();
    setLoginEmailNumvalidation("");
    seLoginPasswordValidation("");
    if (((!props.loginStatus) && isLogin)) {
      if (withOTP) {
        if (loginValidation()) {
          services.sendOTP(emailOrNumber).then((res) => {
            setSessionID(res.Details);
            setLoginVerifyOTP(true);
            setPassword("");
          });
        }
      } else {
        if (loginValidation()) {
          let data = {
            emailOrNumber,
            password,
            OTP,
          };
          services.userLogin(data).then((res) => {
            if (res == null) {
              setMessage(
                <p style={{ color: "red" }}> Incorrect User Credentials </p>
              );
            } else if (res.data[0][0].Message) {
              setMessage(
                <p style={{ color: "red" }}> Incorrect User Credentials </p>
              );
            } else {
              setEmail("");
              setPassword("");
              setOTP("");
              setMessage(
                <p style={{ color: "green" }}> User Loged In Successfully</p>
              );
              store.dispatch({
                type: "CHANGE_USER_PROFILE_DATA",
                payload: res.data,
              });
              store.dispatch({ type: "CHANGE_LOGIN_STATUS", payload: true });

              setTimeout(() => {
                history.push(`${process.env.PUBLIC_URL}/`);
              }, 800);

               setIsLogin(false);
            }
          });
        }
      }
    } else {
      setMessage(<p style={{ color: "red" }}> User Already Logged In !!! </p>);
    }
  };

  let verify_LoginOTP = (e) => {
    e.preventDefault();

    if (OTP) {
      let data = {
        sessionID,
        OTP,
        password,
      };

      services.verifyOTP(data).then((res) => {
        if (res.data == undefined) {
          setMessage(<p style={{ color: "red" }}> Invalid OTP !!!</p>);
        } else {
          let data = {
            emailOrNumber,
            password,
            OTP,
          };
          services.userLogin(data).then((res) => {
            if (res == null) {
              setMessage(
                <p style={{ color: "red" }}> Incorrect User Credentials </p>
              );
            } else {
              setEmail("");
              setPassword("");
              setOTP("");
              setLoginVerifyOTP(false);
              setMessage(
                <p style={{ color: "green" }}> User Loged In Successfully</p>
              );
              store.dispatch({
                type: "CHANGE_USER_PROFILE_DATA",
                payload: res.data,
              });
              setTimeout(() => {
                history.push(`${process.env.PUBLIC_URL}/`);
              }, 800);
            }
          });
        }
      });
    } else {
      setMessage(<p style={{ color: "red" }}> Enter OTP !!!</p>);
    }
  };

    const { showModal, modal } = props;
    let timer;

    function closeModal() {
        document.getElementById( "login-modal" ).classList.remove( "ReactModal__Content--after-open" );

        timer = setTimeout( () => {
            props.closeModal( 'login' );
        }, 200 );
    }
    useEffect( () => {
        return () => {
            if ( timer ) clearTimeout( timer );
        }
    } )

    return (
      <Modal
        isOpen={showModal && "login" === modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
        className="modal-dialog modal-dialog-centered"
        id="login-modal"
      >
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <Tabs selectedTabClassName="show" defaultIndex={0}>
                  <TabList className="nav nav-pills nav-fill">
                    <Tab className="nav-item">
                      <span className="nav-link">Sign In</span>
                    </Tab>

                    <Tab className="nav-item">
                      <span className="nav-link">Register</span>
                    </Tab>
                  </TabList>

                  <div className="tab-content">
                    <TabPanel style={{ paddingTop: "2rem" }}>
                      <div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="register-email-2">
                              {" "}
                              Mobile number/Email Address
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="email"
                              validation="email|tel"
                              className="form-control"
                              placeholder="Enter Mobile/Email Address"
                              name="email"
                              onChange={(e) => setEmailOrNumber(e.target.value)}
                              value={emailOrNumber}
                              required
                            />
                            {loginEmailNumvalidation}
                          </div>

                          {withOTP ? null : (
                            <div className="form-group">
                              <label htmlFor="register-password-2">
                                Password <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                              />
                              {loginPasswordValidation}
                            </div>
                          )}
                          {loginVerifyOTP ? (
                            <div className="form-group">
                              <label htmlFor="register-otp">
                                <span
                                  style={{
                                    fontSize: "10px",
                                    color: "orangered",
                                  }}
                                >
                                  OPT has been sent to the given mobile number
                                  please enter the OTP in the field below
                                </span>{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                id="register-otp"
                                className="form-control"
                                placeholder="Enter OTP"
                                name="OTP"
                                onChange={(e) => setOTP(e.target.value)}
                                value={OTP}
                                required
                              />
                              {loginPasswordValidation}
                            </div>
                          ) : null}
                          {message}
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                onChange={(e) => {
                                  setWithOTP((prevState) => !prevState);
                                  setMessage("");
                                  setLoginVerifyOTP(false);
                                  setOTP("");
                                  setLoginEmailNumvalidation("");
                                }}
                                checked={withOTP}
                                id="signin-remember-11"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="signin-remember-11"
                              >
                                Login with OTP
                              </label>
                            </div>
                          </div>

                          <div className="form-footer">
                            {loginVerifyOTP ? (
                              <button
                                type="submit"
                                onClick={(e) => {
                                  verify_LoginOTP(e);
                                }}
                                className="btn btn-outline-success"
                              >
                                <span>VERIFY OTP</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>
                            ) : (
                              <button
                                type="submit"
                                onClick={(e) => {
                                  user_LoginOTP(e);
                                }}
                                className="btn btn-outline-primary-2"
                              >
                                <span>LOG IN</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>
                            )}

                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="signin-remember-2"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="signin-remember-2"
                              >
                                Remember Me
                              </label>
                            </div>

                            <a href="pages/login/#a" className="forgot-link">
                              Forgot Your Password?
                            </a>
                          </div>
                        </form>
                        <div className="form-choice">
                          <p className="text-center">or sign in with</p>
                          <div className="row">
                            <div className="col-sm-6">
                              <button className="btn btn-login  btn-g">
                                <i className="icon-google"></i>
                                Login With Google
                              </button>
                            </div>
                            <div className="col-sm-6">
                              <button className="btn btn-login  btn-f">
                                <i className="icon-facebook-f"></i>
                                Login With Facebook
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <form>
                        <div className="form-group">
                          <label htmlFor="register-email-2">
                            {" "}
                            Email Address<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="email"
                            validation="email|tel"
                            className="form-control"
                            placeholder="Enter Your Email Id"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          />
                          {emailvalidation}
                        </div>
                        <div className="form-group">
                          <label htmlFor="register-email-2">
                            Mobile Number<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            validation="email|tel"
                            className="form-control"
                            placeholder="Enter Your Mobile Number"
                            name="number"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                            required
                          />
                          {numbervalidation}
                        </div>

                        <div className="form-group">
                          <label htmlFor="register-password-2">
                            Password <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                          />
                          {passwordValidation}
                        </div>
                        {verifyOTP ? (
                          <div className="form-group">
                            <label htmlFor="register-otp">
                              <span
                                style={{ fontSize: "10px", color: "orangered" }}
                              >
                                OPT has been sent to the given mobile number
                                please enter the OTP in the field below
                              </span>{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              id="register-otp"
                              className="form-control"
                              placeholder="Enter OTP"
                              name="OTP"
                              onChange={(e) => setOTP(e.target.value)}
                              value={OTP}
                              required
                            />
                            {passwordValidation}
                          </div>
                        ) : null}
                        {registerMessage}

                        <div className="form-footer">
                          {verifyOTP ? (
                            <button
                              type="submit"
                              onClick={(e) => {
                                verify_OTP(e);
                              }}
                              className="btn btn-outline-success"
                            >
                              <span>VERIFY OTP</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              onClick={(e) => {
                                 send_OTP(e);
                              }}
                              className="btn btn-outline-primary-2"
                            >
                              <span>SIGN UP</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          )}
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="register-policy-2"
                              required
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="register-policy-2"
                            >
                              I agree to the{" "}
                              <a href="pages/login/#a">privacy policy</a> *
                            </label>
                          </div>
                        </div>
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                            <button className="btn btn-login  btn-g">
                              <i className="icon-google"></i>
                              Login With Google
                            </button>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btn-login  btn-f">
                              <i className="icon-facebook-f"></i>
                              Login With Facebook
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
}

function mapStateToProps( state ) {
    return {
      showModal: state.modal.showModal,
      modal: state.modal.modal,
      userProfile:
        state.userProfileData != undefined
          ? state.userProfileData.profileData
          : null,
      loginStatus:
        state.userProfileData != undefined
          ? state.userProfileData.loginStatus
          : null,
    };
}

export default connect( mapStateToProps, { closeModal } )( LoginModal );