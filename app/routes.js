

/*    
    Middleware
*/


var loggedIn = function (req, res, next) {
    if (!req.session.user) {
        res.send("Restricted access", 500);
    }
    else {
        next();
    }
},


inSession = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
};









/*
    Routes setup  
*/

exports.setup = function (params) {

    var app = params.app, controllers = params.controllers;

    // Generic Routes
    app.get('/', controllers.index);     
    app.get('/home', controllers.home);   
    app.get('/privacy', controllers.privacy);
    app.get('/developers', controllers.developers);
    
    
    // User Routes 
    app.post('/user', loggedIn, controllers.registerUser);   
    app.get('/user', loggedIn, controllers.getUser);   
    app.put('/user/:id', loggedIn, controllers.updateUserInfo);   
    app.post('/user/delete', loggedIn, controllers.removeUser);
    app.post('/user/login', inSession, controllers.login);   
    app.get('/user/logout', loggedIn, controllers.logout);
    
    
    // Bookmark Routes
    app.post('/bookmarks', loggedIn, controllers.addBookmark);   
    app.get('/bookmark', controllers.addBookmarkRemotely);   
    app.get('/bookmark/:id', controllers.updateBookmarkRemotely);   
    app.get('/bookmarks', controllers.getBookmarks);
    app.put('/bookmarks/:id', loggedIn, controllers.updateBookmark);
    app.delete('/bookmarks/:id', loggedIn, controllers.removeBookmark);
    app.get('/read/:id', controllers.readBookmark);
    
    
    // Demo
    app.get('/demo', controllers.demo);
};
