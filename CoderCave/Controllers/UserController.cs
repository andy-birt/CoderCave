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

        [HttpGet("active")]
        public IActionResult GetActive()
        {
            return Ok(_userRepository.GetActiveUsers());
        }

        [HttpGet("inactive")]
        public IActionResult GetInactive()
        {
            return Ok(_userRepository.GetInactiveUsers());
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

        [HttpPut("/promote/{id}")]
        public IActionResult PromoteUser(int id)
        {
            _userRepository.Promote(id);
            return NoContent();
        }

        [HttpPut("/demote/{id}")]
        public IActionResult DemoteUser(int id)
        {
            var adminCount = _userRepository.CheckAdminCount();

            if (adminCount < 2)
            {
                return BadRequest("Cannot Demote this admin. Must have another admin first.");
            }
            _userRepository.Demote(id);
            return NoContent();
        }
    }
}
