using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class InquireRepository : BaseRepository, IInquireRepository
    {
        public InquireRepository(IConfiguration configuration) : base(configuration) { }

        public List<Inquire> GetInquiriesByTag(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS TagId, t.[Name] AS TagName, CAST(t.Description AS NVARCHAR(MAX)) AS TagDescription,
                                i.Id AS InquireId, i.UserId AS InquireUserId, i.Title, CAST(i.Content AS NVARCHAR(MAX)) AS InquireContent, CAST(i.Content AS NVARCHAR(255)) AS InquireContentSummary, i.CreatedAt AS InquireCreationDate,
                                iu.DisplayName AS InquireUserDisplayName,
                                COUNT(DISTINCT vi.Id) AS InquireVotesCount,
                                COUNT(DISTINCT ic.Id) AS InquireCommentsCount,
                                COUNT(DISTINCT a.Id) AS AnswersCount
                            FROM Tag t
                            LEFT JOIN InquireTag it ON t.Id = it.TagId
                            LEFT JOIN Inquire i ON i.Id = it.InquireId
                            LEFT JOIN VoteInquire vi ON i.Id = vi.InquireId
                            LEFT JOIN InquireComment ic ON i.Id = ic.InquireId
                            LEFT JOIN [User] iu ON iu.Id = i.UserId 
	                        LEFT JOIN Answer a ON i.Id = a.InquireId
                        WHERE t.Id = @TagId
                        GROUP BY i.Id, i.UserId, i.Title, i.CreatedAt, iu.DisplayName, vi.InquireId, a.InquireId, ic.InquireId, t.Id, t.[Name], CAST(t.Description AS NVARCHAR(MAX)), CAST(i.Content AS NVARCHAR(MAX)), CAST(i.Content AS NVARCHAR(255))
                    ";

                    DbUtils.AddParameter(cmd, "@TagId", tagId);

                    var reader = cmd.ExecuteReader();

                    var inquiries = new List<Inquire>();

                    while (reader.Read())
                    {
                        if (!DbUtils.IsDbNull(reader, "InquireId"))
                        {
                            inquiries.Add(NewInquireFromReader(reader));
                        }
                    }

                    reader.Close();
                    return inquiries;
                }
            }
        }

        private Inquire NewInquireFromReader(SqlDataReader r)
        {
            return new Inquire()
            {
                Id = DbUtils.GetInt(r, "InquireId"),
                UserId = DbUtils.GetInt(r, "InquireUserId"),
                Title = DbUtils.GetString(r, "Title"),
                Content = DbUtils.GetString(r, "InquireContent"),
                ContentSummary = DbUtils.GetString(r, "InquireContentSummary"),
                CreatedAt = DbUtils.GetDateTime(r, "InquireCreationDate"),
                User = new User()
                {
                    Id = DbUtils.GetInt(r, "InquireUserId"),
                    DisplayName = DbUtils.GetString(r, "InquireUserDisplayName")
                },
                AnswersCount = DbUtils.GetInt(r, "AnswersCount"),
                CommentsCount = DbUtils.GetInt(r, "InquireCommentsCount"),
                VotesCount = DbUtils.GetInt(r, "InquireVotesCount")
            };
        }
    }
}
