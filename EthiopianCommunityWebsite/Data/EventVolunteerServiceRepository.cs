//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace EthiopianCommunityWebsite.Data
//{
//    public class EventVolunteerServiceRepository
//    {
//        const string ConnectionString = "Server=localhost;Database=EthioCommunity;Trusted_Connection=True;";

//        public Event AddEvent(Event eventInfo)
//        {
//            using (var db = new SqlConnection(ConnectionString))
//            {

//                var addEventInformation = db.QueryFirstOrDefault<Event>(@"
//                    Insert into [event] (eventName, address, time)
//                    Output inserted.*
//                    Values(@eventName, @address, @time)",
//                    new
//                    {
//                        eventName = eventInfo.EventName,
//                        address = eventInfo.Address,
//                        time = eventInfo.Time,
//                    });


//                if (addEventInformation != null)
//                {
//                    return addEventInformation;
//                }
//            }

//            throw new Exception("No user created");
//        }
//}
