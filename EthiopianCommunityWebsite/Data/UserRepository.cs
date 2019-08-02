using Dapper;
using EthiopianCommunityWebsite.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EthiopianCommunityWebsite.Data
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=EthiopianCommunity;Trusted_Connection=True;";

        public User AddUser(User userInfo)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var addUserInformation = db.QueryFirstOrDefault<User>(@"
                    Insert into [user] (firstName,lastName, date, phoneNumber, city, address, state, zipcode, userUid, email)
                    Output inserted.*
                    Values(@firstName,@lastName,@date, @phoneNumber, @city, @address, @state, @zipcode,@userUid,@email)",
                    new { firstName = userInfo.FirstName,
                        lastName = userInfo.LastName,
                        date = DateTime.Now,
                        phoneNumber = userInfo.PhoneNumber,
                        city = userInfo.City,
                        address = userInfo.Address,
                        state = userInfo.State,
                        zipcode = userInfo.Zipcode,
                        email = userInfo.Email,
                        userUid = userInfo.UserUid
                    });


                if (addUserInformation != null)
                {
                    return addUserInformation;
                }
            }

            throw new Exception("No user created");
        }
        public IEnumerable<User> GetUsers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var allUsers = db.Query<User>(@"Select * from [User]").ToList();
                return allUsers;
            }
        }
        public User GetSingleUser(string userUid)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var allUsers = db.QueryFirstOrDefault<User>(@"Select * 
                                                      from [User]
                                                       Where userUid = @userUid",
                                                       new { userUid });

                return allUsers;
            }
        }

        public User UpdateUser(User UserInformation)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var updateUser = db.QueryFirstOrDefault<User>(@"Update User
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
                           UserInformation);

                return updateUser;
            }
            throw new Exception("Could not update user");
        }

    }
}
