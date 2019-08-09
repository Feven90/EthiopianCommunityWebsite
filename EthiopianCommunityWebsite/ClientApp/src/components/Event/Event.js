import $ from 'jquery';
import React from 'react';
import eventRequest from '../../helpers/data/eventRequest';
import userVolunteerRequest from '../../helpers/data/userVolunteerRequest';
import eventServiceRequest from '../../helpers/data/eventVolunteerServiceRequest';
import serviceRequest from '../../helpers/data/volunteerServiceRequest';
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
import MembersAttendingEvent from '../MembersAttendingEvent/MembersAttendingEvent';

// import './Home.scss';
const defaultEvent = {
    EventName: '',
    Address: '',
    Time: '',
    SelectedServiceIds: [],
    //userSelectedServicesIds: []
    };

// const defaultService = {
//   volunteerSerivceType: ''
// }
    const defaultUserService = {
      userSelectedServicesIds: []
    }

class Event extends React.Component {
    state = {
        open: false,
        addNewEvent: defaultEvent,
        paymentType: '',
        events: [], 
        check: false,
        //addNewServiceType: defaultService,
        services: [],
        showVolunteerServices: false,
       selectedServiceIds: [],
       userSelectedServicesIds: [],
       eventId: 0,
       singleEvent: {},
       //registerIsClicked: false,
       userEvents: []
    }

    selectedEvent = (e) => {
      const value = e.target.getAttribute("id");
      this.setState({ eventId: value })
      console.log(value);
    }

    disableButton = () => {
      if(this.props.RegistrationSubmit == "You are registered"){
          this.setState({ registerIsClicked: true})
      }
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
        serviceRequest.getVolunteerService().then((services) => {
        this.setState({ services })
        });
        this.getAllUsersEvents(this.eventId);
    }

    eventInfo = () => {
        eventRequest.getEvents().then((events) => {
            this.setState({ events });
        });
    }
    // addVolunteerService = (service) => {
    //   serviceRequest.postVolunteerServiceRequest(service).then(() => {
    //     })
    // }

    // addEvent = (event) => {
    //   eventRequest.postEventRequest(event);
    // }
    
    addUserVolunteerService = (userVolunteer) => {
      userVolunteerRequest.postUserVolunteerRequest(userVolunteer)
    }
    // addEventVolunteerService = (eventServices) => {
    //   eventServiceRequest.postEventVolunteerServiceRequest(eventServices).then(() => {
    //   })
    // }
    getAllUsersEvents = (eventId) => {
      eventRequest.getAllUsersEvents(eventId).then((userEvents) => {
        this.setState({ userEvents })
        console.log(this.state.userEvents);
      })
    }
    getClickedCheckboxs = (e) => {
      var getId = e.target.id;
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
      this.formFieldStringState('EventName', e);
    };
  
    addressChange = e => {
      this.formFieldStringState('Address', e);
    };
    
    timeChange = e => {
      this.formFieldStringState('Time', e);
    };

    showOrHideForm = () => {
      this.setState({showVolunteerServices: !this.state.showVolunteerServices})
    }
       
        
    formSubmit = (e) => {
      e.preventDefault();
      const eventInformation = { ...this.state.addNewEvent };
      console.log( this.props.user.id);
      // const volunteerSerivceInformation = { ...this.state.addNewServiceType}
      eventInformation.SelectedServiceIds = this.state.selectedServiceIds;
      // this.addEvent(eventInformation);
      eventRequest.postEventRequest(eventInformation)
      .then(() => {
        eventRequest.getEvents().then((results) => { 
          let eventArray = results;
          this.onCloseModal();
          this.setState({ events: eventArray });
        })
      })
     // this.addUserVolunteerService(eventInformation);
      // this.setState({ addNewServiceType: defaultService})
    }

    RegistrationSubmit = (e) => {
      //e.preventDefault();
      const userVolunteerInformation = {
        VolunteerServiceIds: this.state.userSelectedServicesIds,
        UserId: this.props.user.id,
        EventId: e.currentTarget.id
      };
      console.log(userVolunteerInformation.EventId);
      console.log(this.state.singleEvent.id);
      this.disableButton();
      this.setState({ registerIsClicked: true})
      this.addUserVolunteerService(userVolunteerInformation);
      this.setState({ userSelectedServicesIds: [] });

    }

    getCheckedBox = () => {
      document.getElementsByClassName("get-service").addEventListener('click', () => {
        if(this.state.check)
        {
          console.log(document.getElementsByClassName("get-service").getAttribute("id"));
        }
      });

    }

    
    UserCheckboxChangeHandler = (e) => {
      const userServiceId = e.target.id;
      const indexOfUserServiceId = this.state.userSelectedServicesIds.indexOf(userServiceId);
      if(indexOfUserServiceId == -1){
        this.setState({ userSelectedServicesIds: this.state.userSelectedServicesIds.concat(userServiceId) })
      } else {
        this.setState({ userSelectedServicesIds: this.state.userSelectedServicesIds.filter(id => id != userServiceId)})
      }
     }

