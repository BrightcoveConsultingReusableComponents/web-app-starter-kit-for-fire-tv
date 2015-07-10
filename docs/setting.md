# Setting up the work environment
---------------------------------

This project uses SASS and GULP frameworks.

Although it's definitely possible to directly edit the css and js file, it is recommended to use the implemented build system to keep better notion of the User Interface changes.

###A brief explanation and links for both of them
--------------

#####Sass

SASS works a pre-processor of .css. It allows you to use direct inheritance, variables, mixins in scss files, so you can build the .css files later. Gulp.js is the system used here to keep track of the changes and build the final .scss files.

The full explanation about SASS is in the styling file:

* [SASS](./assets/styling.md)

#####Gulp

Gulp is a build system that let you keep track of the changes in your js/scss files and then automatically build the final js files of the project. It's first necessary to install gulp with npm globally and in the fireTV folder.

* [Install GULP](http://gulpjs.com/)

After using following the installing instructions, it's time to understand the gulp structure. The gulpfile.js is the 'law' for gulp. It means that gulpfile.js defines how the build system will work. In this project for example, the build will take changes in the folder 'common/js' and 
'common/scss' and build it to the files in the folder 'out/'. 

The command gulp watch in the command line keeps track of each change without having to manually build it all the time.

In the files of the folder 'src/projects/', there are the files that define which files each project will track. So basically, after installing gulp, you just need to cd the folder in the command line and type gulp watch. Every change in tracked scss and js files in the common folder will be added to the final project. 

The full explanation about Gulp build and installation in this project is here (highly recommended):

* [GULP](./assets/building.md)  

#####Related DOCS:
* [Test and Submission](./assets/testing-and-submission.md)
* [Building](./assets/building.md)
* [Styling](./assets/styling.md)
