using CoderCave.Models;

namespace CoderCave.Repositories
{
    public interface IUserRepository
    {
        void Activate(int id);
        void Add(User user);
        void Deactivate(int id);
        User GetByFirebaseUserId(string firebaseUserId);
        User GetByUserId(int id);
        void Update(User user);
    }
}