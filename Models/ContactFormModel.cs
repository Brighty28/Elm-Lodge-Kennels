using System.ComponentModel.DataAnnotations;

namespace ElmLodgeKennels.Models;

public class ContactFormModel
{
    [Required(ErrorMessage = "Please enter your name")]
    [Display(Name = "Your Name")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter your email address")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [Display(Name = "Email Address")]
    public string Email { get; set; } = string.Empty;

    [Display(Name = "Phone Number")]
    public string? Phone { get; set; }

    [Required(ErrorMessage = "Please enter your message")]
    [Display(Name = "Message")]
    [DataType(DataType.MultilineText)]
    public string Message { get; set; } = string.Empty;
}
