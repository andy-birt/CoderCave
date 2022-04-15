using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class AnswerCommentRepository : BaseRepository, IAnswerCommentRepository
    {
        public AnswerCommentRepository(IConfiguration configuration) : base(configuration) { }

        public AnswerComment GetComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.UserId, c.AnswerId, c.Content, c.CreatedAt
                        FROM AnswerComment c
                        WHERE c.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    AnswerComment comment = null;

                    if (reader.Read())
                    {
                        comment = new AnswerComment()
                        {
                            Id = id,
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            AnswerId = DbUtils.GetInt(reader, "AnswerId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                        };
                    }

                    reader.Close();
                    return comment;
                }
            }
        }

        public void Add(AnswerComment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO AnswerComment ([AnswerId], [UserId], [Content], [CreatedAt])
                        OUTPUT INSERTED.ID
                        VALUES (@AnswerId, @UserId, @Content, @CreatedAt)
                    ";

                    DbUtils.AddParameter(cmd, "@AnswerId", comment.AnswerId);
                    DbUtils.AddParameter(cmd, "@UserId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreatedAt", comment.CreatedAt);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(AnswerComment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE AnswerComment
                        SET Content = @Content
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
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
                    cmd.CommandText = "DELETE FROM AnswerComment WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
