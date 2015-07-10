# Structure and Possibilities
-----------------------------

The webfire TV app consists of a lot of steps and division/selections. It is important to follow a guideline to fully fulfill the user necessities and also basic design functions, even though some are not necessarily mandatory to make the app work. Here it is the general workflow to make the app functional. The optional steps are marked, but all of them are highly recommended.

The sample App already uses most of the functions, even some optional ones. Editing themes and images is certainly an easy step, but more consistent changes probably will need a deeper look in the App general design.


##Structure
------------------------------

This is a Top-Down visualization of how the system works. From the initial loading page to the player itself. More information about the code itself can be found in the docs folder.

The idea of the general template looks something is similar to this one:
* [Template Views](./assets/template_views.png)

###App Loading Page
------------------------------

_Optional_**, but highly recommended

Although this is an optional task, almost all the current webfireTV apps use a customized loading page, so it's an essential design part and highly recommended.

These are the options and assets to make it happen

####View  

A view must be made to initial loading page that can automatically go to the next page or let the user decide whether to proceed.

####Logo  

The logo image of the content provider


####Background/Loading  

Background image and loading animations


####Video

Some apps use a video in the loading page, instead of a logo-background-loading, which might be an option of editing


###Login
------------------------------
_Optional_**

Some apps (Netflix and Hulu for example) need an account to distribute the streaming options. Therefore, a login page is needed

####View

Another view must be made to make the login option available, just after the loading page. 

####Username/Password

There are two different ways of providing a login. The first one and the most simple is to provide a space to enter login and password information. A session to keep the user logged in would also be necessary.

####Computer/Mobile Login

Another login option is via a computer/mobile. One good example from another app: a code/token is presented in the TV screen and then the user types the code in the computer/mobile App and it's authorized to login.

#####Connection  

If a computer/mobile login is provided, all the connection between devices must be established.

###Menu and Subdivisions
------------------------------

####General Style(Collapse, left-side, etc)  

This probably is the most important step in the App design. The general style of division and categories could change completely. As each different content provider will have different needs, the smartest idea is to provide a sample that uses the structure that most other apps use and that would still be useful for the most varied kind of content. Therefore, structures like a general menu (usually in the left) and the content divided in playlists with inline blocks of videos should continue.

####Levels   

There are a variety of levels that an App could have. Each level must provide its own view (or a unique view with subdivisions)

#####_Problem_: Sample Subcategories not supported** - 
The sample subcategories structure provided by Amazon is not currently supported with the brightcove API yet. However, it would be possible to construct a different view system to make it possible. A lot of thought should be spent in how to correctly develop the Menu-Levels part.


###Preview Video/Playlist  
------------------------------
_Optional_**, but highly recommended

####View 

Another view should be added as an intermediary between video and menu.

####Show Description  

The preview should provide the description, title, subtitle, image and any other kind of metadata of the video.

####Extra options  

Different options of what to do with the video could be added in the preview. As "mark as seen", "subtitles", etc.


###Playlist
------------------------------

####Playlist Interface 

The categorization of playlist and how they should be displayed in the screen. A sample model is already established.

####Queue Interface

The interface for the preview of the next video when the current video is almost over.


###Player  
------------------------------

####Playing Page 

The displayed page when the video is playing.

####Loading Page 

The displayed page when the video is loading.

####Pause Page 

The displayed page when the video is paused.


##Functions
------------------------------

The list of supported mechanisms by the brightcove architecture for fireTV.

The full disclosure of supported items are listed here:

* [Brightcove Support](./assets/brightcove.md)

###DRM
------------------------------

####Supported 

It should be equivalent to the DRM structure in a web page.


###Streaming Protocols
------------------------------

####Supported 

It should be equivalent to the streaming protocol structure in a web page.

####HLS - Problem

The HLS streaming does not work perfectly, it's a known problem by Amazon, but there is still a pause/play problem.


###Ads
------------------------------

####Supported

Supported via IMA3. The link for the full disclosure is provided above


###General
------------------------------

####Message (Exit - example) 

Edition of the communication messages User x App

####Home Screen Android/Remote 

Easy-to-go Home screen functionality with control message for that.

####Fast Forward/Change the control

Control mechanisms to guide the app usage.

