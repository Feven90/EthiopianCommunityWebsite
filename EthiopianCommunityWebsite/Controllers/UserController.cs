using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EthiopianCommunityWebsite.Data;
using EthiopianCommunityWebsite.Models;

namespace EthiopianCommunityWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly UserRepository _userRepository;
        //readonly CreateUserRequestValidator _validator;
        // readonly CreateCustomerProductValidator _customerProductValidator;

        // GET: /<controller>/
        public UserController()
        {
            //_validator = new CreateCustomerRequestValidator();
            _userRepository = new UserRepository();
        }
        [HttpPost("register")]
        public ActionResult AddCustomer(User createRequest)
        {
            //if (_validator.Validate(createRequest))
            //    return BadRequest(new { error = "customer must have a First Name, Last Name and Email " });
            var newUser = _userRepository.AddUser(createRequest);
            return Created($"/api/user", newUser);

        }
         [HttpGet("allUsers")]
        public ActionResult GetUsers()
        {
            var allUsers = _userRepository.GetUsers();
            return Ok(allUsers);
        }

        [HttpGet("{userUid}")]
        public ActionResult GetSingleUser(string userUid)
        {
            var singleUser = _userRepository.GetSingleUser(userUid);
            return Ok(singleUser);
        }

        [HttpPut("{userUid}")]
        public ActionResult UpdateUser(User user)
        {
            var userInfo = _userRepository.UpdateUser(user);
            return Ok(userInfo);
        }
    }
}