using BlackJack.Models;
using BlackJack.Utils;
using Microsoft.Extensions.Configuration;

namespace BlackJack.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firebaseId, email, username
                        FROM UserProfile                   
                        WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    UserProfile userProfile = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "id"),
                                firebaseId = DbUtils.GetString(reader, "firebaseId"),
                                email = DbUtils.GetString(reader, "email"),
                                username = DbUtils.GetString(reader, "username")
                            };
                        }

                        return userProfile;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (firebaseId, email, username)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseId, @email, @username)";

                    DbUtils.AddParameter(cmd, "@firebaseId", userProfile.firebaseId);
                    DbUtils.AddParameter(cmd, "@email", userProfile.email);
                    DbUtils.AddParameter(cmd, "@username", userProfile.username);

                    userProfile.id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
