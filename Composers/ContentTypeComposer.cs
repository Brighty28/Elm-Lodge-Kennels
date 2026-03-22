using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Serialization;
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
    private readonly IContentService _contentService;
    private readonly IShortStringHelper _shortStringHelper;
    private readonly IDataTypeService _dataTypeService;
    private readonly IFileService _fileService;
    private readonly PropertyEditorCollection _propertyEditors;
    private readonly IConfigurationEditorJsonSerializer _configSerializer;
    private readonly ILogger<ContentTypeNotificationHandler> _logger;

    public ContentTypeNotificationHandler(
        IContentTypeService contentTypeService,
        IContentService contentService,
        IShortStringHelper shortStringHelper,
        IDataTypeService dataTypeService,
        IFileService fileService,
        PropertyEditorCollection propertyEditors,
        IConfigurationEditorJsonSerializer configSerializer,
        ILogger<ContentTypeNotificationHandler> logger)
    {
        _contentTypeService = contentTypeService;
        _contentService = contentService;
        _shortStringHelper = shortStringHelper;
        _dataTypeService = dataTypeService;
        _fileService = fileService;
        _propertyEditors = propertyEditors;
        _configSerializer = configSerializer;
        _logger = logger;
    }

    public void Handle(Umbraco.Cms.Core.Notifications.UmbracoApplicationStartedNotification notification)
    {
        CreateTemplates();
        CreateDocumentTypes();
        SeedContent();
    }

    private ITemplate GetOrCreateTemplate(string alias, string name)
    {
        var template = _fileService.GetTemplate(alias);
        if (template != null) return template;

        template = new Template(_shortStringHelper, name, alias);
        _fileService.SaveTemplate(template);
        _logger.LogInformation("Created template: {Alias}", alias);
        return template;
    }

    private void CreateTemplates()
    {
        GetOrCreateTemplate("home", "Home");
        GetOrCreateTemplate("standardPage", "Standard Page");
        GetOrCreateTemplate("contact", "Contact");
        GetOrCreateTemplate("prices", "Prices");
    }

    private void CreateDocumentTypes()
    {
        var existing = _contentTypeService.Get("homepage");
        if (existing != null) return;

        _logger.LogInformation("Creating document types...");

        // Get built-in data type references
        var textboxDt = _dataTypeService.GetDataType(Constants.DataTypes.Textbox);
        var textareaDt = _dataTypeService.GetDataType(Constants.DataTypes.Textarea);
        var richtextDt = _dataTypeService.GetDataType(Constants.DataTypes.RichtextEditor);
        var uploadDt = _dataTypeService.GetDataType(Constants.DataTypes.Upload);

        // ---- Create Tags Data Type for SEO keywords ----
        var tagsDt = CreateTagsDataType();

        // ---- Create Element Types for Block Lists ----
        var kennelFeatureType = CreateKennelFeatureElementType(textboxDt!);
        var openingTimeType = CreateOpeningTimeElementType(textboxDt!);
        var priceItemType = CreatePriceItemElementType(textboxDt!);

        // ---- Create Block List Data Types ----
        var kennelFeaturesListDt = CreateBlockListDataType("Kennel Features - Block List", kennelFeatureType);
        var openingTimesListDt = CreateBlockListDataType("Opening Times - Block List", openingTimeType);
        var priceItemsListDt = CreateBlockListDataType("Price Items - Block List", priceItemType);

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
        seoComposition.AddPropertyType(new PropertyType(_shortStringHelper, tagsDt!) { Alias = "metaKeywords", Name = "Meta Keywords", Description = "SEO keyword tags" }, "seo");
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
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, kennelFeaturesListDt!) { Alias = "kennelFeatures", Name = "Kennel Features", Description = "Feature items displayed in the features bar" }, "content");

        homepage.AddPropertyGroup("footer", "Footer Settings");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textareaDt!) { Alias = "address", Name = "Address" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "telephone", Name = "Telephone" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "mobile", Name = "Mobile" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "email", Name = "Email Address" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "facebookLink", Name = "Facebook Link" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt!) { Alias = "copyright", Name = "Copyright Text" }, "footer");
        homepage.AddPropertyType(new PropertyType(_shortStringHelper, openingTimesListDt!) { Alias = "openingTimesList", Name = "Opening Times", Description = "Opening hours displayed in the footer" }, "footer");

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
        pricesPage.AddPropertyType(new PropertyType(_shortStringHelper, priceItemsListDt!) { Alias = "priceItems", Name = "Price Items", Description = "Pricing table items" }, "content");

        _contentTypeService.Save(pricesPage);

        // Set allowed children
        homepage.AllowedContentTypes = new[]
        {
            new ContentTypeSort(new Lazy<int>(() => standardPage.Id), 0, standardPage.Alias),
            new ContentTypeSort(new Lazy<int>(() => contactPage.Id), 1, contactPage.Alias),
            new ContentTypeSort(new Lazy<int>(() => pricesPage.Id), 2, pricesPage.Alias)
        };
        _contentTypeService.Save(homepage);

        _logger.LogInformation("Document types created successfully.");
    }

    private IContentType CreateKennelFeatureElementType(IDataType textboxDt)
    {
        var type = new ContentType(_shortStringHelper, -1)
        {
            Alias = "kennelFeature",
            Name = "Kennel Feature",
            Description = "A feature item with icon, title and description",
            Icon = "icon-science",
            IsElement = true
        };
        type.AddPropertyGroup("content", "Content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "featureIcon", Name = "Icon CSS Class", Description = "Font Awesome class e.g. fas fa-shield-dog" }, "content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "featureTitle", Name = "Title" }, "content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "featureDescription", Name = "Description" }, "content");
        _contentTypeService.Save(type);
        return type;
    }

    private IContentType CreateOpeningTimeElementType(IDataType textboxDt)
    {
        var type = new ContentType(_shortStringHelper, -1)
        {
            Alias = "openingTime",
            Name = "Opening Time",
            Description = "A day/time entry for opening hours",
            Icon = "icon-time",
            IsElement = true
        };
        type.AddPropertyGroup("content", "Content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "dayRange", Name = "Day(s)", Description = "e.g. Monday - Friday" }, "content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "hours", Name = "Hours", Description = "e.g. 8am - 6pm" }, "content");
        _contentTypeService.Save(type);
        return type;
    }

    private IContentType CreatePriceItemElementType(IDataType textboxDt)
    {
        var type = new ContentType(_shortStringHelper, -1)
        {
            Alias = "priceItem",
            Name = "Price Item",
            Description = "A service/price entry for the pricing table",
            Icon = "icon-coin-pound-sterling",
            IsElement = true
        };
        type.AddPropertyGroup("content", "Content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "serviceName", Name = "Service Name", Description = "e.g. Single Dog (per night)" }, "content");
        type.AddPropertyType(new PropertyType(_shortStringHelper, textboxDt) { Alias = "price", Name = "Price", Description = "e.g. £15.00" }, "content");
        _contentTypeService.Save(type);
        return type;
    }

    private IDataType CreateTagsDataType()
    {
        if (!_propertyEditors.TryGet(Constants.PropertyEditors.Aliases.Tags, out var tagsEditor))
        {
            _logger.LogWarning("Tags property editor not found, falling back to textbox.");
            return _dataTypeService.GetDataType(Constants.DataTypes.Textbox)!;
        }

        var dt = new DataType(tagsEditor, _configSerializer)
        {
            Name = "SEO Tags",
            DatabaseType = ValueStorageType.Ntext
        };
        _dataTypeService.Save(dt);
        _logger.LogInformation("Created data type: SEO Tags");
        return dt;
    }

    private IDataType CreateBlockListDataType(string name, IContentType elementType)
    {
        if (!_propertyEditors.TryGet(Constants.PropertyEditors.Aliases.BlockList, out var blockListEditor))
        {
            _logger.LogWarning("Block List editor not found for {Name}.", name);
            return _dataTypeService.GetDataType(Constants.DataTypes.Textbox)!;
        }

        var dt = new DataType(blockListEditor, _configSerializer)
        {
            Name = name,
            DatabaseType = ValueStorageType.Ntext,
            Configuration = new BlockListConfiguration
            {
                Blocks = new[]
                {
                    new BlockListConfiguration.BlockConfiguration
                    {
                        ContentElementTypeKey = elementType.Key
                    }
                }
            }
        };
        _dataTypeService.Save(dt);
        _logger.LogInformation("Created data type: {Name}", name);
        return dt;
    }

    private void SeedContent()
    {
        var rootContent = _contentService.GetRootContent();
        if (rootContent != null && rootContent.Any())
        {
            _logger.LogInformation("Content already exists, skipping seed.");
            return;
        }

        var homepageType = _contentTypeService.Get("homepage");
        if (homepageType == null)
        {
            _logger.LogWarning("Homepage content type not found, cannot seed content.");
            return;
        }

        _logger.LogInformation("Seeding initial content...");

        // ---- Homepage ----
        var home = _contentService.Create("Home", -1, "homepage");
        home.SetValue("siteName", "Elm Lodge Kennels");
        home.SetValue("heroTitle", "Welcome to Elm Lodge Kennels");
        home.SetValue("heroSubtitle", "A family-run boarding kennels in the heart of Cambridgeshire, providing a relaxed, safe and friendly atmosphere where the care and welfare of your dog is our top priority.");
        home.SetValue("bodyText", "<p>Elm Lodge Kennels has been providing quality boarding for dogs in the Wisbech area for many years. We are a family-run business and we take enormous pride in offering the highest standard of care and accommodation for your pets.</p><p>Our kennels are set in peaceful countryside surroundings, offering a calm and stress-free environment for your dog. Each kennel is spacious, heated, and comes with its own individual covered run, ensuring your dog has plenty of space to relax and enjoy fresh air.</p>");
        home.SetValue("servicesIntro", "We take enormous pride in offering the highest standard of care and accommodation for your pets.");
        home.SetValue("aboutSummary", "<p>At Elm Lodge Kennels we understand that leaving your dog can be a worrying time. That's why we go above and beyond to ensure every dog in our care receives the love, attention and exercise they need. Our experienced team treats every dog as if they were our own.</p>");
        home.SetValue("address", "Elm Lodge Kennels\nWisbech\nCambridgeshire\nPE13");
        home.SetValue("telephone", "01945 000000");
        home.SetValue("email", "info@elmlodgekennels.co.uk");
        home.SetValue("copyright", "Elm Lodge Kennels. All rights reserved.");
        home.SetValue("metaTitle", "Elm Lodge Kennels - Quality Dog Boarding in Wisbech, Cambridgeshire");
        home.SetValue("metaDescription", "Elm Lodge Kennels is a family-run boarding kennels in Wisbech, Cambridgeshire, providing a relaxed, safe and friendly atmosphere for your dog.");
        // Note: kennelFeatures, openingTimesList, and metaKeywords (tags) are best populated via the backoffice
        _contentService.SaveAndPublish(home);

        // ---- About Us ----
        var about = _contentService.Create("About Us", home.Id, "standardPage");
        about.SetValue("subtitle", "Learn more about our family-run kennels");
        about.SetValue("bodyText", "<p>Elm Lodge Kennels is a family-run business that has been caring for dogs in the Wisbech and Cambridgeshire area for many years. We are fully licensed by the local council and insured, giving you complete peace of mind when leaving your beloved pet with us.</p><p>Our team is made up of experienced, dedicated animal lovers who are passionate about providing the very best care for every dog that stays with us. We believe that every dog deserves individual attention, and we pride ourselves on getting to know each dog's personality, preferences and needs.</p><p>Whether your dog is a regular visitor or staying for the first time, we will make sure they feel right at home. We welcome you to visit us and see our facilities for yourself — we're always happy to show you around.</p>");
        about.SetValue("metaTitle", "About Us - Elm Lodge Kennels");
        about.SetValue("metaDescription", "Learn about Elm Lodge Kennels, a family-run boarding kennels in Wisbech, Cambridgeshire with years of experience caring for dogs.");
        _contentService.SaveAndPublish(about);

        // ---- Our Kennels ----
        var kennels = _contentService.Create("Our Kennels", home.Id, "standardPage");
        kennels.SetValue("subtitle", "Spacious, comfortable accommodation for your dog");
        kennels.SetValue("bodyText", "<p>Our kennels have been purpose-built to provide maximum comfort and safety for your dog. Each kennel is spacious, individually heated, and comes with comfortable bedding to ensure your dog has a great night's sleep.</p><p>Every kennel has its own covered outdoor run, so your dog can enjoy fresh air and exercise whatever the weather. The runs are securely fenced and regularly cleaned to maintain the highest standards of hygiene.</p><h3>Kennel Features</h3><ul><li>Individually heated kennels</li><li>Comfortable bedding provided</li><li>Individual covered outdoor runs</li><li>Secure, fully fenced areas</li><li>Daily cleaning and disinfection</li><li>Fresh water always available</li></ul>");
        kennels.SetValue("metaTitle", "Our Kennels - Elm Lodge Kennels");
        kennels.SetValue("metaDescription", "Explore our spacious, heated boarding kennels with individual covered runs in Wisbech, Cambridgeshire.");
        _contentService.SaveAndPublish(kennels);

        // ---- Facilities ----
        var facilities = _contentService.Create("Facilities", home.Id, "standardPage");
        facilities.SetValue("subtitle", "Everything your dog needs for a comfortable stay");
        facilities.SetValue("bodyText", "<p>At Elm Lodge Kennels we have invested in creating the best possible environment for your dog's stay. Our facilities are designed with your dog's comfort, safety and happiness in mind.</p><h3>Exercise Paddock</h3><p>Our large, securely fenced exercise paddock provides plenty of space for your dog to run, play and explore. Each dog is given individual exercise time to ensure they get the attention and activity they need.</p><h3>Grooming</h3><p>Every dog is groomed and cared for individually throughout the day. We can also arrange for professional grooming services if required.</p><h3>Feeding</h3><p>We provide a high-quality balanced diet for all dogs in our care. If your dog has specific dietary requirements or you prefer to supply your own food, we are more than happy to accommodate this.</p>");
        facilities.SetValue("metaTitle", "Facilities - Elm Lodge Kennels");
        facilities.SetValue("metaDescription", "Discover our exercise paddock, grooming services, and quality feeding arrangements at Elm Lodge Kennels.");
        _contentService.SaveAndPublish(facilities);

        // ---- Contact ----
        var contact = _contentService.Create("Contact", home.Id, "contactPage");
        contact.SetValue("bodyText", "<p>We'd love to hear from you. Whether you'd like to make a booking, arrange a visit, or simply have a question about our services, please don't hesitate to get in touch.</p><p>You can reach us by phone, email, or by filling in the contact form. We aim to respond to all enquiries within 24 hours.</p>");
        contact.SetValue("recipientEmailAddress", "info@elmlodgekennels.co.uk");
        contact.SetValue("emailSubject", "Website Enquiry - Elm Lodge Kennels");
        contact.SetValue("senderEmailAddress", "noreply@elmlodgekennels.co.uk");
        contact.SetValue("metaTitle", "Contact Us - Elm Lodge Kennels");
        contact.SetValue("metaDescription", "Get in touch with Elm Lodge Kennels in Wisbech, Cambridgeshire. Book your dog's stay or arrange a visit.");
        _contentService.SaveAndPublish(contact);

        // ---- Prices ----
        var prices = _contentService.Create("Prices", home.Id, "pricesPage");
        prices.SetValue("subtitle", "Transparent, competitive pricing for quality care");
        prices.SetValue("bodyText", "<p>We believe in offering excellent value for the high standard of care we provide. Our prices are competitive and transparent — there are no hidden costs. Please contact us for our most up-to-date pricing.</p>");
        prices.SetValue("metaTitle", "Prices - Elm Lodge Kennels");
        prices.SetValue("metaDescription", "View our competitive boarding kennel prices at Elm Lodge Kennels, Wisbech. Transparent pricing with no hidden costs.");
        // Note: priceItems block list is best populated via the backoffice
        _contentService.SaveAndPublish(prices);

        _logger.LogInformation("Content seeding complete.");
    }
}
