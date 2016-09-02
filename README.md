# paneE boilerplate

## Setup

```
npm install
```

## Package

`npm run build` or `gulp package` creates zip file that includes all necessary files.

## How to run on local PC

- Run the command:

`npm run server` or `gulp server` runs dev server.

the server is a browser-sync that has custom logger middleware at `/log`.
Body of POST request to `/log` are printed.

## CSS

We recommend that vanilla css AND|OR sass.
As default, `sass/main.scss` is a entry point of sass file,
`gulp sass` task generates `css/main.css`.
Create vanilla css file in `css/` is also ok.
For example: `css/index.css`

## Lint

`npm run lint` or `gulp lint` executes all lint tasks.

### JavaScript

`gulp eslint` executes eslint and `.eslintrc` is a config file.

### HTML

`gulp htmlhint` executes htmlhint.

### CSS and SASS(SCSS)

- `gulp csslint`
  - csslint for css files (exclude `css/main.css` that come from sass)
  - `.csslintrc` is a config file
- `gulp sasslint`
  - sasslint for scss files
  - `.sasslintrc` is a config file
- `gulp stylelint`
  - stylelint for css and scss files
  - `.stylelintrc` is a config file

