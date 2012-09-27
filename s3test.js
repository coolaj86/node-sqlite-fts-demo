/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var sqlite3 = require("sqlite3").verbose()
    , db = new sqlite3.Database(":memory:")
    ;

  db.loadExtension("fts4-rank.darwin.sqlext");

  db.serialize(function () {
          db.run("CREATE VIRTUAL TABLE documents USING fts4(title, content)");

          var stmt = db.prepare("INSERT INTO documents VALUES(?, ?)");
          stmt.run('hello world', 'This message is a hello world message.');
          stmt.run('urgent: serious', 'This mail is seen as a more serious mail');
          stmt.run('single request', 'default data message');
          stmt.finalize();

    db.each("SELECT title FROM documents WHERE documents MATCH 'message'", function (err, row) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(row);
    });

  });

  db.close();
}());
