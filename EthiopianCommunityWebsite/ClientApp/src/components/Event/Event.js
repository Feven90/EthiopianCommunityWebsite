import $ from 'jquery';
import React from 'react';
import eventRequest from '../../helpers/data/eventRequest';
import Modal from 'react-responsive-modal';
// import {
//     TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,
//   } from 'reactstrap';
  import {
     Button, Input
  } from 'reactstrap';
import './Event.scss';
import EventItem from '../EventItem/EventItem';
import { Link } from 'react-router-dom';
import HeaderImg from "../../Images/community1.jpg";

// import './Home.scss';
const defaultEvent = {
    eventName: '',
    address: '',
    time: '',
    userId: 9,
    }

const defaultService = {
  volunteerSerivceType: ''
}

class Event extends React.Component {
    state = {
        open: false,
        addNewEvent: defaultEvent,
        paymentType: '',
        events: [], 
        eventId:'',
        check: false,
        addNewServiceType: defaultService
    }

    selectedEvent = (e) => {
      const value = e.target.getAttribute("id");
      this.setState({ eventId: value })
      console.log(value);
      }

    onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

      componentDidMount() {
        //const uid = authRequest.getUid();
        this.eventInfo();
    }

    eventInfo = () => {
        eventRequest.getEvents().then((events) => {
            this.setState({ events });
        });
    }
    addVolunteerService = (service) => {
      eventRequest.postEventRequest(service).then(() => {
        })
      }
      addEvent = (event) => {
        eventRequest.postEventRequest(event).then(() => {
        })
        }
      

        formFieldStringState = (name,e) => {
            e.preventDefault();
            const tempInfo = { ...this.state.addNewEvent};
            tempInfo[name] = e.target.value;
            this.setState({ addNewEvent: tempInfo});
          }

        formVolunteerStringState = (service,e) => {
          e.preventDefault();
          const tempInfo = { ...this.state.volunteerServiceType};
          tempInfo[service] = e.target.value;
          this.setState({ addNewServiceType : tempInfo });
        }
          volunteerServiceChange = e => {
            this.formVolunteerStringState('volunteerServiceType', e);
          }

          eventChange = e => {
            this.formFieldStringState('eventName', e);
          };
        
          addressChange = e => {
            this.formFieldStringState('address', e);
          };
          
          timeChange = e => {
            this.formFieldStringState('time', e);
          };

        //   expirationDateChange = e => {
        //     this.formFieldStringState('expirationDate', e);
        //   };
       showOrHideForm = () => {
          $("#toggle-form").click(function() {
            $("#volunteer-services").toggle();
          });
        }
       
        
          formSubmit = (e) => {
            e.preventDefault();
            const eventInformation = { ...this.state.addNewEvent };
            const volunteerSerivceInformation = { ...this.state.addNewServiceType}
            this.addEvent(eventInformation);
            this.addVolunteerService(volunteerSerivceInformation);
            this.setState({ addNewServiceType: defaultService})
            this.setState({ addNewEvent:defaultEvent });
          }
        checkBoxValue = () => {
          this.setState({ check: !this.state.check })
        }

    render() {
        const { open, addNewEvent, events, addNewServiceType } = this.state;
        const { user, authed } = this.props;


        const eventItem = events.map(event => (
            <EventItem
            event={event}
              key={events.id}
              user={user}
              selectedEvent={this.selectedEvent}
            //   deleteOneProduct={this.deleteOneProduct}
            />
          ));
        return (
            <div>

                {
                    (user.isAdmin) ? (
                        <div className="addPayment">
                        <button onClick={this.onOpenModal} className="btn" id="buttonOh">Add Event</button>
                     <Modal open={open} onClose={this.onCloseModal} center>
                     <div className="Register">
                             <div id="">                              {/* login-form */}
                               <h1 className="text-center">Add Event</h1>
                               <form className="form-horizontal col-sm-6 ">
                                 <div className="form-group">
                                   <label htmlFor="inputName" className=" control-label">
                                     Event Name:
                                   </label>
                                   <div className="col-sm-8">
                                     <input
                                       type="name"
                                       className="form-control"
                                       id="inputEmail"
                                       placeholder="Christmass"
                                       value={addNewEvent.eventName}
                                       onChange={this.eventChange}
                                      />
                                   </div>
                                 </div>
                                 <div className="form-group">
                                   <label htmlFor="inputAddress" className="control-label">
                                    Address:
                                   </label>
                                   <div className="col-sm-8">
                                     <input
                                       type="name"
                                       className="form-control"
                                       id="inputAddress"
                                       placeholder="3324 Edge Moor Dr, Nashville, 37014 "
                                       value={addNewEvent.address}
                                       onChange={this.addressChange}
                                      />
                                   </div>
                                 </div>
                                 <div className="form-group">
                                   <label htmlFor="inputLastName" className="control-label">
                                     Time:
                                   </label>
                                   <div className="col-sm-8">
                                     <input
                                       type="name"
                                       className="form-control"
                                       id="inputEmail"
                                       placeholder="2:00 pm"
                                       value={addNewEvent.time}
                                       onChange={this.timeChange}
                                     />
                                   </div>
                                 </div>
                                 <button type="button" onClick={this.showOrHideForm} id="toggle-form">Toggle Form!</button>

                                 <div id="volunteer-services">
                                <label htmlFor="inputLastName" className="control-label">
                                     volunteer Service:
                                </label>
                                   <div className="">
                                     <input
                                       type="name"
                                       className="form-control"
                                       id="inputText"
                                       placeholder="teaching"
                                       value={addNewServiceType.volunteerServiceType}
                                       onChange={this.volunteerServiceChange}
                                     />      
                                     </div> 
                                     <Input type="checkbox" value={this.state.check} onChange={this.checkBoxValue} />                           

                                 </div>
                                 {/* <div className="form-group">
                                   <label htmlFor="inputLastName" className="control-label">
                                     Expiration Date
                                   </label>
                                   <div className="col-sm-8">
                                     <input
                                       //type="date"
                                       className="form-control"
                                       id="inputDate"
                                       placeholder="01/2019"
                                       value={addNewEvent.expirationDate}
                                       onChange={this.expirationDateChange}
                                     />
                                   </div>
                                 </div> */}
                                 {/* <FormGroup tag="fieldset">
                                   <label>Payment Type</label>
                                   <FormGroup check>
                                       <Label check>
                                       <Input type="radio" name="radio1" value="0" onClick={this.getPaymentType}/>{' '}
                                       Master Card
                                       </Label>
                                   </FormGroup>
                                   <FormGroup check>
                                       <Label check>
                                       <Input type="radio" name="radio1" value="1" onClick={this.getPaymentType}/>{' '}
                                       Visa
                                       </Label>
                                   </FormGroup>
                                   <FormGroup check >
                                       <Label check>
                                       <Input type="radio" name="radio1" value="2" onClick={this.getPaymentType}/>{' '}
                                       American Express
                                       </Label>
                                   </FormGroup>
                                   </FormGroup>                 */}
                                 <div className="form-group">
                                   <div className="col-sm-12">
                                     <Button
                                       type="submit"
                                       className="btn btn-default col-xs-12"
                                       onClick={this.formSubmit}
                                     >
                                       Add Event 
                                     </Button>
                                   </div>
                                 </div>
                               </form>
                             </div>
                           </div>
                       </Modal>
                    </div>
                     )
                        : 
                        (
                            <h1>All Events</h1>
                        )
                }
                  { eventItem}
            </div>
        )
    }
}

export default Event;