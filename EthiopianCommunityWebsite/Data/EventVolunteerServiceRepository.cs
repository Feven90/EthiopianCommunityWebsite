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

		public EventVolunteerService AddEventVolunteerService(int eventId, int userVolunteerId, int volunteerServiceIdz)
		{
			using (var db = new SqlConnection(ConnectionString))
			{

				var addEventVolunteerService = db.QueryFirstOrDefault<EventVolunteerService>(@"
                    Insert into [EventVolunteerService] (eventName, userVolunteerId, volunteerServiceId)
                    Output inserted.*
                    Values(@eventName, @userVolunteerId, @volunteerServiceId)",
					new
					{
						eventId,
						userVolunteerId,
						volunteerServiceId = volunteerServiceIdz
					});


				if (addEventVolunteerService != null)
				{
					return addEventVolunteerService;
				}
			}

			throw new Exception("No user created");
		}
	}

}