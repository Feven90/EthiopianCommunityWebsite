﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Models
{
    public class EventVolunteerService
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserVolunteerId { get; set; }
        public int VolunteerServiceId { get; set; }
		public string VolunteerServiceType { get; set; }
		public int UserId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string EventName { get; set; }
	}
}
