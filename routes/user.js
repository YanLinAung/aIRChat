var sessionExists = require('chat').userHasSession;

exports.login = function (req, res, userProvider) {
  if (req.route.method === 'get') {
    if (req.session.loggedIn === true) {
      res.redirect('/chat');
    } else {
      res.redirect(401, '/');
    }
  } else if (req.route.method === 'post') {
    userProvider.authenticate(req.body.username, req.body.password, function (err, result) {
      if (err) {
        res.redirect(500, '/');
      } else if (result) {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.redirect('/chat');
      } else {
        res.redirect(401, '/');
      }
    });
  } else {
    res.redirect(400, '/');
  }
};

exports.register = function (req, res, userProvider) {
  if (req.route.method === 'get') {
    if (req.session.loggedIn === true) {
      res.redirect('/chat');
    } else {
      res.redirect(400, '/'); 
    }
  } else if (req.route.method === 'post') {
    if (req.body.password != req.body.passwordrepeat) {
      res.redirect(401, '/');
    } else {
      userProvider.register(req.body.username, req.body.password, function (err, result) {
        if (err || !result) {
          res.redirect(500, '/');
        } else {
          req.session.loggedIn = true;
          req.session.username = req.body.username;
          res.redirect('/chat');
        }
      });
    }
  } else {
    res.redirect(400, '/'); 
  }
};

exports.updateProfile = function (req, res, userProvider) {
  var data = req.body;
  if (!sessionExists(req.session.sessionID)) {
    res.send({success: false});
    return;
  }
  userProvider.authenticate(data.username, data.password, function (error, result) {
    var newPassword = undefined;
    if (data.newPassword === data.newPasswordRepeat && data.newPassword.length > 0) {
      newPassword = data.newPassword;
    }
    if (!error && result) {
      userProvider.updateProfile(
        {
          username    : data.username,
          picture     : data.picture,
          newPassword : newPassword
        },
        function (error, user) {
          if (!error) {
            res.send({success: true});
          } else {
            res.send({success: false});
          }
        }
      );
    } else {
      res.send({success: false});
    }
  });
};
