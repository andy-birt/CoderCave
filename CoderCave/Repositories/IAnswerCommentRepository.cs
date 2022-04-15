using CoderCave.Models;

namespace CoderCave.Repositories
{
    public interface IAnswerCommentRepository
    {
        void Add(AnswerComment comment);
        void Delete(int id);
        AnswerComment GetComment(int id);
        void Update(AnswerComment comment);
    }
}