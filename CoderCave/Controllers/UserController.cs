using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get(int userId)
        {
            var userProfile = _userRepository.GetByUserId(userId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            //user.UserType = UserType.USER_TYPE_ID;
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = user.FirebaseUserId }, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.Update(user);
            return NoContent();
        }

        [HttpPut("/deactivate/{id}")]
        public IActionResult DeactivateUser(int id)
        {
            _userRepository.Deactivate(id);
            return NoContent();
        }

        [HttpPut("/activate/{id}")]
        public IActionResult ActivateUser(int id)
        {
            _userRepository.Activate(id);
            return NoContent();
        }
    }
}
