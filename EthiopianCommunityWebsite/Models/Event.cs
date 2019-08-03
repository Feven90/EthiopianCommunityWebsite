using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Address { get; set; }
        public string Time { get; set; }
        public int EventId { get; set; }
        public int UserVolunteerId { get; set; }
		public int volunteerService { get; set; }
		public List<int> SelectedServiceIds { get; set; }
    }
}
