using System.ComponentModel.DataAnnotations;

namespace CoderCave.Models
{
    public class Tag
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }
        public int InquireCount { get; set; }
    }
}
