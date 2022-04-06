using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface IInquireRepository
    {
        List<Inquire> GetInquiriesByTag(int tagId);
    }
}