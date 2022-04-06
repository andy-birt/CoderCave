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

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }

        public List<Answer> Answers { get; set; } = new List<Answer>();

        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
