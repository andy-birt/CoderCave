using CoderCave.Models;
using System.Collections.Generic;

namespace CoderCave.Repositories
{
    public interface IUserRepository
    {
        void Activate(int id);
        void Add(User user);
        int CheckAdminCount();
        void Deactivate(int id);
        void Demote(int id);
        List<User> GetActiveUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetByUserId(int id);
        List<User> GetInactiveUsers();
        void Promote(int id);
        void Update(User user);
    }
}