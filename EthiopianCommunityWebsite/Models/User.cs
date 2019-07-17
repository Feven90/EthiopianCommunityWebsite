﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Models
{
    public class User
    {
        public int id { get; }
        public string UserUid { get; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public DateTime Date { get; set; }
        public int Zipcode { get; set; }


    }
}
