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
                        SELECT t.Id AS TagId, t.Name AS TagName, t.Description AS TagDescription,
                               i.Id AS InquireId, i.UserId, i.Title, i.Content, i.CreatedAt
                          FROM Tag t
                            LEFT JOIN InquireTag it ON t.Id = it.TagId
                            LEFT JOIN Inquire i ON i.Id = it.InquireId
                        WHERE t.Id = @TagId
                    ";

                    DbUtils.AddParameter(cmd, "@TagId", tagId);

                    var reader = cmd.ExecuteReader();

                    var inquiries = new List<Inquire>();

                    while (reader.Read())
                    {
                        inquiries.Add(NewInquireFromReader(reader));
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
                UserId = DbUtils.GetInt(r, "UserId"),
                Title = DbUtils.GetString(r, "Title"),
                Content = DbUtils.GetString(r, "Content"),
                CreatedAt = DbUtils.GetDateTime(r, "CreatedAt")
            };
        }
    }
}
