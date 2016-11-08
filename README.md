# Tic-Tac-Toe Game

Technologies Used
-----------------
   - [ReactJS](https://facebook.github.io/react/) 
   - [ReduxJS](http://redux.js.org/)
   - [ImmutableJS](https://facebook.github.io/immutable-js/)
   - [ECMAScript 6](http://es6-features.org/)
   - [Webpack](https://github.com/webpack/webpack)
   - [Ava.JS](https://github.com/avajs/ava)
   - [Sinon.JS](http://sinonjs.org/)
   - [Enzyme](http://airbnb.io/enzyme/)

Requirements
------------
  - Git
  - Node.js v6.x.x

Installation Instructions
-------------------------

####Mac
---

Open a terminal and:

Install Homebrew (if not already installed)

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
    
Install Git (if not already installed):

```sh
brew update
brew doctor
echo 'export PATH="/usr/local/bin:/usr/local/sbin:~/bin:$PATH"' >> ~/.bash_profile
```    
Close and reopen the terminal window.

Install Node v6.x.x (if not already installed):

```sh
brew install node
```

Switch to the folder you want to store this project into and clone the repository:

```sh
git clone [git-repo-url]
```

or use your preferred git tool to do so.

Configure npm packages:

```sh
npm install
```

---

Usage
-----

> - Builds your project into the /public folder
```sh
npm run build
```

> - Builds your project into the /public folder with debug mode
```sh
npm run build:debug
```

> - Launches Browsersync which will start your project in the default browser
```sh
npm run start
```

> - Runs static type checking both on JS and SCSS
```sh
npm run lint
```

> - Runs static type checking on JS
```sh
npm run eslint
```

> - Runs static type checking on SCSS
```sh
npm run stylelint
```

> - Runs the unit tests under /test directory
```sh
npm run test
```

> - Launches a local server that will run the unit tests every time code changes are made
```sh
npm run test:watch
```

> - Runs the unit tests and the code coverage ( it outputs the results both in console and in html under /coverage directory)
```sh
npm run cover
```

> - Launches a local server that will run the unit tests and the code coverage every time code changes are made
```sh
npm run cover:watch
```

> - Runs a check on the code coverage , if the any of the percentages are below the limits this command will fail
```sh
npm run check-coverage
```

> - Cleans your project ( Deletes Dist & node_modules directories )
```sh
npm run clean
```
