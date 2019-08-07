import React from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';
import connection from '../firebaseRequests/connection';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import MyNavbar from '../components/Navbar/Navbar';
import UserProfile from '../components/UserProfile/UserProfile';
import Event from '../components/Event/Event';

import Register from '../components/Register/Register';
import fbConnection from '../firebaseRequests/connection';
import autheRequests from '../firebaseRequests/auth';
import './App.scss';
import userRequest from '../helpers/data/userRequest';
import AdminPage from '../components/AdminPage/AdminPage';


fbConnection();
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/users', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

// const PrivateRoute = ({ component: Component, authed,paymentInfo, ...rest}) => {
//   return (
//     <Route
//       render={props =>
//         authed === true ? (
//           <Component {...props} {...rest}/>
//         ) : (
//           <Redirect
//             to={{ pathname: '/login', state: {from: props.location}}}
//           />
//         )
//       }
//     />
//   );
// };

// const PublicRoute = ({ component: Component, authed, ...rest}) => {
//   return (
//     <Route
//       render={props =>
//         authed === false ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect
//             to={{ pathname: '/orders', state: {from: props.location}}}
//           />
//         )
//       }
//     />
//   );
// };

class App extends React.Component {
  state={
    authed: false,
    user: '',
    paymentInfo: '', 
    isAdmin: false
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
        let uid = autheRequests.getUid();
        userRequest.getUserProfile(uid).then((user) => {
            this.setState({ user });
      });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
}

  componentWillUnmount () {
    this.removeListener();
  }

  runAway = () => {
    this.setState({authed: false});
  }

  render () {
    const {
      authed, 
      user
    } = this.state 

    if (!authed) {
      return (
        <div className="App">
          <MyNavbar
              authed={this.state.authed}
              runAway={this.runAway}
              component={Login}
              user={this}
            />
          <Route path="/" exact component={Login}/>  
          <PublicRoute
              path="/login"
              authed={this.state.authed}
              component={Login}
              />
          <PublicRoute
              path="/register"
              authed={this.state.authed}
              component={Register}
                  />
        </div>
      )
    }

    
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <MyNavbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <PrivateRoute path='/userProfile' exact component={UserProfile} authed={this.state.authed} />
                  <PrivateRoute path='/home' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/event' exact component={Event} authed={this.state.authed} user={this.state.user} />
                  <PrivateRoute path='/adminPage' exact component={AdminPage} authed={this.state.authed} user={this.state.user} />
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;