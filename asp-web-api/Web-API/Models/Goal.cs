using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Text.Json.Serialization;

namespace Web_API.Models
{
    public class Goal
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Note { get; set; }
        [Required]
        public decimal GoalBalance { get; set; }
        public Guid UserId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual User Users { get; set; }
    }
}
