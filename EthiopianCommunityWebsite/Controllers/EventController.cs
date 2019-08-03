using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EthiopianCommunityWebsite.Data;
using EthiopianCommunityWebsite.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EthiopianCommunityWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        readonly EventRepository _eventRepository;
		readonly EventVolunteerServiceRepository _eventVolunteerServiceRepository;
        //readonly CreateUserRequestValidator _validator;
        // readonly CreateCustomerProductValidator _customerProductValidator;

        // GET: /<controller>/
        public EventController(EventRepository eventRepository, EventVolunteerServiceRepository eventVolunteerServiceRepository)
        {
			//_validator = new CreateCustomerRequestValidator();
			_eventRepository = eventRepository;
			_eventVolunteerServiceRepository = eventVolunteerServiceRepository;

		}
        [HttpPost("register")]
        public ActionResult AddEvent(Event createRequest)
        {
            //if (_validator.Validate(createRequest))
            //    return BadRequest(new { error = "customer must have a First Name, Last Name and Email " });
            var newEvent = _eventRepository.AddEvent(createRequest);
			foreach (var volunteerService in createRequest.VolunteerServices)
			{
				_eventVolunteerServiceRepository.AddEventVolunteerService(createRequest.EventId, createRequest.UserVolunteerId, volunteerService.Id);
			}
			return Created($"/api/event", newEvent);

        }
        [HttpGet("allEvents")]
        public ActionResult GetEvents()
        {
            var allEvents = _eventRepository.GetEvents();
            //foreach (var thisEvent in allEvents)
            //{
            //    allEvents.EventVolunteerServices = _eventVolunteerServiceRepository.GetEVSByEvent(thisEvent.Id)
            //}
            return Ok(allEvents);
        }

        //[HttpGet("{userUid}")]
        //public ActionResult GetSingleEvent(string userUid)
        //{
        //    var singleEvent = _eventRepository.GetSingleEvent(userUid);
        //    return Ok(singleEvent);
        //}

        //[HttpPut("{userUid}")]
        //public ActionResult UpdateEvent(Event event)
        //{
        //    var eventInfo = _eventRepository.UpdateEvent(event);
        //    return Ok(eventInfo);
        //}
    }
}