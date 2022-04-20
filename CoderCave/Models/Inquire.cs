using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CoderCave.Models
{
    public class Inquire
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public string ContentSummary { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageURL { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
        public int AnswersCount { get; set; }
        public List<InquireComment> Comments { get; set; } = new List<InquireComment>();
        public int CommentsCount { get; set; }
        public List<Tag> Tags { get; set; } = new List<Tag>();
        public int VotesCount { get; set; }
        public int Score { get; set; }
        public bool IsArchived { get; set; }
        public bool AnswerSelected { get; set; }
    }
}
