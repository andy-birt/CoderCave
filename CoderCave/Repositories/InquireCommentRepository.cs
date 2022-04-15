using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class InquireCommentRepository : BaseRepository, IInquireCommentRepository
    {
        public InquireCommentRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(InquireComment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InquireComment ([InquireId], [UserId], [Content], [CreatedAt])
                        OUTPUT INSERTED.ID
                        VALUES (@InquireId, @UserId, @Content, @CreatedAt)
                    ";

                    DbUtils.AddParameter(cmd, "@InquireId", comment.InquireId);
                    DbUtils.AddParameter(cmd, "@UserId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreatedAt", comment.CreatedAt);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(InquireComment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InquireComment
                        SET Content = @Content
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM InquireComment WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