    handleCheckboxChange = (e) => {
     const serviceId = e.target.id;
     console.log(serviceId);
     const indexOfServiceId = this.state.selectedServiceIds.indexOf(serviceId);
     if(indexOfServiceId == -1){
       this.setState({ selectedServiceIds: this.state.selectedServiceIds.concat(serviceId) })
     } else {
       this.setState({ selectedServiceIds: this.state.selectedServiceIds.filter(id => id != serviceId)})
     }
    }

    render() {
        const { open, userEvents, addNewEvent, events, buttonTextChange, registerIsClicked, addNewServiceType, services, showVolunteerServices, selectedServiceIds, userSelectedServicesIds } = this.state;
        console.log(services);
        const { user, authed } = this.props;

        const eventAttendies = userEvents.map(userEvent => (
          <MembersAttendingEvent 
            userEvent={userEvent}
          />
        ))
        const eventItem = events.map(event => (
            <EventItem
            event={event}
              key={event.id}
              user={user}
              selectedEvent={this.selectedEvent}
              userCheckboxChangeHandler = {this.UserCheckboxChangeHandler}
              userSelectedServicesIds = {userSelectedServicesIds}
              RegistrationSubmit= {this.RegistrationSubmit}
              getSingleEvent= {this.getSingleEvent}
              buttonTextChange= {buttonTextChange}
              //registerIsClicked={registerIsClicked}
            //   deleteOneProduct={this.deleteOneProduct}
            />
        ));
        // const serviceitem = services.map(service => (
        //   service={service}
        // ));

        const serviceCheckboxes = services.map((service,i) => {
          return (
            <label key={i}>
              <div className="toggle-form-div">
                <div>
                  <h4>{service.volunteerServiceType}</h4>
                </div>
                <div className="checkbox-div">
                  <Input type="checkbox" id={service.id}
                    className="get-service" name={service.volunteerServiceType}
                    checked={selectedServiceIds.indexOf(`${service.id}`) != -1}
                    onChange={this.handleCheckboxChange}
                  />
                </div>
              </div>
            </label>
          );
        })
        
        return (
            <div className="wrap-event-user">
                {
                  (user.isAdmin) ? (
                        <div className="addEvent">
                          <div className="btn admin-add-event-button" >
                        <button onClick={this.onOpenModal} id="button-add">Add Event</button>
                        </div>
                     <Modal open={open} onClose={this.onCloseModal} center>
                     <div className="Register">
                             <div id="">                              {/* login-form */}
                               <h1 className="text-center">Add Event</h1>
                               <form className="form-horizontal">
                                 <div className="form-group">
                                   <div className="label-and-input">
                                    <label htmlFor="inputName" className="modal-label control-label">
                                      Event Name:
                                    </label>
                                     <input
                                       type="name"
                                       className="modal-input form-control"
                                       id="inputEmail"
                                       placeholder="Christmass"
                                       value={addNewEvent.eventName}
                                       onChange={this.eventChange}
                                      />
                                   </div>
                                 </div>
                                 <div className="form-group">
                                   <div className="label-and-input">
                                    <label htmlFor="inputAddress" className="modal-label control-label">
                                      Address:
                                    </label>
                                     <input
                                       type="name"
                                       className="modal-input form-control"
                                       id="inputAddress"
                                       placeholder="3324 Edge Moor Dr, Nashville, 37014 "
                                       value={addNewEvent.address}
                                       onChange={this.addressChange}
                                      />
                                   </div>
                                 </div>
                                 <div className="form-group">
                                   <div className="label-and-input">
                                    <label htmlFor="inputLastName" className="modal-label control-label">
                                      Time:
                                    </label>
                                     <input
                                       type="name"
                                       className="modal-input form-control"
                                       id="inputEmail"
                                       placeholder="2:00 pm"
                                       value={addNewEvent.time}
                                       onChange={this.timeChange}
                                     />
                                   </div>
                                 </div>
                                 
                                 <div id="toggle-form-div">
                                    <button type="button" 
                                      className="btn btn-primary"
                                      onClick={this.showOrHideForm}
                                      id="toggle-form">Add Voluntary Services!
                                    </button>
                                 </div>
{ (showVolunteerServices) ?
(                                 <div id="volunteer-services">
                                     {serviceCheckboxes}
                                 </div>
) : ("")
}
                                 <div className="form-group">
                                   <div className="add-event-submit-div">
                                     <Button
                                       type="submit"
                                       className="btn btn-success add-event-submit"
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
                            <h1 className="our-events">Our Events</h1>
                        )
                }
                  <div>{ eventItem}  </div>                 
                  <div className="members-events">
                     <h1>Members Attending Events</h1>
                    {eventAttendies}
                  </div>

            </div>
        )
    }
}

export default Event;