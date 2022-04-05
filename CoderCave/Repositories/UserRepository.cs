using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;

namespace CoderCave.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id AS UserId, u.FirebaseUserId, u.DisplayName AS DisplayName, u.Email, u.FirstName, u.LastName, u.ImageURL, u.Bio,
                               ut.Id AS UserTypeId, ut.Name AS UserTypeName
                          FROM [User] u
                               LEFT JOIN UserType ut on u.Id = ut.UserId
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            ImageURL = DbUtils.GetString(reader, "ImageURL"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Type = DbUtils.GetString(reader, "UserTypeName")
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (FirebaseUserId, Email, DisplayName, FirstName, LastName, ImageURL, Bio)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @FirstName, @LastName, @ImageURL, @Bio)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@ImageURL", user.ImageURL);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);



                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
