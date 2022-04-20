using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, CAST(Description AS NVARCHAR(200)) AS DescriptionSummary,
                               ISNULL(tc.InquireCount, 0) AS InquireCount
                            FROM Tag
                        LEFT JOIN
                            (
                                SELECT TagId, Count(DISTINCT InquireId) AS InquireCount
                                FROM InquireTag
                                GROUP BY TagId
                            ) tc ON tc.TagId = Tag.Id
                        ORDER BY InquireCount DESC
                    ";

                    List<Tag> tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "DescriptionSummary"),
                            InquireCount = DbUtils.GetInt(reader, "InquireCount")
                        });
                    }
                    reader.Close();
                    return tags;
                }
            }
        }

        public Tag GetTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Description
                            FROM Tag
                        WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Tag tag = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
                        };
                    }
                    reader.Close();
                    return tag;
                }
            }
        }

        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag ([Name], [Description])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Description)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Description", tag.Description);

                    tag.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tag 
                        SET Name = @Name,
                            Description = @Description
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", tag.Id);
                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Description", tag.Description);

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
                        DELETE FROM Tag
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
