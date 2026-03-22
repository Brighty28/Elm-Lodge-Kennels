using System.Net;
using System.Net.Mail;
using System.Text;
using ElmLodgeKennels.Models;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;

namespace ElmLodgeKennels.Controllers;

public class ContactSurfaceController : SurfaceController
{
    private readonly ILogger<ContactSurfaceController> _logger;

    public ContactSurfaceController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        ILogger<ContactSurfaceController> logger)
        : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _logger = logger;
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SendContactForm(ContactFormModel model)
    {
        if (!ModelState.IsValid)
        {
            TempData["ContactError"] = "Please correct the errors below.";
            return CurrentUmbracoPage();
        }

        try
        {
            var recipientEmail = CurrentPage?.Value<string>("recipientEmailAddress") ?? "reception@elmlodgekennels.co.uk";
            var emailSubject = CurrentPage?.Value<string>("emailSubject") ?? "Website Enquiry";
            var senderEmail = CurrentPage?.Value<string>("senderEmailAddress") ?? "noreply@elmlodgekennels.co.uk";

            var body = new StringBuilder();
            body.AppendLine("New enquiry from the Elm Lodge Kennels website:");
            body.AppendLine();
            body.AppendLine($"Name: {model.Name}");
            body.AppendLine($"Email: {model.Email}");
            if (!string.IsNullOrEmpty(model.Phone))
                body.AppendLine($"Phone: {model.Phone}");
            body.AppendLine();
            body.AppendLine("Message:");
            body.AppendLine(model.Message);
            body.AppendLine();
            body.AppendLine("---");
            body.AppendLine("Sent from Elm Lodge Kennels website contact form");

            using var mailMessage = new MailMessage();
            mailMessage.To.Add(new MailAddress(recipientEmail));
            mailMessage.From = new MailAddress(senderEmail, "Elm Lodge Kennels Website");
            mailMessage.Subject = emailSubject;
            mailMessage.Body = body.ToString();
            mailMessage.IsBodyHtml = false;

            using var smtpClient = new SmtpClient();
            smtpClient.Send(mailMessage);

            TempData["ContactSuccess"] = "Thank you for your enquiry! We will get back to you as soon as possible.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact form email");
            TempData["ContactError"] = "Sorry, there was a problem sending your message. Please try calling us instead.";
        }

        return RedirectToCurrentUmbracoPage();
    }
}
