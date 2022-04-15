using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;
using System;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquireCommentController : ControllerBase
    {
        private readonly IInquireCommentRepository _commentRepository;

        public InquireCommentController(IInquireCommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpPost]
        public IActionResult Post(InquireComment comment)
        {
            comment.CreatedAt = DateTime.Now;
            _commentRepository.Add(comment);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, InquireComment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
