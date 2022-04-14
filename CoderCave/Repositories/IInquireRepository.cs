using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface IInquireRepository
    {
        void Add(Inquire inquire);
        Inquire GetInquirie(int id);
        List<Inquire> GetInquiriesByTag(int tagId);
        Result Search(string q, int p, int l);
    }
}