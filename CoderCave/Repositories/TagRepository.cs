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
                        SELECT Id, Name, Description
                            FROM Tag
                    ";

                    List<Tag> tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
                        });
                    }
                    reader.Close();
                    return tags;
                }
            }
        }
    }
}
