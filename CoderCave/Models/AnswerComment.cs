using System;

namespace CoderCave.Models
{
    public class AnswerComment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageURL { get; set; }
        public string Content { get; set; }
        public int AnswerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public Answer Answer { get; set; }
    }
}
