using Dapper;
using EthiopianCommunityWebsite.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Data
{
	public class UserVolunteerRepository
	{
		const string ConnectionString = @"Server=localhost\SQLEXPRESS;Database=EthiopianCommunity;Trusted_Connection=True;";

		public UserVolunteer AddUserVolunteer(UserVolunteer userVolunteerInfo)
		{
			using (var db = new SqlConnection(ConnectionString))
			{

				var addUserVolunteerInformation = db.QueryFirstOrDefault<UserVolunteer>(@"
                    Insert into [userVolunteer] (userId, volunteerServiceId)
                    Output inserted.*
                    Values(@userId, @VolunteerServiceId)",
					new
					{
						userId = userVolunteerInfo.UserId,
						volunteerServiceId = userVolunteerInfo.VolunteerServiceId
					});


				if (addUserVolunteerInformation != null)
				{
					return addUserVolunteerInformation;
				}
			}

			throw new Exception("No user created");
		}
	}
}
