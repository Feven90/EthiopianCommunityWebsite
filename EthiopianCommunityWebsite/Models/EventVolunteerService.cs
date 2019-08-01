using System;
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
    }
}
