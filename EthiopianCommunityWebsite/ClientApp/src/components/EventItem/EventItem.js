import React from 'react';
import './EventItem.scss';
import { Button, Input } from 'reactstrap';

class EventItem extends React.Component {

    // deleteProductEvent = (e) => {
    //     e.preventDefault();
    //     const { deleteOneProduct, customerProduct } = this.props;
    //     deleteOneProduct(customerProduct.productId);
    //   }

    registerForEvent = (e) => {
        var getId = e.target.value;

    }

    

    render() {
        const { event, user, userCheckboxChangeHandler, userSelectedServicesIds} = this.props;
        console.log(event);
        console.log(event.eventVolunteerService);

        const eventServicesList = event.eventVolunteerService.map((service,i) => {
            return (
              <label key={i}>
                <h4>{service.volunteerServiceType}</h4>
                <Input type="checkbox" id={service.volunteerServiceId} className="get-service" name={service.volunteerServiceType} checked={userSelectedServicesIds.indexOf(`${service.volunteerServiceId}`) != -1} onChange={userCheckboxChangeHandler} />
              </label>
            );
          })
        return(
            <div>

                <div className="event-item card">
                    {/* <img className="cartProduct" src={customerProduct.image} alt="cart items"/> */}
                    <h1>{event.eventName}</h1>
                    <h3>Time: {event.time}</h3>
                    <h3>Address: {event.address}</h3>
                    
                   <h3>Event Services: {eventServicesList}</h3>
                    <Button onClick={this.props.RegistrationSubmit}>Register</Button> 
                </div>
                    <div className="product-description">
                </div>
                
            </div>
        )};

}      

export default EventItem;
            
            
            
            
            
            
            
            
          