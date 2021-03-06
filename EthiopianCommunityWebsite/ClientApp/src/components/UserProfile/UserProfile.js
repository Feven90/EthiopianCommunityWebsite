import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import getUserInfo from '../../helpers/data/userRequest';
import autheRequests from '../../firebaseRequests/auth';
// import EditUserForm from '../EditUserForm/EditUserForm';
import './UserProfile.scss';
import eventRequest from '../../helpers/data/eventRequest';
import authRequests from '../../firebaseRequests/auth';

 

export class UserProfile extends React.Component {

  state = {
    user: {},
    isEditing: false,
    editId: '-1',
    open: false,
    isAdmin: false,
    userEvents:[]
  }

  static propTypes = {
    onSubmit: PropTypes.func,
  }

  // onOpenModal = () => {
  //   this.setState({ open: true });
  // };
 
  // onCloseModal = () => {
  //   this.setState({ open: false });
  // };

  // getCustomer = () => {
  //   let uid = authRequests.getUid();
  //   getUserInfo.getUserProfile(uid).then((user) => {
  //     this.setState({ user })
  //   });
  // }
  
  getUserEvents = () => {
    const { user } = this.props;
    eventRequest.getUserEvents(user.id).then((userEvents) => {
      this.setState({ userEvents })
    })
  }

  
  componentDidMount() {
    const { user, userEvents} = this.props;
    // let uid = autheRequests.getUid();
    // this.getCustomer(uid);
    // this.setState({ isEditing: true, editId: uid })
    //this.getUseuserIdrEvents(user.id);
    console.log(user.id);
    //this.getUserEvents();
  }
  
  // componentWillUnmount() {
  //   let uid = autheRequests.getUid();
  //   this.getCustomer(uid);
  //   this.setState({ isEditing: false, editId: uid })
  // }

  // editCustomer = (e) => {
  //   e.preventDefault();
  //   let uid = autheRequests.getUid();
  //   this.setState({ isEditing: true, editId: uid })
  //   this.onOpenModal();
  // }

  render() {
    const { user} = this.props;
    const {userEvents} = this.state;
console.log(user.id);
    // const eventServicesList = userEvents.map((userEvent,i) => {
    //   return (
    //     <label key={i}>
    //       <h4>{userEvent.volunteerServiceType}</h4>
    //     </label>
    //   );
    // })

    return (
      <div className="container  userProfile">
        <div class="welcome">
            <h1 className="">Welcome {user.firstName} {user.lastName}</h1>
            {/* <div class="card-body"> */}
                <h4>Address: {user.city}, {user.state} {user.zip}</h4>
                <h4>Phone Number: {user.phoneNumber}</h4>
                <h4>Email: {user.email}</h4>
               <h2>Events You have Registered </h2> 
               {/* <div>{eventServicesList}</div> */}

        </div>
        
        {/* <EditUserForm
          user={user}
          isEditing={isEditing}
          editId={editId}
          open={this.state.open}
          onCloseModal={this.onCloseModal}
        /> */}
      </div>
    )
  }
}

export default UserProfile;