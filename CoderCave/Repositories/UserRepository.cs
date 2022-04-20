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
                    
                    // First query will get user data with the amount user has posted content

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

                    // The second query will get the user's posted questions

                    cmd.CommandText = @"
                        SELECT TOP(5) Id, Title, CAST(Content AS NVARCHAR(150)) AS ContentSummary
                        FROM Inquire 
                        WHERE UserId = @InquireUserId AND IsArchived = 0
                        ORDER BY CreatedAt DESC
                    ";

                    DbUtils.AddParameter(cmd, "@InquireUserId", id);

                    reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfile.Inquiries.Add(new Inquire()
                        { 
                            UserId = id,
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "ContentSummary")
                        });
                    }

                    reader.Close();

                    // The third query will get the user's posted answers

                    cmd.CommandText = @"
                        SELECT TOP(5) Answer.Id, Answer.InquireId, CAST(Answer.Content AS NVARCHAR(150)) AS ContentSummary, Answer.IsSelected, Inquire.Title
                        FROM Answer
                        LEFT JOIN Inquire ON Inquire.Id = Answer.InquireId
                        WHERE Answer.UserId = @AnswerUserId
                        ORDER BY Answer.CreatedAt DESC
                    ";

                    DbUtils.AddParameter(cmd, "@AnswerUserId", id);

                    reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfile.Answers.Add(new Answer()
                        {
                            UserId = id,
                            Id = DbUtils.GetInt(reader, "Id"),
                            InquireId = DbUtils.GetInt(reader, "InquireId"),
                            Content = DbUtils.GetString(reader, "ContentSummary"),
                            IsSelected = DbUtils.GetBool(reader, "IsSelected"),
                            Inquire = new Inquire()
                            {
                                Id = DbUtils.GetInt(reader, "InquireId"),
                                Title = DbUtils.GetString(reader, "Title")
                            }
                        });
                    }

                    reader.Close();

                    // The fourth query will get the user's posted comments on questions

                    cmd.CommandText = @"
                        SELECT TOP(5) InquireComment.Id, InquireComment.InquireId, CAST(InquireComment.Content AS NVARCHAR(150)) AS ContentSummary, Inquire.Title
                        FROM InquireComment
                        LEFT JOIN Inquire ON Inquire.Id = InquireComment.InquireId
                        WHERE InquireComment.UserId = @InquireCommmentUserId
                        ORDER BY InquireComment.CreatedAt DESC
                    ";

                    DbUtils.AddParameter(cmd, "@InquireCommmentUserId", id);

                    reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfile.InquireComments.Add(new InquireComment()
                        {
                            UserId = id,
                            Id = DbUtils.GetInt(reader, "Id"),
                            InquireId = DbUtils.GetInt(reader, "InquireId"),
                            Content = DbUtils.GetString(reader, "ContentSummary"),
                            Inquire = new Inquire()
                            {
                                Id = DbUtils.GetInt(reader, "InquireId"),
                                UserId = id,
                                Title = DbUtils.GetString(reader, "Title"),
                            }
                        });
                    }

                    reader.Close();

                    // The fifth query will get the user's posted comments on answers

                    cmd.CommandText = @"
                        SELECT TOP(5) AnswerComment.Id, AnswerComment.AnswerId, CAST(AnswerComment.Content AS NVARCHAR(150)) AS ContentSummary,
                            Answer.InquireId, Inquire.Title
                        FROM AnswerComment
                        LEFT JOIN Answer ON Answer.Id = AnswerComment.AnswerId
                        LEFT JOIN Inquire ON Inquire.Id = Answer.InquireId
                        WHERE AnswerComment.UserId = @AnswerCommmentUserId
                        ORDER BY AnswerComment.CreatedAt DESC
                    ";

                    DbUtils.AddParameter(cmd, "@AnswerCommmentUserId", id);

                    reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfile.AnswerComments.Add(new AnswerComment()
                        {
                            UserId = id,
                            Id = DbUtils.GetInt(reader, "Id"),
                            AnswerId = DbUtils.GetInt(reader, "AnswerId"),
                            Content = DbUtils.GetString(reader, "ContentSummary"),
                            Answer = new Answer()
                            {
                                Id = DbUtils.GetInt(reader, "AnswerId"),
                                InquireId = DbUtils.GetInt(reader, "InquireId"),
                                Inquire = new Inquire()
                                {
                                    Id = DbUtils.GetInt(reader, "InquireId"),
                                    Title = DbUtils.GetString(reader, "Title")
                                }
                            }
                        });
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
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseUserId, Email, DisplayName, FirstName, LastName, ImageURL, Bio)
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
                        UPDATE [User]
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
                        UPDATE [User]
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
                        UPDATE [User]
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
