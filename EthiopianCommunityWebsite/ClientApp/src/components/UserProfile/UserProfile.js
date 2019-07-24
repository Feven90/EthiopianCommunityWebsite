import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import getUserInfo from '../../helpers/data/userRequest';
import autheRequests from '../../firebaseRequests/auth';
// import EditUserForm from '../EditUserForm/EditUserForm';
import './UserProfile.scss';
import authRequests from '../../firebaseRequests/auth';

 

export class UserProfile extends React.Component {

  state = {
    user: {},
    isEditing: false,
    editId: '-1',
    open: false,
    isAdmin: false
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

  getCustomer = () => {
    let uid = authRequests.getUid();
    getUserInfo.getUserProfile(uid).then((user) => {
      this.setState({ user })
    });
  }

  componentDidMount() {
    let uid = autheRequests.getUid();
    this.getCustomer(uid);
    this.setState({ isEditing: true, editId: uid })
  }
  
  componentWillUnmount() {
    let uid = autheRequests.getUid();
    this.getCustomer(uid);
    this.setState({ isEditing: false, editId: uid })
  }

  editCustomer = (e) => {
    e.preventDefault();
    let uid = autheRequests.getUid();
    this.setState({ isEditing: true, editId: uid })
    this.onOpenModal();
  }

  render() {
    const { user, isEditing, editId } = this.state;

    return (
      <div className="container customerProfile">
        <div class="welcome">
            <h1>Welcome <b>{user.firstName}</b></h1>
            {/* <div class="card-body"> */}
                <h3>{user.address}</h3>
                <h5>{user.city}, {user.state} {user.zip}</h5>
                <p>{user.email}</p>
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