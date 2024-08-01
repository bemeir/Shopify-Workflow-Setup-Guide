# Shopify Theme Development and Upgrade Workflow Using GitHub

This guide provides a comprehensive workflow for managing and upgrading Shopify themes using GitHub. By following these steps, you can streamline your theme development process, collaborate effectively with your team, and ensure smooth upgrades and deployments.

## Table of Contents

1. [New Project Setup](#new-project-setup)
2. [Connecting GitHub to Shopify](#connecting-github-to-shopify)
3. [Development Workflow](#development-workflow)
4. [Upgrading the Theme](#upgrading-the-theme)
5. [Git Workflow](#git-workflow)

## [New Project Setup](#new-project-setup)

### Install Dependencies

Run the following command to clone and install all necessary libraries:

Clone into the repository:

```sh
git clone git@github.com:bemeir/Shopify-Workflow-Setup-Guide.git
```
```sh
npm install
```

### Package Dependencies
The package.json should include the following dependencies:
```
{
"@parcel/transformer-sass": "^2.12.0",
"@shopify/prettier-plugin-liquid": "^1.5.0",
"@shopify/theme-check-browser": "^2.8.0",
"@shopify/theme-check-common": "^2.8.0",
"@shopify/theme-check-node": "^2.8.0",
"@splidejs/splide": "^4.1.4",
"@tailwindcss/forms": "^0.5.7",
"autoprefixer": "^10.4.19",
"cssnano": "^7.0.4",
"lodash": "^4.17.21",
"parcel": "^2.12.0",
"parcel-reporter-static-files-copy": "^1.5.3",
"path-browserify": "^1.0.1",
"postcss": "^8.4.40",
"postcss-custom-properties": "^13.3.12",
"postcss-import": "^16.1.0",
"postcss-nesting": "^12.1.5",
"postcss-scss": "^4.0.9",
"postcss-url": "^10.1.3",
"prettier": "^3.3.3",
"process": "^0.11.10",
"swiper": "^11.1.8",
"tailwind-scrollbar-hide": "^1.1.7",
"tailwindcss": "^3.4.7"
}
```

### Initialize TailwindCSS

Run this command to create a tailwind.config.js file if setting up a new project:

```
npx tailwindcss init

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Setup Formatters

Setup formatters for WebStorm or Visual Studio Code to run on every file save. Refer to the [Shopify Liquid Prettier Plugin](https://shopify.dev/docs/storefronts/themes/tools/liquid-prettier-plugin) for more details.

## [Connecting GitHub to Shopify](#connecting-github-to-shopify)

* Go to Shopify Admin:
  *  Navigate to Online Store > Themes.
* Add Your GitHub Repository:
  * Click Add Theme > Connect from GitHub.
  * Follow the prompts to connect your GitHub account and select the repository and branch.
* Set Up Theme:
  * Shopify will now sync with your GitHub repository. Any changes pushed to the selected branch will reflect in your Shopify theme.

## [Development Workflow](#development-workflow)

Run the following command to get a report of any issues with the theme:
```sh 
shopify theme check
```

Alternatively, use the Node version:
```sh 
node theme-check.mjs
```
Check package.json Commands:

```
"scripts": {
  "build": "NODE_ENV=production rm -rf .parcel-cache dist && node build-and-copy.js",
  "watch": "NODE_ENV=development rm -rf .parcel-cache dist && node watch-and-copy.js"
}
```

Run those commands:

```sh
npm run build
```

or

```sh
npm run watch
```
### Project Structure and Development Workflow:
#### src:
* JavaScript (js):
  * There should be only one main file: index.js.
  * All general site-wide JavaScript should be in index.js.
  * Specific section JavaScript should be done inside of ```{% javascript %}``` to ensure it loads deferred.
  * Use ```{% javascript %}``` only for global custom sections. For sections on specific pages, use ```<script>``` tags to avoid bloating the combined JS delivered by Shopify.
* SCSS (scss):
  * Can have multiple folders: Templates, Sections, Snippets. 
  * Uses TailwindCSS for purging unused styles. 
  * Check SCSS files, Tailwind config, and all Liquid files to generate the CSS file. 
  * Reference: [Only Wagyu theme](https://github.com/bemeir/onlywagyu).
* Liquid files:
  * Do Not Edit Native Theme Files:
   * Duplicate files before making changes to ensure upgradability.
   * Example: Duplicate sections/collection-list.liquid to sections/collection-list-extended.liquid.
  * Schema Updates:
   * Update en.default.schema.json with new entries for custom sections.

## [Upgrading the Theme](#upgrading-the-theme)

* Manual Upgrades:
  * Compare the current theme with the new theme.
  * Copy over the changes to the new theme.
  * Test the new theme.
* Template Handling:
  * JSON files in the Templates folder can be directly copied over during upgrades. They contain the content for the theme.
  * CSS Overrides:
  * Do not touch native assets. Create new custom files and override as needed.
  * Use the SCSS files to override the CSS in the new theme.
  * Use the Tailwind config to generate the CSS file.

## [Git Workflow](#git-workflow)
### Create a Feature Branch:
Feature branches are created for new features or changes that will be included in the next release.
```sh 
git checkout -b feature/TicketNumber-ShortDescription
```
or

### Create a Hotfix Branch:
Hotfix branches are creating when there is an urgent fix needed in the main branch and will not be included in the next release.
```sh 
git checkout -b hotfix/TicketNumber-ShortDescription
```
or

### Create a BugFix Branch:
Bugfix branches are created for fixing bugs that will be included in the next release.
```sh 
git checkout -b bugfix/TicketNumber-ShortDescription
```

### Naming Convention:

* Feature Branches: feature/TicketNumber-ShortDescription
* Hotfix Branches: hotfix/TicketNumber-ShortDescription
* Bugfix Branches: bugfix/TicketNumber-ShortDescription

### Commit Changes:

```sh
git add .
git commit -m "Add new feature"
```

### Open a Pull Request:
```sh
git push origin feature/my-new-feature
# Open a pull request on GitHub
```
### Code Review:
* Team members review the pull request. Make any requested changes and push to the feature branch.

### Merge the Pull Request
* After approve the pull request, merge it into the main branch.

### Delete the Feature Branch:
```sh
git branch -d feature/my-new-feature
git push origin --delete feature/my-new-feature
```