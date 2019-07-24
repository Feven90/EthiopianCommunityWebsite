using Dapper;
using EthiopianCommunityWebsite.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Data
{
    public class EventRepository
    {
        const string ConnectionString = "Server=localhost;Database=EthioCommunity;Trusted_Connection=True;";

        public Event AddEvent(Event eventInfo)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var addEventInformation = db.QueryFirstOrDefault<Event>(@"
                    Insert into [event] (eventName, address, time, userId)
                    Output inserted.*
                    Values(@eventName, @address, @time, @userId)",
                    new
                    {
                        eventName = eventInfo.EventName,
                        address = eventInfo.Address,
                        time = eventInfo.Time,
                        userId = eventInfo.UserId,
                    });


                if (addEventInformation != null)
                {
                    return addEventInformation;
                }
            }

            throw new Exception("No user created");
        }
        public IEnumerable<Event> GetEvents()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var allEvents = db.Query<Event>(@"Select * from [Event]").ToList();
                return allEvents;
            }
        }
        public Event GetSingleEvent(string userUid)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var allEvents = db.QueryFirstOrDefault<Event>(@"Select * 
                                                      from [Event]
                                                       Where userUid = @userUid",
                                                       new { userUid });

                return allEvents;
            }
        }

        public Event UpdateEvent(Event EventInformation)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var updateEvent = db.QueryFirstOrDefault<Event>(@"Update Event
                            Set firstName = @firstName,
                                lastName = @lastName,
                                date = @date,
                                phoneNumber = @phoneNumber,
                                city = @city,
                                address = @address,
                                state = @state,
                                zipcode = @zipcode,
                                email = @email,
                                output inserted.*
                            Where userUid = @userUid",
                           EventInformation);

                return updateEvent;
            }
            throw new Exception("Could not update user");
        }

    }
}

