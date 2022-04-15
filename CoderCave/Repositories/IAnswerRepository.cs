using CoderCave.Models;

namespace CoderCave.Repositories
{
    public interface IAnswerRepository
    {
        void Add(Answer answer);
        void AddVote(int answerId, int value);
        void Delete(int id);
        Answer GetAnswer(int id);
        void Update(Answer answer);
    }
}