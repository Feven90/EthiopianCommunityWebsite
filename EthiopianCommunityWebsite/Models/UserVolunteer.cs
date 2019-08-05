using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Models
{
	public class UserVolunteer
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public List<int> VolunteerServiceId { get; set; }
	}
}
