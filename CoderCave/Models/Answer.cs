using System;
using System.Collections.Generic;

namespace CoderCave.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int InquireId { get; set; }
        public User User { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageURL { get; set; }
        public string Content { get; set; }
        public bool IsSelected { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<AnswerComment> Comments { get; set; } = new List<AnswerComment>();
        public int VotesCount { get; set; }
        public int Score { get; set; }
    }
}
