import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormText, Input, FormGroup, Label } from 'reactstrap';
import auth from '../../firebaseRequests/auth';
import postUser from '../../helpers/data/userRequest';
import firebase from 'firebase';
// import RegisterBanner from '../../Images/Register.png';

import './Register.scss';

const userInformation = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  state: '',
  city: '',
  zipCode: '',
  phoneNumber: ''
}
class Register extends React.Component {
  state = {
      newUserInformation: userInformation,    
  };

  signUp = ( newUserInformation) => {
    firebase.auth().createUserWithEmailAndPassword(newUserInformation.email, newUserInformation.password).then((res) => {
        newUserInformation.uid = auth.getUid();
        console.log(newUserInformation.uid);
      const userInformation = { firstName: newUserInformation.firstName,
                        lastName: newUserInformation.lastName,
                        email: newUserInformation.email,
                        phoneNumber: newUserInformation.phoneNumber,
                        state: newUserInformation.state,
                        city: newUserInformation.city,
                        userUid: newUserInformation.uid
                        }
      postUser.postUserRequest(userInformation);
      this.props.history.push('/');
    }).catch(err => console.error('there was an error with auth', err));
  }

  formFieldStringState = (name,e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.newUserInformation};
    tempInfo[name] = e.target.value;
    this.setState({ newUserInformation: tempInfo});
  }
  
  emailChange = e => {
    this.formFieldStringState('name', e);
  };

  firstNameChange = e => {
    this.formFieldStringState('firstName', e);
  };
  
  lastNameChange = e => {
    this.formFieldStringState('lastName', e);
  };

  emailChange = e => {
    this.formFieldStringState('email', e);
  }

  passwordChange = e => {
    this.formFieldStringState('password', e);
  }
  stateChange = e => {
    this.formFieldStringState('state', e);
  }
  cityChange = e => {
    this.formFieldStringState('city', e);
  }
  zipCodeChange = e => {
    this.formFieldStringState('zipCode', e);
  }
  phoneNumerChange = e => {
    this.formFieldStringState('phoneNumber', e);
  }

  
  formSubmit = (e) => {
    e.preventDefault();
    const userInformation = { ...this.state.newUserInformation };
    this.signUp(userInformation);
    this.setState({ newUserInformation:userInformation });
  }

  render () {
    const { newUserInformation } = this.state;
    console.log(newUserInformation);
    return (
      <div className="container">
        <div className="Register" id="register-form">
        {/* <div className="lbanner"><img className="LoginBanner" src={RegisterBanner} alt='login-banner'></img></div> */}
          <FormGroup className="form-horizontal col-offset-3">
              <Label htmlFor="inputName" className="col-lg-12 m-1 control-label">
                First Name:
              </Label>
              <div className="registerEmailInput col-lg-12 mb-2">
                <Input
                  type="name"
                  className="form-control"
                  id="inputEmail"
                  placeholder="First Name"
                  value={newUserInformation.firstName}
                  onChange={this.firstNameChange}
                />
              </div>
              <Label htmlFor="inputLastName" className="col-lg-12 m-1 control-label">
                Last Name:
              </Label>
              <div className="col-lg-12 mb-2">
                <Input
                  type="name"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Last Name"
                  value={newUserInformation.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
              <Label htmlFor="inputEmail" className="col-lg-12 m-1 control-label">
                Email:
              </Label>
              <div className="col-lg-12 mb-2">
                <Input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={newUserInformation.email}
                  onChange={this.emailChange}
                />
              <FormText>Please use a valid email address.</FormText>
              </div>
              <Label htmlFor="inputState" className="col-lg-12 m-1 control-label">
                State:
              </Label>
              <div className="col-lg-12 mb-2">
                <Input
                  type="name"
                  className="form-control"
                  id="inputstate"
                  placeholder="TN"
                  value={newUserInformation.state}
                  onChange={this.stateChange}
                />
              </div>
              <Label htmlFor="inputLastName" className="col-lg-12 m-1 control-label">
                City:
              </Label>
              <div className="col-lg-12 mb-2">
                <Input
                  type="name"
                  className="form-control"
                  id="inputCity"
                  placeholder="Nashville"
                  value={newUserInformation.city}
                  onChange={this.cityChange}
                />
              </div>
              <Label htmlFor="inputLastName" className="col-lg-12 m-1 control-label">
                Phone Number
              </Label>
              <div className="col-lg-12 mb-2">
                <Input
                  type="name"
                  className="form-control"
                  id="inputPhone"
                  placeholder="123-115-1387"
                  value={newUserInformation.phoneNumber}
                  onChange={this.phoneNumerChange}
                />
              </div>
              <label htmlFor="inputPassword" className="col-lg-12 m-1 control-label">
                Password:
              </label>
              <div className="col-lg-12 mb-2">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={newUserInformation.password}
                  onChange={this.passwordChange}
                />
              <FormText>Your password should be longer than 8 characters.</FormText>
              </div>
              <div className="col-sm-12 mb-2">
                <Button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.formSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="col-sm-12 mb-3 p-2 text-center">
              <div className="alreadyAccount">Already have an account?</div>
                <Link to="/login"><Button className="mb-2">Return To Login</Button></Link>
              </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Register;