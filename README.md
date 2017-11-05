# Simple WP Gulp
[![WordPress](https://img.shields.io/wordpress/v/akismet.svg)](https://github.com/douglasanro/simple-wp-gulp) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/douglasanro/simple-wp-gulp/master/LICENSE)

> A simple boilerplate to create themes with [WordPress](https://wordpress.org), [Gulp](http://gulpjs.com) and [Sass](http://sass-lang.com).

## Table of contents

- [Highlights](#highlights)
- [Getting started](#getting-started)
- [Technologies](#technologies)
- [Structure](#structure)
- [Tasks](#gulp-tasks)
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
$ git clone https://github.com/douglasanro/simple-wp-gulp.git my-theme-folder

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
│	│   └── dist
│	│       └── *.min.js
│	└── sass
│	   ├── partials
│	   │   └── _*.scss
│	   └── main.scss
├── inc
│	└── *.php
├── tasks
│	├── browser-sync.js
│	├── clean.js
│	├── deploy.js
│	├── images.js
│	├── sass-lint.js
│	├── scripts.js
│	├── styles.js
│	└── watch.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .sass-lint.yml
├── gulpfile.js
├── package.json
├── README.md
├── secrets.json
├── 404.php
├── archive.php
├── comments.php
├── footer.php
├── functions.php
├── header.php
├── index.php
├── page.php
├── search.php
├── sidebar.php
├── single.php
└── style.css
```

### Gulp Tasks

> If you're running [gulp globally](#tips), so you can use all the tasks below:

1. `gulp`:  run the following tasks (except `gulp deploy`) at the same time.
1. `gulp styles`: Compile, prefix, combine media queries, and minify CSS files.
1. `gulp scripts`: Concatenate and minify javascript files, check the quality, detect errors and potential problems in your JavaScript code.
1. `gulp sass-lint`: Lint, detect errors and potential problems in your Sass code.
1. `gulp images`: Minify PNG, JPEG, GIF and SVG of `assets/images/raw` folder and move to `assets/images` once optimized.
1. `gulp watch`: Automatically handle changes to CSS, JS and PHP files. Also start BrowserSync.
1. `gulp deploy`: Send files to your production server.

### Tips

Install `gulp` globally:

```bash
$ npm install --global gulp-cli
```

Run `gulp` locally:

```bash
#add npm run before every task e.g.
$ npm run gulp
```

Edit `secrets.json` with your server info.

If you use `Windows` and want to run `gulp deploy` task to Linux server, you need to install `Rsync for Windows`.

1. Download [cwRsync](https://itefix.net/content/cwrsync-free-edition) or other Rsync software (like cygwin).
1. Choose a local and put the files.
1. Add the path in the Windows system variables:
	* Go to Control Panel -> System -> tab Advanced, button Environment Variables.
	* Edit the "Path" system variable and add the full path to the installed rsync:
	* "C:\Program Files\cwRsync\bin" or "C:\cygwin\bin" or "C:\Program Files (x86)\cwRsync\bin" or "C:\cygwin\bin".
1. Reboot you system.

If you have some issues with `gulp deploy` try add a ssh key with empty password.

Fix libraries `jshint` error

If you add a library (like `bootstrap.min.js`) file in `assets/js/dev/` (to concat with your `main.js`) add this `/* jshint ignore:start */` in first line of every library.

### License
[MIT License](LICENSE) © Simple WP Gulp
