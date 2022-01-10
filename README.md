# Sqwordle

Sqwordle is a Pokémon-themed knockoff of [Wordle](https://www.powerlanguage.co.uk/wordle/).

# Running the App

- Use `Node.js v14` since it's recommended to only use an Active LTS release for production.

  - See https://nodejs.org/en/about/releases/

- Install Sass from https://github.com/sass/dart-sass
- Run `npm install`
- Run `npm run build-prod` to build the app once for deployment
- Run `npm run dev` to build the app automatically and run a dev server

Assets should now be served from [https://localhost:8080](https://localhost:8080).

Access the site by opening `dev.html` in your browser.

## Configuring VSCode

Make sure to have the `ESLint` and `Prettier` plugins installed. If `formatOnSave` is enabled, but `Prettier` isn't doing anything, try setting `Default Formatter` to `esbenp.prettier-vscode`

## License

This project is licensed under the terms of the MIT license. See `LICENSE.md`
