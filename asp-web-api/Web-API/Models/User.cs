using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_API.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public DateTime Date_Registration { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual List<Goal> Goals { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual List<Transaction> Transactions { get; set; }
    }
}
