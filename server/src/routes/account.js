import express from 'express';
import mysql from 'mysql';
import dbConfig from '../../config/db_config';
import bkfd2Password from 'pbkdf2-password';
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

const router = express.Router();
const conn = mysql.createConnection(dbConfig);
let hasher = bkfd2Password();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
        4: LOGIN FAILED
        5: SESSION DATA UNDEFINED
        6: BAD DISPLAYNAME
        7: No ARTICLE
        8: PERMISSION DENY
        99: DB ERROR

*/
// 400 Bad Request 409 Conflict 503 ServiceUnavailable 200 OK

passport.use(new FacebookStrategy({
    clientID: "2113745745564277",
    clientSecret: "06f8f52153866d93220718a3a62bd8a8",
    callbackURL: "http://localhost:3001/api/account/login/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    var authId = 'facebook:'+profile.id;
    var sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql, [authId], function(err, results){
      if(results.length>0){
        done(null, results[0]);
      } else {
        var newuser = {
          'authId':authId,
          'userName': profile.id,
          'displayName':profile.displayName,
        };
        var sql = 'INSERT INTO users SET ?'
        conn.query(sql, newuser, function(err, results){
          if(err){
            console.log(err);
            done('Error');
          } else {
            done(null, newuser);
          }
        })
      }
    });
  }
));

passport.use(new LocalStrategy({
    usernameField: "userId",
    passwordField: "password"
  },
  function(username, password, done) {
    var authId = "local:"+username
    var sql = "SELECT * FROM `users` WHERE `authId`=?";
    conn.query(sql, [authId],function (err, rows, fields) {

      if (err){
          return done(err,false,{code:99});
      }
      if(rows.length===0){
        return done(null, false, {code:4});
      }
      return hasher({password:password, salt:rows[0].salt}, function(err, pass, salt, hash){

        if(hash === rows[0].password){
            return done(null, rows[0]);
        } else {
            return done(null, false, {code:4});
        }
      });
    });

  }
));

passport.serializeUser(function(user, done) {
  console.log("serializeUser!!")
  done(null, user.authId);
});

passport.deserializeUser( function(id, done) {

  console.log("deserializeUser!!")
  var sql = 'SELECT * FROM users WHERE authId=?';
  conn.query(sql, [id], function(err, results){
    if(err){
      console.log(err);
      done('There is no user.');
    } else {
      done(null, results[0]);
    }
  })

});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/',
                                      failureRedirect: 'http://localhost:3000/' }));

router.post('/signup', (req, res) => {
    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.userId)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }
    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    if(req.body.displayName.length < 2) {
        return res.status(400).json({
            error: "BAD DISPLAYNAME",
            code: 6
        });
    }

    hasher({password:req.body.password}, function(err, pass, salt, hash){
      var user = {
        authId:'local:'+req.body.userId,
        username:req.body.userId,
        password:hash,
        salt:salt,
        displayName:req.body.displayName
      };
      var sql = 'INSERT INTO users SET ?';
      conn.query(sql, user, function(err, results){
        if(err){
          if( err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });

          } else{
            return res.status(409).json({
                error: "DB ERROR",
                code: 99
            });
          }
        }
        else {
          return res.status(200).json({ success: true });
        }
      });
    });

});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(503).json({
          error: "DB ERROR",
          code: 99
      });
    }

    if(info && info.code===4){
      return res.status(409).json({
        error: "LOGIN FAILED",
        code: 4
      });
    }

    req.logIn(user, function(err) {
      if (err) {
         return next(err);
      }
      return res.json({ user: req.user });
    });

  })(req, res, next);


});


router.get('/getinfo', (req, res) => {

    if(!req.user) {
        return res.status(200).json({
            result: "SESSION DATA UNDEFINED"
        });
    }
    res.status(200).json({ user: req.user });
});

router.post('/logout', (req, res) => {
    req.logout();
    return res.status(200).json({ success: true });
});


router.delete('/:authId', (req, res) => {
  var authId = req.params.authId;
  console.log(authId);

  if(typeof req.user === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 3
      });
  }

  var sql = 'DELETE FROM users WHERE authId=?';

  conn.query(sql, [authId],function (err, rows, fields) {
    if (err){
      return res.status(409).json({
          error: "DB ERROR",
          code: 99
      });
    }
    console.log("Number of records deleted: " + rows.affectedRows);
    req.logout();
    return res.json({ success: true });

  });

});




export default router;

/*
2113745745564277
06f8f52153866d93220718a3a62bd8a8
*/
