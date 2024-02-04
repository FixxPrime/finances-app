using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_API.Models
{
    public class Type
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual List<Transaction> Transactions { get; set; }
    }
}
