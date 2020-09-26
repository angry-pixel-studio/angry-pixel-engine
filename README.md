# Mini Engine JS

## Setup development environment

### Dependencies
[NPM](https://www.npmjs.com/get-npm) and [NodeJS](https://nodejs.org/en/download/)

### Prepare the project
clone the repository and move into the created directory

`git clone git@github.com:mini-engine/mini-engine.git && cd mini-engine`

Install all the dependencies

`npm install`

Run the demo project

`npm start`

The demo will run in http://localhost:8080/

#### Run ESLint and Prettier
`npm run lint`

`npm run lint-and-fix`

`npm run prettier`

`npm run prettier-check`

### Visual studio code
[Download](https://code.visualstudio.com/download)

[Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Recommended configuration in vscode's `settings.json` file

```jsx
{
  // add to the default configuration
  
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "editor.formatOnSave": true,
  "[javascript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
}
```
