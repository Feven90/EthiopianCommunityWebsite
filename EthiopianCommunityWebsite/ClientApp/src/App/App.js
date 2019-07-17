import React from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';
import connection from '../firebaseRequests/connection';
import Home from '../components/Home/Home';
import CustomerProfile from '../components/CustomerProfile/CustomerProfile';
import Login from '../components/Login/Login';
import MyNavbar from '../components/Navbar/Navbar';
import Dinosaurs from '../components/pages/Dinosaurs';
import Sweaters from '../components/pages/Sweaters';
import Fences from '../components/pages/Fences';
import AccountHome from '../components/AccountHome/AccountHome';
import Register from '../components/Register/Register';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import fbConnection from '../firebaseRequests/connection';
import './App.scss';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import PaymentInformation from '../components/PaymentInformation/PaymentInformation';
import WishList from '../components/WishList/WishList';
import customerRequest from '../helpers/data/customerRequest';
import autheRequests from '../firebaseRequests/auth';
import Checkout from '../components/Checkout/Checkout';
import paymentRequest from '../helpers/data/paymentInformationRequest';


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
    customer: '',
    paymentInfo: ''
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
//         let uid = autheRequests.getUid();
//         customerRequest.getCustomerProfile(uid).then((customer) => {
//             this.setState({ customer });
//   paymentRequest.getPaymentInformation(customer.id).then((paymentInfo) => {
//     this.setState({ paymentInfo})
//     console.log(customer.id);
// })
//       });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
}

// getCustomerPayment = () => {
//   const { customer } = this.state;
//   paymentRequest.getPaymentInformation(customer.id).then((paymentInfo) => {
//     this.setState({ paymentInfo})
//     console.log(customer.id);
// })
// }
  componentWillUnmount () {
    this.removeListener();
  }

  runAway = () => {
    this.setState({authed: false});
  }

  render () {
    const {
      authed, 
      customer
    } = this.state 

    if (!authed) {
      return (
        <div className="App">
          <MyNavbar
              authed={this.state.authed}
              runAway={this.runAway}
              component={Login}
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
                  <PrivateRoute path='/customerprofile' exact component={CustomerProfile} authed={this.state.authed} />
                  <PrivateRoute path='/home' exact component={Home} authed={this.state.authed} />


                  {/* <PrivateRoute exact path="/checkout" authed={this.state.authed} component={props => <Checkout {...props} paymentInfo={paymentInfo}/>}/> */}
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;