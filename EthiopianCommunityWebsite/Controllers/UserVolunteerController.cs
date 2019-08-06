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
    public class UserVolunteerController : ControllerBase
    {
		readonly UserVolunteerRepository _userVolunteerRepository;
		readonly EventVolunteerServiceRepository _eventVolunteerServiceRepository;
		//readonly CreateUserRequestValidator _validator;

		public UserVolunteerController(UserVolunteerRepository userVolunteerRepository, EventVolunteerServiceRepository eventVolunteerServiceRepository)
		{
			_userVolunteerRepository = userVolunteerRepository;
			_eventVolunteerServiceRepository = eventVolunteerServiceRepository;

		}
		[HttpPost("register")]
		public ActionResult AddUserVolunteer(UserVolunteer createRequest)
		{

			//if (_validator.Validate(createRequest))
			//    return BadRequest(new { error = "customer must have a First Name, Last Name and Email " });

			foreach (var userService in createRequest.VolunteerServiceIds)
			{
				var userVolunteer = _userVolunteerRepository.AddUserVolunteer(userService, createRequest.UserId);
				_eventVolunteerServiceRepository.UpdateEventVolunteerService(userVolunteer.Id,userVolunteer.EventId, userService);
			}

			return Ok( );

		}
	}
}