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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var inquire = _inquireRepository.GetInquirie(id);
            if (inquire == null)
            {
                return NotFound();
            }
            return Ok(inquire);
        }

        [HttpGet("getbytag/{id}")]
        public IActionResult GetInquiriesByTagId(int id)
        {
            var inquiries = _inquireRepository.GetInquiriesByTag(id);
            
            return Ok(inquiries);
        }

    }
}
