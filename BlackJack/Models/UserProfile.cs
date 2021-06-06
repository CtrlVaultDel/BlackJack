﻿using System.ComponentModel.DataAnnotations;

namespace BlackJack.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }

        public string DisplayName
        {
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }
    }
}