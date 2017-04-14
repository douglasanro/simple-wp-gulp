# Simple WP Gulp

> A simple boilerplate to create themes with [WordPress](https://wordpress.org), [Gulp](http://gulpjs.com) and [Sass](http://sass-lang.com).

## Table of contents

- [Highlights](#highlights)
- [Getting started](#getting-started)
- [Technologies](#technologies)
- [Structure](#structure)
- [Tasks](#tasks)
- [Tips](#tips)
- [License](#license)

### Highlights

- Simple
- Free
- Fast
- Easy for begginers
- Cool :sunglasses:

### Getting started
First of all, make sure you have installed the main dependencies:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

```bash
# Clone it into the wp-content/themes of your WordPress installation:
$ git clone git@github.com:douglasanro/simple-wp-gulp.git my-theme-folder

# Then, go to the theme's folder:
$ cd my-theme-folder

# Install your dependencies running:
$ npm install
```

### Technologies

- NodeJS
- Gulp
- JS
- Sass
- HTML5
- WordPress

### Structure

If everything from the Getting Started section goes well, you should have this:

```
├── gulpfile.js
├── package.json
├── README.md
├── assets
│	├── css
│	│   ├── main.min.css
│	│   └── main.min.css.map
│	├── fonts
│	│   └── {.eot, .svg, .ttf, .woff, .woff2}
│	├── images
│	│   ├── raw
│	│       └── {.jpg, .png, .svg, .gif, .ico}
│	│   └── {.jpg, .png, .svg, .gif, .ico}
│	├── js
│	│   ├── dev
│	│       └── *.js
│	│   ├── dist
│	│       └── *.min.js
│	├── sass
│	   ├── partials
│	   │   └── _*.scss
│	   └── main.scss
├── inc
│	└── *.php
├── 404.php
├── footer.php
├── functions.php
├── header.php
├── index.php
├── page.php
├── search.php
├── single.php
└── style.css
```

### Gulp Tasks

> If you're running [gulp globally](#tips), so you can use all the tasks below:

1. `gulp`  run the following tasks at the same time.
2. `gulp sass`: Compile, prefix, combine media queries, and minify CSS files.
3. `gulp js`: Concatenate and minify javascript files.
4. `gulp jshint` Check the quality, detect errors and potential problems in your JavaScript code.
5. `gulp sass-lint` Lint, detect errors and potential problems in your Sass code.
6. `gulp images` Minify PNG, JPEG, GIF and SVG of `assets/images/raw` folder and move to `assets/images` once optimized.
7. `gulp watch` Automatically handle changes to CSS, JS and PHP files. Also start BrowserSync.

### Tips

Install `gulp` globally:

```bash
$ npm install --global gulp-cli
```

Run `gulp` locally:

```bash
#add npm run before every task ex:
$ npm run gulp
```

### License
[MIT License](LICENSE) © Simple WP Gulp
