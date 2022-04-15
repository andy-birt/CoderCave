using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;
using System;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerCommentController : ControllerBase
    {
        private readonly IAnswerCommentRepository _commentRepository;

        public AnswerCommentController(IAnswerCommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_commentRepository.GetComment(id));
        }

        [HttpPost]
        public IActionResult Post(AnswerComment comment)
        {
            comment.CreatedAt = DateTime.Now;
            _commentRepository.Add(comment);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, AnswerComment comment)
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
