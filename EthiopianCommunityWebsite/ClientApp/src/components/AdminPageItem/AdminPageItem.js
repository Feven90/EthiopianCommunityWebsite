import React from 'react';
import { Button, Input } from 'reactstrap';

class AdminPageItem extends React.Component {

    render() {
       const {userEventService} = this.props;
        console.log(userEventService);

        return(
            <div>

                { <div className="event-item card">
                    <h2>Event: {userEventService.eventName}</h2>
                    <h2>Name: {userEventService.firstName} {userEventService.lastName}</h2>
                    <h3>Email: {userEventService.email} </h3>
                    <h3>Phone Number: {userEventService.phoneNumber} </h3>
                    <h3>Volunteer Service: {userEventService.volunteerServiceType}</h3>
                  
                </div> }
                
            </div>
        )};

}      

export default AdminPageItem;
            
            
            
            
            
            
            
            
          