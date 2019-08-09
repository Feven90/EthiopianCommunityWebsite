import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import adminRequest from '../../helpers/data/adminPageRequest';
import autheRequests from '../../firebaseRequests/auth';
// import EditUserForm from '../EditUserForm/EditUserForm';
import AdminPageItem from '../AdminPageItem/AdminPageItem';

 

export class AdminPage extends React.Component {

  state = {
    usersEventServices: []
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



  componentDidMount() {
    adminRequest.getAllUsersWithEventAndServices().then((usersEventServices) => {
        this.setState({ usersEventServices })
    })
  }


  render() {
    const { usersEventServices } = this.state;
    console.log(usersEventServices);

    const adminPageItem = usersEventServices.map(userEventService => (
        <AdminPageItem 
        userEventService = {userEventService}
        key={userEventService.id}
        />
    ));
    
    return (
      <div className=" customerProfile">
        <h1>Members registered for events and services they will provide </h1>
        {adminPageItem}
      </div>
    )
  }
}

export default AdminPage;