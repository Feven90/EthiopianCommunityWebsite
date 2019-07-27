﻿using Dapper;
using EthiopianCommunityWebsite.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Data
{
    public class VolunteerServiceRepository
    {
        const string ConnectionString = "Server=localhost;Database=EthioCommunity;Trusted_Connection=True;";

        public VolunteerService AddVolunteerService(VolunteerService serviceInfo)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var addServiceInformation = db.QueryFirstOrDefault<VolunteerService>(@"
                    Insert into [volunteerService] (volunteerServiceType)
                    Output inserted.*
                    Values(@volunteerServiceType)",
                    new
                    {
                        volunteerServiceType = serviceInfo.VolunteerServiceType
                    });


                if (addServiceInformation != null)
                {
                    return addServiceInformation;
                }
            }

            throw new Exception("No user created");
        }
    }
}
