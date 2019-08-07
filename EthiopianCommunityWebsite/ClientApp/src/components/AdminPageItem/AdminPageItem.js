import React from 'react';
import { Button, Input } from 'reactstrap';

class AdminPageItem extends React.Component {

    render() {
       const {userEventService} = this.props;
        console.log(userEventService);

        return(
            <div>

                { <div className="event-item card">
                    <h1>{userEventService.firstName}</h1>
                    <h3>Time: {userEventService.lastName}</h3>
                    <h3>Address: {userEventService.volunteerServiceType}</h3>
                  
                </div> }
                
            </div>
        )};

}      

export default AdminPageItem;
            
            
            
            
            
            
            
            
          