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

        [HttpPost]
        public IActionResult Post(Answer answer)
        {
            answer.IsSelected = false;
            answer.CreatedAt = DateTime.Now;
            _answerRepository.Add(answer);
            return CreatedAtAction(nameof(Answer), new { id = answer.Id }, answer);
        }
    }
}
