using Dapper;
using EthiopianCommunityWebsite.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Data
{
	public class EventVolunteerServiceRepository
	{
		const string ConnectionString = @"Server=localhost\SQLEXPRESS;Database=EthiopianCommunity;Trusted_Connection=True;";

		public EventVolunteerService AddEventVolunteerService(int eventId, int? userVolunteerId,int volunteerServiceId)
		{
			using (var db = new SqlConnection(ConnectionString))
			{

				var addEventVolunteerService = db.QueryFirstOrDefault<EventVolunteerService>(@"
                    Insert into [EventVolunteerService] (eventId, userVolunteerId, volunteerServiceId)
                    Output inserted.*
                    Values(@eventId, @userVolunteerId, @volunteerServiceId)",
					new
					{
						eventId,
						userVolunteerId,
						volunteerServiceId 
					});


				if (addEventVolunteerService != null)
				{
					return addEventVolunteerService;
				}
			}

			throw new Exception("No user created");
		}
		public IEnumerable<EventVolunteerService> GetEventServiceByEventId(int eventId)
		{
			using (var db = new SqlConnection(ConnectionString))
			{
				var allServices = db.Query<EventVolunteerService>(@"Select volunteerServiceType 
                                                      from [EventVolunteerService] evs join [volunteerService] vs
														on evs.volunteerServiceId = vs.id
                                                       Where eventId = @eventId",
													   new { eventId });

				return allServices;
			}
		}
	}

}