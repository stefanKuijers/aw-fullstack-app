# SCNet Frontend Workflow
To speed up frontend development and improve code quality and dependency management, we will use a front-end workflow which depends on a task runner.

## Tasks
You will have to run tasks from the command line to generate the frontend related files. Important tasks:
* default - ```gulp``` - in case you want to do frontend work
* build - ```gulp build``` - to build all js and css files. (tip: run ```bower install``` first to make sure you have all dependencies)

## Scope
The frontend workflow performs the following tasks:
1. Watch all files and perform tasks on file change.
2. Reloads the browser when template or js files changed or where added.
3. Compiles SASS to CSS and streams the change to the browser.
4. Concatinate, minify and sourcemap the JS on every change.
5. Creates concatinated and minified stylesheets and JS-files from all dependencies. It is responsible for creating and moving:
  *vendor.min.css* which holds all style required by plugins.
  *vendor.min.js* which holds all javascript required by plugins.
  *fonts* required by plugins will be moved to a font-directory which the vendor.min.css can link to.
6. Makes the server available on the local-network which means testing on tablets and smartphones is easy. On top of that it broadcasts click events, navigation and filling out of forms to all devices which visit your local ip. See [browser-sync](https://www.browsersync.io/).

### Files
* gulp.config.json - here we can change the settings which the workflow will use
* bower.json - a list of frontend dependencies like bootstrap, jquery etc. These are the dependencies of the website and will be bundeled in vendor.*.* files
* package.json - Dependencies for the workflow. These will never go to production as they are only needed during local development
* gulpfile.js - Actually a folder but is treated by node as a file. When called it will execute index.js.

### Folders
* bower_components - FE dependencies
* node_modules - FE - workflow dependencies
* gulpfile.js - contains the node_module which controls the workflow.


## Setup
Setting up on a new computer is a bit of work but once you meet the prequisits installation is just 2 commands away.

### Prequisits
You only have to run through these the first time you want to use the workflow.
1. Node (^4.2.x recommended) and NPM (^2.x recommended) installed. 
2. Command line utils installed. ```npm install -g bower gulp-cli```.
3. Python 2.7 installed and added to path

### Installation
1. pull the repo in which the workflow is setup
2. Change settings in ```config.json``` according to your needs.
3. Install workflow dependencies ```npm install```.
4. (optional) Install frontend dependencies if you are planning to use bower to manage your frontend dependencies```bower install```.

### Start Workflow
1. Change the host in your ```gulpfile.js/config.json``` to match witch your local environment will be running.
2. Run the default task by executing ```gulp```. In your project folder.

## Dependency management
This happens through [bower](https://bower.io/). 

## Known issues
none