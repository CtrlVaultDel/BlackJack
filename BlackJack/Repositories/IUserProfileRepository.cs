using BlackJack.Models;

namespace BlackJack.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseId(string firebaseId);
        void Add(UserProfile userProfile);
    }
}