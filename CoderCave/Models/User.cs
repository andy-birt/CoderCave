using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace CoderCave.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string ImageURL { get; set; }
        public string Bio { get; set; }
        public int InquireCount { get; set; }
        public int AnswerCount { get; set; }
        public int AcceptedAnswerCount { get; set; }
        public int CommentCount { get; set; }

        public UserType UserType { get; set; }
        public List<Inquire> Inquiries { get; set; }
        public List<Answer> Answers { get; set; }
        public List<InquireComment> InquireComments { get; set; }
        public List<AnswerComment> AnswerComments { get; set; }
    }
}
