using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        Tag GetTag(int id);
    }
}