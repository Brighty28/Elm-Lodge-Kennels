using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;

namespace ElmLodgeKennels.Composers;

public class ContentTypeComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<Umbraco.Cms.Core.Notifications.UmbracoApplicationStartedNotification,
            ContentTypeNotificationHandler>();
    }
}

public class ContentTypeNotificationHandler
    : Umbraco.Cms.Core.Events.INotificationHandler<Umbraco.Cms.Core.Notifications.UmbracoApplicationStartedNotification>
{
    private readonly IContentTypeService _contentTypeService;
    private readonly IShortStringHelper _shortStringHelper;
    private readonly IDataTypeService _dataTypeService;
    private readonly IFileService _fileService;

    public ContentTypeNotificationHandler(
        IContentTypeService contentTypeService,
        IShortStringHelper shortStringHelper,
        IDataTypeService dataTypeService,
        IFileService fileService)
    {
        _contentTypeService = contentTypeService;
        _shortStringHelper = shortStringHelper;
        _dataTypeService = dataTypeService;
        _fileService = fileService;
    }

    public void Handle(Umbraco.Cms.Core.Notifications.UmbracoApplicationStartedNotification notification)
    {
        CreateDocumentTypes();
    }

    private void CreateDocumentTypes()
    {
        // Check if Homepage already exists
        var existing = _contentTypeService.Get("homepage");
        if (existing != null) return;

        // Get data type references
        var textboxDt = _dataTypeService.GetDataType(Constants.DataTypes.Textbox);
        var textareaDt = _dataTypeService.GetDataType(Constants.DataTypes.Textarea);
        var richtextDt = _dataTypeService.GetDataType(Constants.DataTypes.RichtextEditor);
        var uploadDt = _dataTypeService.GetDataType(Constants.DataTypes.Upload);
        var boolDt = _dataTypeService.GetDataType(Constants.DataTypes.Boolean);

        // ---- SEO Composition ----
        var seoComposition = new ContentType(_shortStringHelper, -1)
        {
            Alias = "seoProperties",
            Name = "SEO Properties",
            Description = "SEO meta data properties",
            Icon = "icon-search",
            IsElement = true
        };
        seoComposition.AddPropertyGroup("seo", "SEO");
        seoComposition.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "metaTitle", Name = "Meta Title", Description = "Page title for SEO" }, "seo");
        seoComposition.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "metaDescription", Name = "Meta Description", Description = "Page description for search engines" }, "seo");
        seoComposition.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "metaKeywords", Name = "Meta Keywords" }, "seo");
        _contentTypeService.Save(seoComposition);

        // ---- Homepage ----
        var homepageTemplate = _fileService.GetTemplate("home");
        var homepage = new ContentType(_shortStringHelper, -1)
        {
            Alias = "homepage",
            Name = "Homepage",
            Description = "The main homepage",
            Icon = "icon-home",
            AllowedAsRoot = true
        };
        if (homepageTemplate != null)
            homepage.SetDefaultTemplate(homepageTemplate);

        homepage.ContentTypeComposition = new[] { seoComposition };

        homepage.AddPropertyGroup("content", "Content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "siteName", Name = "Site Name" }, "content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "heroTitle", Name = "Hero Title" }, "content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "heroSubtitle", Name = "Hero Subtitle" }, "content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, richtextDt!) { Alias = "bodyText", Name = "Body Text" }, "content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "servicesIntro", Name = "Services Introduction" }, "content");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, richtextDt!) { Alias = "aboutSummary", Name = "About Summary" }, "content");

        homepage.AddPropertyGroup("footer", "Footer Settings");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "address", Name = "Address" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "telephone", Name = "Telephone" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "mobile", Name = "Mobile" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "email", Name = "Email Address" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "facebookLink", Name = "Facebook Link" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "copyright", Name = "Copyright Text" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "openingTimes", Name = "Opening Times" }, "footer");

        _contentTypeService.Save(homepage);

        // ---- Standard Page ----
        var standardTemplate = _fileService.GetTemplate("standardPage");
        var standardPage = new ContentType(_shortStringHelper, -1)
        {
            Alias = "standardPage",
            Name = "Standard Page",
            Description = "A standard content page",
            Icon = "icon-document"
        };
        if (standardTemplate != null)
            standardPage.SetDefaultTemplate(standardTemplate);

        standardPage.ContentTypeComposition = new[] { seoComposition };
        standardPage.AddPropertyGroup("content", "Content");
        standardPage.AddPropertyType(new PropertyType(_shortStringHelper, richtextDt!) { Alias = "bodyText", Name = "Body Text" }, "content");
        standardPage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "subtitle", Name = "Subtitle" }, "content");
        standardPage.AddPropertyType(new PropertyType(_shortStringHelper, uploadDt!) { Alias = "headerImage", Name = "Header Image" }, "content");

        _contentTypeService.Save(standardPage);

        // ---- Contact Page ----
        var contactTemplate = _fileService.GetTemplate("contact");
        var contactPage = new ContentType(_shortStringHelper, -1)
        {
            Alias = "contactPage",
            Name = "Contact Page",
            Description = "Contact form page",
            Icon = "icon-message"
        };
        if (contactTemplate != null)
            contactPage.SetDefaultTemplate(contactTemplate);

        contactPage.ContentTypeComposition = new[] { seoComposition };
        contactPage.AddPropertyGroup("content", "Content");
        contactPage.AddPropertyType(new PropertyType(_shortStringHelper, richtextDt!) { Alias = "bodyText", Name = "Body Text" }, "content");
        contactPage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "recipientEmailAddress", Name = "Recipient Email Address" }, "content");
        contactPage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "emailSubject", Name = "Email Subject" }, "content");
        contactPage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "senderEmailAddress", Name = "Sender Email Address" }, "content");

        _contentTypeService.Save(contactPage);

        // ---- Prices Page ----
        var pricesTemplate = _fileService.GetTemplate("prices");
        var pricesPage = new ContentType(_shortStringHelper, -1)
        {
            Alias = "pricesPage",
            Name = "Prices Page",
            Description = "Pricing information page",
            Icon = "icon-coin-pound-sterling"
        };
        if (pricesTemplate != null)
            pricesPage.SetDefaultTemplate(pricesTemplate);

        pricesPage.ContentTypeComposition = new[] { seoComposition };
        pricesPage.AddPropertyGroup("content", "Content");
        pricesPage.AddPropertyType(new PropertyType(_shortStringHelper, richtextDt!) { Alias = "bodyText", Name = "Body Text" }, "content");
        pricesPage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "subtitle", Name = "Subtitle" }, "content");

        _contentTypeService.Save(pricesPage);

        // Set allowed children
        homepage.AllowedContentTypes = new[]
        {
            new ContentTypeSort(new Lazy<int>(() => standardPage.Id), 0, standardPage.Alias),
            new ContentTypeSort(new Lazy<int>(() => contactPage.Id), 1, contactPage.Alias),
            new ContentTypeSort(new Lazy<int>(() => pricesPage.Id), 2, pricesPage.Alias)
        };
        _contentTypeService.Save(homepage);
    }
}
