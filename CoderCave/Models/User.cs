using System.ComponentModel.DataAnnotations;

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

        public UserType UserType { get; set; }

    }
}
