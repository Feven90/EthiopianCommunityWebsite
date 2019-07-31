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
        public List<EventVolunteerService> EventVolunteerServices { get; set; }
    }
}
