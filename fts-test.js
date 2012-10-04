/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var sqlite = require('sqlite3')
    , fs = require('fs.extra')
    , os = require('os')
    , sequence = require('sequence').create()
    , db
    , tableStr = fs.readFileSync('./meta-fts.table.sql', 'utf8')
       //   'CREATE VIRTUAL TABLE data USING fts4(updated_at, name, path);'
       // + 'CREATE VIRTUAL TABLE fts USING fts4(content="data", path TEXT, name TEXT);'
    ;

  /*
   uuid CHAR NOT NULL  ,
   created_at INTEGER NOT NULL  ,
   updated_at INTEGER NOT NULL  ,
   md5 CHAR NOT NULL  ,
   sha1 CHAR   ,
   imported_at INTEGER NOT NULL  ,
   path TEXT   ,
   name VARCHAR NOT NULL  ,
   mtime INTEGER NOT NULL  ,
   ctime INTEGER   ,
   atime INTEGER   ,
   size INTEGER NOT NULL  ,
  */
 
  function readyForQuery() {
    db.exec(tableStr, function (err) {
      if (err) { console.error(err); }
      db.exec(
          "INSERT INTO data(updated_at, name, path) VALUES(123, 'bar', 'baz corge grault qux quux');"
        + "INSERT INTO data(updated_at, name, path) VALUES(234, 'baz', 'bar corge grault qux quux');"
        + "INSERT INTO data(updated_at, name, path) VALUES(456, 'bar', 'corge grault qux quux');"
        , function (err) {

        if (err) {
          console.error(__filename + '\n' + err);
        }

        db.each("SELECT name, path FROM data WHERE name = 'baz';", function (err, record) {
          console.log('matching bazes');
          if (err) { console.error(err); }
          console.log(record);
        });

        db.each("SELECT name, path FROM fts WHERE fts MATCH '*rault';", function (err, record) {
          console.log('matching *rault');
          if (err) { console.error(err); }
          console.log(record);
        });

        db.each("SELECT name, path FROM fts WHERE fts MATCH 'graul*';", function (err, record) {
          console.log('matching graul*');
          if (err) { console.error(err); }
          console.log(record);
        });
      });
    });
  }

  db = new sqlite.Database(":memory:", function (err) {
    if (err) {
      console.error(err);
      return;
    }

    db.loadExtension('./fts4-rank.' + os.platform() + '.sqlext');
    readyForQuery();
  });
}());
