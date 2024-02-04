using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_API.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        [Required]
        public decimal Change { get; set; }
        public string Note { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public decimal Balance { get; set; }
        public Guid UserId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual User Users { get; set; }
        public Guid TypeId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual Type Types { get; set; }
        public Guid CategoryId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual Category Categories { get; set; }
    }
}
