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
    public class VolunteerServiceController : ControllerBase
    {

        readonly VolunteerServiceRepository _volunteerServiceRepository;
        //readonly CreateUserRequestValidator _validator;
        // readonly CreateCustomerProductValidator _customerProductValidator;

        // GET: /<controller>/
        public VolunteerServiceController()
        {
            //_validator = new CreateCustomerRequestValidator();
            _volunteerServiceRepository = new VolunteerServiceRepository();
        }
        [HttpPost("register")]
        public ActionResult AddCustomer(VolunteerService createRequest)
        {
            //if (_validator.Validate(createRequest))
            //    return BadRequest(new { error = "customer must have a First Name, Last Name and Email " });
            var newVolunteerService = _volunteerServiceRepository.AddVolunteerService(createRequest);
            return Created($"/api/volunteerService", newVolunteerService);

        }
        [HttpGet("allServices")]
        public ActionResult GetVolunteerService()
        {
            var allServices = _volunteerServiceRepository.GetVolunteerService();
            return Ok(allServices);
        }
    }
}