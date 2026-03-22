# Elm Lodge Kennels

A modern website for Elm Lodge Kennels, a family-run dog boarding kennels in Wisbech, Cambridgeshire. Built with Umbraco CMS 13 on .NET 8.0.

## Tech Stack

- **CMS:** Umbraco 13.13.0
- **Framework:** ASP.NET Core / .NET 8.0
- **Styles:** SCSS (7-1 architecture), compiled to CSS
- **Fonts:** Playfair Display (headings), Inter (body) via Google Fonts
- **Icons:** Font Awesome 6.5.1

## Project Structure

```
ElmLodgeKennels/
├── Composers/              # Umbraco content type configuration
├── Controllers/            # Surface controllers (e.g. contact form)
├── Models/                 # View models
├── Views/                  # Razor templates
│   ├── _Layout.cshtml      # Master layout
│   ├── Home.cshtml         # Homepage
│   ├── Contact.cshtml      # Contact page with form
│   ├── Prices.cshtml       # Pricing page
│   ├── StandardPage.cshtml # Generic content page
│   └── Partials/           # Block grid & list partials
├── wwwroot/
│   ├── css/
│   │   └── site.css        # Compiled CSS output
│   ├── scss/               # SCSS source files (7-1 architecture)
│   │   ├── abstracts/      # Variables, mixins
│   │   ├── base/           # Reset, typography
│   │   ├── components/     # Buttons, cards, forms, alerts, breadcrumb
│   │   ├── layout/         # Container, header, navigation, sections, footer
│   │   ├── pages/          # Home, standard, contact, prices
│   │   ├── themes/         # Theme overrides (reserved)
│   │   ├── vendors/        # Third-party styles (reserved)
│   │   └── main.scss       # Main entry point
│   ├── js/
│   │   └── site.js         # Mobile nav & scroll behaviour
│   └── images/
├── Program.cs              # Application entry point
├── ElmLodgeKennels.csproj  # Project configuration
└── ElmLodgeKennels.sln     # Solution file
```

## SCSS (7-1 Architecture)

The stylesheets follow the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern):

| Folder       | Purpose                                |
|--------------|----------------------------------------|
| `abstracts/` | Variables, mixins (no CSS output)      |
| `base/`      | Reset, typography, base element styles |
| `components/`| Reusable UI: buttons, cards, forms     |
| `layout/`    | Structural: header, footer, nav, grid  |
| `pages/`     | Page-specific styles                   |
| `themes/`    | Theme overrides (reserved for future)  |
| `vendors/`   | Third-party CSS (reserved for future)  |

### Compiling SCSS

Install a Sass compiler and compile `main.scss` to `css/site.css`:

```bash
# Install Dart Sass
npm install -g sass

# One-off compile
sass wwwroot/scss/main.scss wwwroot/css/site.css

# Watch for changes during development
sass --watch wwwroot/scss/main.scss:wwwroot/css/site.css
```

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Dart Sass](https://sass-lang.com/install) (for SCSS compilation)

### Running Locally

```bash
dotnet restore
dotnet run
```

The site will be available at `https://localhost:44381` (or the port configured in `launchSettings.json`). The Umbraco backoffice is accessible at `/umbraco`.

## Features

- Responsive design with mobile-first breakpoints (1024px, 768px, 480px)
- Sticky navigation header with mobile hamburger menu
- Contact form with server-side validation
- SEO meta tags and Open Graph support
- Umbraco CMS-managed content with configurable site settings
