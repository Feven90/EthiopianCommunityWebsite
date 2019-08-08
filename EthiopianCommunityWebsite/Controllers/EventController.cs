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
			foreach (var volunteerServiceId in createRequest.SelectedServiceIds)
			{
				_eventVolunteerServiceRepository.AddEventVolunteerService(newEvent.Id, createRequest.UserVolunteerId, volunteerServiceId);
			}
			return Created($"/api/event", newEvent);

		}
		[HttpGet("allEvents")]
		public ActionResult GetEvents()
		{
			var allEvents = _eventRepository.GetEvents();
			foreach (var oneEvent in allEvents)
			{
				oneEvent.EventVolunteerService = _eventVolunteerServiceRepository.GetEventServiceByEventId(oneEvent.Id, oneEvent.VolunteerServiceId);

			}
			return Ok(allEvents);
		}

		[HttpGet("AllUsersWithEventAndServices")]
		public ActionResult GetInfoForAdmin()
		{
			var all = _eventVolunteerServiceRepository.GetAllUsersWithEventAndServices();
			return Ok(all);
		}
		[HttpGet("AllUsersRegisteredEvents")]
		public ActionResult GetAllUsersRegisteredEvents()
		{
			var all = _eventVolunteerServiceRepository.GetAllUsersRegisteredEvents();
			return Ok(all);
		}
		[HttpGet("{id}")]
		public ActionResult GetSingleEvent(int id)
		{
			var singleEvent = _eventRepository.GetSingleEvent(id);
			return Ok(singleEvent);
		}
	}
}