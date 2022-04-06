using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }
    }
}
