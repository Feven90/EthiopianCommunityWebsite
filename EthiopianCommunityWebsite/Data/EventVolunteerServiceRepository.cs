﻿using Dapper;
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

		public EventVolunteerService AddEventVolunteerService(int eventId, int? userVolunteerId, int volunteerServiceId)
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
		public IEnumerable<EventVolunteerService> GetEventServiceByEventId(int eventId, int volunteerServiceId)
		{
			using (var db = new SqlConnection(ConnectionString))
			{
				var allServices = db.Query<EventVolunteerService>(@"Select volunteerServiceType, volunteerServiceId
                                                      from [EventVolunteerService] evs join [volunteerService] vs
														on evs.volunteerServiceId = vs.id
                                                       Where eventId = @eventId",
													   new { eventId, volunteerServiceId });

				return allServices;
			}
		}

		public EventVolunteerService UpdateEventVolunteerService(int userVolunteerId, int eventId, int volunteerServiceId)
		{
			using (var db = new SqlConnection(ConnectionString))
			{

				var updateEventVolunteerService = db.QueryFirstOrDefault<EventVolunteerService>(@"Update EventVolunteerService
                            Set userVolunteerId = @UserVolunteerId
                            Where eventId = @eventId 
							AND volunteerServiceId = VolunteerServiceId",
						   new { userVolunteerId, eventId, volunteerServiceId });

				return updateEventVolunteerService;
			}
			throw new Exception("Could not update user");
		}
		public IEnumerable<EventVolunteerService> GetAllUsersWithEventAndServices()
		{
			using (var db = new SqlConnection(ConnectionString))
			{
				var allServices = db.Query<EventVolunteerService>(@"Select u.FirstName, u.LastName, u.PhoneNumber, u.Email,										  e.EventName,vs.VolunteerServiceType
                                                    from [EventVolunteerService] evs 
													join [UserVolunteer] uv on evs.userVolunteerId = uv.id
													join [user] u on u.id = uv.UserId
													join [VolunteerService] vs on uv.volunteerServiceId = vs.id
													join [event] e on evs.eventId = e.id"
													   ).ToList();

				return allServices;
			}
		}
		public IEnumerable<EventVolunteerService> GetAllUsersRegisteredEvents()
		{
			using (var db = new SqlConnection(ConnectionString))
			{
				var allServices = db.Query<EventVolunteerService>(@"Select  e.EventName, u.FirstName, u.LastName
                                                    from [EventVolunteerService] evs 
													join [UserVolunteer] uv on evs.userVolunteerId = uv.id
													join [Event] e on e.id = evs.eventId
													join [user] u on u.id = uv.UserId
													Group By e.EventName, e.EventName, u.FirstName, u.LastName").ToList();

				return allServices;
			}
		}
		public IEnumerable<EventVolunteerService> UserEvents(int userId)
		{
			using (var db = new SqlConnection(ConnectionString))
			{
				var allServices = db.Query<EventVolunteerService>(@"Select  e.EventName, e.Time, e.Address
                                                    from [EventVolunteerService] evs 
													join [UserVolunteer] uv on evs.userVolunteerId = uv.id
													join [Event] e on e.id = evs.eventId
													join [user] u on u.id = uv.UserId
													Group By e.EventName, e.EventName, u.FirstName, u.LastName
													Where u.id=@id").ToList();

				return allServices;
			}
		}
	}
}