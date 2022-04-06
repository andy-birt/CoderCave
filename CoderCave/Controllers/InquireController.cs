using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquireController : ControllerBase
    {
        private readonly IInquireRepository _inquireRepository;

        public InquireController(IInquireRepository inquireRepository)
        {
            _inquireRepository = inquireRepository;
        }

        [HttpGet("getbytag/{id}")]
        public IActionResult GetInquiriesByTagId(int id)
        {
            var inquiries = _inquireRepository.GetInquiriesByTag(id);
            if (inquiries == null)
            {
                return NotFound();
            }
            return Ok(inquiries);
        }

    }
}
