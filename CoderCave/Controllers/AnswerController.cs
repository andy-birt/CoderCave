using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoderCave.Models;
using CoderCave.Repositories;
using System;

namespace CoderCave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepository;

        public AnswerController(IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_answerRepository.GetAnswer(id));
        }

        [HttpPost]
        public IActionResult Post(Answer answer)
        {
            answer.IsSelected = false;
            answer.CreatedAt = DateTime.Now;
            _answerRepository.Add(answer);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Answer answer)
        {
            if (id != answer.Id)
            {
                return BadRequest();
            }
            _answerRepository.Update(answer);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _answerRepository.Delete(id);
            return NoContent();
        }
    }
}
