using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;
using System;

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

        [HttpGet("search")]
        public IActionResult Search(string q, int page = 1, int limit = 10)
        {
            return Ok(_inquireRepository.Search(q, page, limit));
        }

        [HttpPost]
        public IActionResult Post(Inquire inquire)
        {
            inquire.IsArchived = false;
            inquire.CreatedAt = DateTime.Now;
            _inquireRepository.Add(inquire);
            return CreatedAtAction("Get", new { id = inquire.Id }, inquire);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Inquire inquire)
        {
            if (id != inquire.Id)
            {
                return BadRequest();
            }
            _inquireRepository.Update(inquire);
            return NoContent();
        }

        [HttpPost("{inquireId}")]
        public IActionResult Vote(int inquireId, int value)
        {
            _inquireRepository.AddVote(inquireId, value);
            return NoContent();
        }
    }
}
