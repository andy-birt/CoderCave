using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public AnswerRepository(IConfiguration configuration) : base(configuration) { }


        public Answer GetAnswer(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.Id, a.UserId, a.InquireId, a.Content, a.IsSelected, a.CreatedAt
                        FROM Answer a
                        WHERE a.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Answer answer = null;

                    if (reader.Read())
                    {
                        answer = new Answer()
                        {
                            Id = id,
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            InquireId = DbUtils.GetInt(reader, "InquireId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            IsSelected = DbUtils.GetBool(reader, "IsSelected"),
                            CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                        };
                    }

                    reader.Close();
                    return answer;
                }
            }
        }
        public void Add(Answer answer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Answer ([UserId], [InquireId], [Content], [IsSelected], [CreatedAt])
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @InquireId, @Content, @IsSelected, @CreatedAt)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", answer.UserId);
                    DbUtils.AddParameter(cmd, "@InquireId", answer.InquireId);
                    DbUtils.AddParameter(cmd, "@Content", answer.Content);
                    DbUtils.AddParameter(cmd, "@IsSelected", answer.IsSelected);
                    DbUtils.AddParameter(cmd, "@CreatedAt", answer.CreatedAt);

                    answer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Answer answer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // If an answer is selected then any other selected answer should be deselected
                    if (answer.IsSelected)
                    {
                        cmd.CommandText = @"
                            UPDATE Answer
                            SET Content = @Content,
                                IsSelected = 0
                            WHERE InquireId = @InquireId
                        ";

                        DbUtils.AddParameter(cmd, "@InquireId", answer.InquireId);
                    }

                    cmd.CommandText += @"
                        UPDATE Answer
                        SET Content = @Content,
                            IsSelected = @IsSelected
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Content", answer.Content);
                    DbUtils.AddParameter(cmd, "@IsSelected", answer.IsSelected);
                    DbUtils.AddParameter(cmd, "@Id", answer.Id);

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
                    cmd.CommandText = @"
                        DELETE FROM VoteAnswer WHERE AnswerId = @Id
                        DELETE FROM AnswerComment WHERE AnswerId = @Id
                        DELETE FROM Answer WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddVote(int answerId, int value)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO VoteAnswer ([AnswerId], [Value])
                        VALUES (@AnswerId, @Value)
                    ";

                    DbUtils.AddParameter(cmd, "@AnswerId", answerId);
                    DbUtils.AddParameter(cmd, "@Value", value);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
