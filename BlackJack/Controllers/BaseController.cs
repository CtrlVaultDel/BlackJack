using BlackJack.Repositories;
using BlackJack.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BlackJack.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IUserProfileRepository _userProfileRepository;

        public BaseController() {}

        // Retrieves the current user object by using the provided firebaseId
        protected UserProfile GetCurrentUser()
        {
            // Get User Claims
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseId);
        }
    }
}
