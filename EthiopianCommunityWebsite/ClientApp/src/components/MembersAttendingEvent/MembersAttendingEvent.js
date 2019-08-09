import React from 'react';
import { Button, Input } from 'reactstrap';
import './MembersAttendingEvent.scss';

class MembersAttendingEvent extends React.Component {
    
    render() {
        const { userEvent } = this.props;
        console.log(userEvent);

        return(
                <div className="user-event-item card">
                    <h2 className="user-event">Event: {userEvent.eventName}</h2>
                    <h3 className="user-event">Name: {userEvent.firstName} {userEvent.lastName}</h3>
                </div> 
                
        )};

}      

export default MembersAttendingEvent;
            
            
            
            
            
            
            
            
          