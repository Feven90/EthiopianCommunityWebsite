import React from 'react';
import './EventItem.scss';
import { Button } from 'reactstrap';

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
        const { event, user} = this.props;
        return(
            <div>

                <div className="event-item card">
                    {/* <img className="cartProduct" src={customerProduct.image} alt="cart items"/> */}
                    <h1>{event.eventName}</h1>
                    <h3>Time: {event.time}</h3>
                    <h3>Address: {event.address}</h3>
                    <Button id={event.id} onClick={this.props.selectedEvent}>Register</Button> 
                </div>
                    <div className="product-description">
                </div>
                
            </div>
        )};

}      

export default EventItem;
            
            
            
            
            
            
            
            
          