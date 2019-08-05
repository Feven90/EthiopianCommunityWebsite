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
		//readonly CreateUserRequestValidator _validator;
		// readonly CreateCustomerProductValidator _customerProductValidator;

		// GET: /<controller>/
		//public UserVolunteerController(UserVolunteerRepository userVolunteerRepository)
		//{
		//	//_validator = new CreateCustomerRequestValidator();
		//	_userVolunteerRepository = userVolunteerRepository;

		//}
		[HttpPost("register")]
		public ActionResult AddUserVolunteer(UserVolunteer createRequest)
		{
			//if (_validator.Validate(createRequest))
			//    return BadRequest(new { error = "customer must have a First Name, Last Name and Email " });
			var newEvent = _userVolunteerRepository.AddUserVolunteer(createRequest);
			
			return Created($"/api/event", newEvent);

		}
	}
}