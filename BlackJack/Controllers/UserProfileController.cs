using BlackJack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlackJack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : BaseController
    {
        public UserProfileController(
            Repositories.IUserProfileRepository userProfileRepository
        )
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetByFirebaseId(string firebaseId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseId(firebaseId);
            if (userProfile == null) return NotFound();

            return Ok(userProfile);
        }

        [HttpGet]
        public IActionResult GetUserProfile()
        {
            var userProfile = GetCurrentUser();
            if (userProfile == null) return NotFound();

            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(nameof(GetByFirebaseId), new { firebaseId = userProfile.firebaseId }, userProfile);
        }
    }
}
