import express from 'express';
import mysql from 'mysql';
import dbConfig from '../../config/db_config';
const conn = mysql.createConnection(dbConfig);
const router = express.Router();


router.get(['/articles','/articles/:id'], (req, res) => {
  console.log("dd")
    let id = req.params.id;

    if(id) {
        let sql = "SELECT * FROM `etc_table` WHERE `id`=?";
        conn.query(sql, [id],function (err, rows, fields) {
            if (err){
              return res.status(503).json({
                  error: "DB ERROR",
                  code: 99
              });
            }
            if(rows.length===0){
              return res.status(409).json({
                error: "NO ARTICLE",
                code: 7
              });
            }
            //console.dir(rows[0])
            var result = rows.sort((a,b)=>{
              return b.id-a.id;
            })
            return  res.status(200).json(result);

        });
    } else{
        let sql = "SELECT * FROM `etc_table`";
        conn.query(sql,function (err, rows, fields) {
            if (err){
              console.dir(err);
              return res.status(409).json({
                  error: "DB ERROR",
                  code: 99
              });
            }
            var result = rows.sort((a,b)=>{
              return b.id-a.id;
            })
            return  res.status(200).json(result);
        });
    }


});

router.get("/search", (req, res) => {
    var obj = {
      "제목": "title",
      "내용":"content",
      "작성자":"authorName"
    }

    let criteria = obj[req.query.criteria];
    let keyword = "%"+req.query.keyword+"%";
    console.log(criteria,keyword)

    let sql = "SELECT * FROM `etc_table` WHERE ?? LIKE ?";
    conn.query(sql, [criteria, keyword],function (err, rows, fields) {
        if (err){
          return res.status(503).json({
              error: "DB ERROR",
              code: 99
          });
        }
        if(rows.length===0){
          return res.status(409).json({
            error: "NO ARTICLE",
            code: 7
          });
        }

        var result = rows.sort((a,b)=>{
          return b.id-a.id;
        })
        return  res.status(200).json(result);
    });

});

router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.user === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
    console.log("asdasdds")

    // CHECK CONTENTS VALID
    if(typeof req.body.content !== 'string' || req.body.content === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    var article = {
      title:req.body.title,
      authorId: req.user.authId,
      authorName: req.user.displayName,
      content: req.body.content
    };

    var sql = 'INSERT INTO `etc_table` SET ?';
    conn.query(sql, article, function(err, results){
      if(err) {
        console.log(err)
        return res.status(409).json({
            error: "DB ERROR",
            code: 99
        });
      } else {
          return res.json({ success: true });
      }
    });


});

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body.title)
  console.log(req.body.content)

  if(typeof req.user === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 3
      });
  }

  var articleId = req.params.id;
  var authId = req.user.authId;
  var title = req.body.title;
  var content = req.body.content;

  var sql = "SELECT * FROM `etc_table` WHERE `id`=?";
  conn.query(sql, [articleId],function (err, rows, fields) {
    if (err){
      return res.status(409).json({
          error: "DB ERROR",
          code: 99
      });
    }
    if(rows.length===0){
      return res.status(409).json({
        error: " NO ARTICLE",
        code: 7
      });
    }

    if(rows[0].authorId.localeCompare(authId) === 0){

      var sql = "UPDATE `etc_table` SET `title`=?, `content`=? WHERE `id`=?";
      conn.query(sql, [title, content, articleId],function (err, result) {
        if (err){
          return res.status(409).json({
              error: "DB ERROR",
              code: 99
          });
        }
        console.log("Number of records updated: " + result.affectedRows);
        console.log(result)
        return res.status(200).json( {"article" : {
          id: articleId,
          title,
          content,
          authorId: authId,
          authorName: req.user.displayName
        }});
      });
    } else{
      return res.status(401).json({
        error: "PERMISSION DENY",
        code: 8
      });
    }

  });



});


router.delete('/:id', (req, res) => {
  var articleId = req.params.id;
  console.log(articleId)

  if(typeof req.user === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 3
      });
  }

  var sql = "SELECT * FROM `etc_table` WHERE `id`=?";
  conn.query(sql, [articleId],function (err, rows, fields) {
    if (err){
      return res.status(409).json({
          error: "DB ERROR",
          code: 99
      });
    }
    if(rows.length===0){
      return res.status(409).json({
        error: " NO ARTICLE",
        code: 7
      });
    }

    if(rows[0].authorId.localeCompare(req.user.authId) === 0){

      var sql = 'DELETE FROM etc_table WHERE id=?';

      conn.query(sql, [articleId],function (err, rows, fields) {
        if (err){
          return res.status(409).json({
              error: "DB ERROR",
              code: 99
          });
        }
        console.log("Number of records deleted: " + rows.affectedRows);
        return res.json({ success: true });


      });
    } else{
      return res.status(401).json({
        error: "PERMISSION DENY",
        code: 8
      });
    }

  });
});



export default router;
