import $ from 'jquery';
import React from 'react';
import eventRequest from '../../helpers/data/eventRequest';
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

// import './Home.scss';
const defaultEvent = {
    EventName: '',
    Address: '',
    Time: '',
    SelectedServiceIds: [],
    userSelectedServicesIds: []
    };

const defaultService = {
  volunteerSerivceType: ''
}

class Event extends React.Component {
    state = {
        open: false,
        addNewEvent: defaultEvent,
        paymentType: '',
        events: [], 
        check: false,
        addNewServiceType: defaultService,
        services: [],
        showVolunteerServices: false,
       selectedServiceIds: [],
       userSelectedServicesIds: []
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
        serviceRequest.getVolunteerService().then((services) => {
        this.setState({ services })
        })
    }

    eventInfo = () => {
        eventRequest.getEvents().then((events) => {
            this.setState({ events });
        });
    }
    addVolunteerService = (service) => {
      serviceRequest.postVolunteerServiceRequest(service).then(() => {
        })
    }

    addEvent = (event) => {
      eventRequest.postEventRequest(event).then(() => {
      })
    }
    // addEventVolunteerService = (eventServices) => {
    //   eventServiceRequest.postEventVolunteerServiceRequest(eventServices).then(() => {
    //   })
    // }

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
      // const volunteerSerivceInformation = { ...this.state.addNewServiceType}
      eventInformation.SelectedServiceIds = this.state.selectedServiceIds;
      this.addEvent(eventInformation);
      // this.setState({ addNewServiceType: defaultService})
      this.setState({ addNewEvent:defaultEvent });
      console.log()
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
     const indexOfServiceId = this.state.selectedServiceIds.indexOf(serviceId);
     if(indexOfServiceId == -1){
       this.setState({ selectedServiceIds: this.state.selectedServiceIds.concat(serviceId) })
     } else {
       this.setState({ selectedServiceIds: this.state.selectedServiceIds.filter(id => id != serviceId)})
     }
    }

    render() {
        const { open, addNewEvent, events, addNewServiceType, services, showVolunteerServices, selectedServiceIds, userSelectedServicesIds } = this.state;
        console.log(services);
        const { user, authed } = this.props;


        const eventItem = events.map(event => (
            <EventItem
            event={event}
              key={events.id}
              user={user}
              selectedEvent={this.selectedEvent}
              userCheckboxChangeHandler = {this.UserCheckboxChangeHandler}
              userSelectedServicesIds = {userSelectedServicesIds}
            //   deleteOneProduct={this.deleteOneProduct}
            />
        ));
        // const serviceitem = services.map(service => (
        //   service={service}
        // ));

        const serviceCheckboxes = services.map((service,i) => {
          return (
            <label key={i}>
              <h4>{service.volunteerServiceType}</h4>
              <Input type="checkbox" id={service.id} className="get-service" name={service.volunteerServiceType} checked={selectedServiceIds.indexOf(`${service.id}`) != -1} onChange={this.handleCheckboxChange} />
            </label>
          );
        })
        
        return (
            <div>
                {
                  (user.isAdmin) ? (
                        <div className="addPayment">
                        <button onClick={this.onOpenModal} className="btn" id="buttonOh">Add my Event</button>
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
{ (showVolunteerServices) ?
(                                 <div id="volunteer-services">
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
                                     {serviceCheckboxes}
                                     {/* <Input type="checkbox" value={this.state.check} onChange={this.checkBoxValue}>{serviceitem}</Input>                            */}
                                 </div>
) : ("")
}
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