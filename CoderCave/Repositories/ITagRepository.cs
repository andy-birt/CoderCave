using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> GetAllTags();
        Tag GetTag(int id);
        void Update(Tag tag);
    }
}