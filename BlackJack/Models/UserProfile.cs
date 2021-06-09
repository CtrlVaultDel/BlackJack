using System.ComponentModel.DataAnnotations;

namespace BlackJack.Models
{
    public class UserProfile
    {
        public int id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string firebaseId { get; set; }

        [Required]
        [MaxLength(255)]
        public string email { get; set; }

        [Required]
        [MaxLength(255)]
        public string username { get; set; }

        public int money { get; set; }
    }
}