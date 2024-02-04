using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_API.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Color { get; set; }
        public string Icon { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual List<Transaction> Transactions { get; set; }
    }
}
