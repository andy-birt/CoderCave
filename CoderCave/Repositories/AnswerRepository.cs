﻿using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public AnswerRepository(IConfiguration configuration) : base(configuration) { }

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
                    cmd.CommandText = @"
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
    }
}
