import React from 'react';
import './EventItem.scss';
import { Button } from 'reactstrap';

class EventItem extends React.Component {

    // deleteProductEvent = (e) => {
    //     e.preventDefault();
    //     const { deleteOneProduct, customerProduct } = this.props;
    //     deleteOneProduct(customerProduct.productId);
    //   }
    render() {
        const { event, user } = this.props;
        console.log(event);
        return(
            <div>

            <div className="cart-item">
                <div className="cart-img">
                    {/* <img className="cartProduct" src={customerProduct.image} alt="cart items"/> */}
                <h1>{event.eventName}</h1>
                <button>Register</button> 
                </div>
                <div className="product-description">
                    {/* <h5>Title:{customerProduct.title}</h5>
                    <h5>Size:{customerProduct.size}</h5>
                    <h5>Price:${customerProduct.price}</h5> 
                    <button className="btn btn-danger" onClick={this.deleteProductEvent}><i class="fas fa-trash-restore"></i></button> */}
                </div>
                
                </div>
            </div>
        )};

}      

export default EventItem;
            
            
            
            
            
            
            
            
          