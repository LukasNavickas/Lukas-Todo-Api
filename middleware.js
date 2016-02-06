module.exports = function (db) {
    return {
      requireAuthentication: function (req, res, next) {
          var token = req.get('Auth');
          
          db.user.findByToken(token).then(function(user) {
              req.user = user; // put user on request object so we can access it during requests
              next();
          }, function() {
              res.status(401).send();
          });
      }  
    };
};