using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface IInquireRepository
    {
        Inquire GetInquirie(int id);
        List<Inquire> GetInquiriesByTag(int tagId);
    }
}