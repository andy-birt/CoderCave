using System;

namespace CoderCave.Models
{
    public class InquireComment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageURL { get; set; }
        public string Content { get; set; }
        public int InquireId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
