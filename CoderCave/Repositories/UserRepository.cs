using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetActiveUsers()
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
                         WHERE IsActive = 1";


                    List<User> users = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new User()
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
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public List<User> GetInactiveUsers()
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
                         WHERE IsActive = 0";


                    List<User> users = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new User()
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
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public User GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id AS UserId, u.FirebaseUserId, u.DisplayName AS DisplayName, u.Email, u.FirstName, u.LastName, u.ImageURL, u.Bio,
                               ut.Id AS UserTypeId, ut.Name AS UserTypeName,
                               ISNULL(ic.InquireCount, 0) AS InquireCount,
                               ISNULL(ac.AnswerCount, 0) AS AnswerCount,
                               ISNULL(aac.AcceptedAnswerCount, 0) AS AcceptedAnswerCount,
                               ISNULL((AnswerCommentCount + InquireCommentCount), 0) AS CommentCount
                          FROM [User] u
                                LEFT JOIN UserType ut on u.Id = ut.UserId
                                LEFT JOIN
                                    (
                                        SELECT UserId, COUNT(UserId) AS InquireCount
                                        FROM Inquire
                                        GROUP BY UserId
                                    ) ic ON u.Id = ic.UserId
                                LEFT JOIN
                                    (
                                        SELECT UserId, COUNT(UserId) AS AnswerCount
                                        FROM Answer
                                        GROUP BY UserId
                                    ) ac ON ac.UserId = u.Id
                                LEFT JOIN
                                    (
                                        SELECT UserId, COUNT(UserId) AS AcceptedAnswerCount
                                        FROM Answer
                                        WHERE IsSelected = 1
                                        GROUP BY UserId
                                    ) aac ON aac.UserId = u.Id
                                LEFT JOIN
                                    (
                                        SELECT UserId, COUNT(UserId) AS InquireCommentCount
                                        FROM InquireComment
                                        GROUP BY UserId
                                    ) icc ON icc.UserId = u.Id
                                LEFT JOIN
                                    (
                                        SELECT UserId, COUNT(UserId) AS AnswerCommentCount
                                        FROM InquireComment
                                        GROUP BY UserId
                                    ) acc ON acc.UserId = u.Id
                         WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

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
                            InquireCount = DbUtils.GetInt(reader, "InquireCount"),
                            AnswerCount = DbUtils.GetInt(reader, "AnswerCount"),
                            AcceptedAnswerCount = DbUtils.GetInt(reader, "AcceptedAnswerCount"),
                            CommentCount = DbUtils.GetInt(reader, "CommentCount"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Type = DbUtils.GetString(reader, "UserTypeName")
                            },
                            Inquiries = new List<Inquire>(),
                            Answers = new List<Answer>(),
                            InquireComments = new List<InquireComment>(),
                            AnswerComments = new List<AnswerComment>()
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

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
                                        VALUES (@FirebaseUserId, @Email, @FirstName, @LastName, @ImageURL, @Bio)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@ImageURL", user.ImageURL);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);



                    user.Id = (int)cmd.ExecuteScalar();

                    cmd.CommandText = @"INSERT INTO UserType (UserId, Name)
                                        VALUES (@UserId, 'Author')";

                    DbUtils.AddParameter(cmd, "@UserId", user.Id);

                    cmd.ExecuteScalar();
                    
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User
                        SET Email = @Email,
                            DisplayName = @DisplayName,
                            FirstName = @FirstName,
                            LastName = @LastName,
                            ImageURL = @ImageURL,
                            Bio = @Bio
                    ";

                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@ImageURL", user.ImageURL);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Deactivate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User
                        SET IsActive = 0
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Activate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User
                        SET IsActive = 1
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Promote(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserType
                        SET Name = 'Admin'
                        WHERE UserId = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Demote(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserType
                        SET Name = 'Author'
                        WHERE UserId = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int CheckAdminCount()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT COUNT(*) AS AdminCount FROM UserType WHERE Name = 'Admin'
                    ";

                    var reader = cmd.ExecuteReader();
                    reader.Read();
                    return DbUtils.GetInt(reader, "AdminCount");
                    
                }
            }
        }
    }
}
