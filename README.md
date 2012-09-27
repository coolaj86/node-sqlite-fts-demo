

    npm install -g node-gyp
    npm install sqlite3

    curl http://www.sqlite.org/sqlite-autoconf-3071400.tar.gz -o sqlite-autoconf-3071400.tar.gz
    tar xvf sqlite-autoconf-*.tar.gz -C ./
    rsync -avhP sqlite-autoconf-*/ node_modules/sqlite3/deps/sqlite3/

    pushd node_modules/sqlite3/deps/sqlite3

    node-gyp clean
    node-gyp configure
    node-gyp build

    popd

    node fts-test.js
