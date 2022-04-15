﻿using CoderCave.Models;

namespace CoderCave.Repositories
{
    public interface IInquireCommentRepository
    {
        void Add(InquireComment comment);
        void Delete(int id);
        void Update(InquireComment comment);
    }
}