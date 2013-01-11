NodeJS Full-Text Search Demo
===

This is mostly a sqlite3 fts demo, but with a little NodeJS sprinkled in for added pleasure.


SQLite3-FTS v3.7.14
===

Check to see if you already have SQLite at the correct version:

    sqlite3 --version
    which sqlite3

Now disregard that and install it the old fashioned way anyway (we need the headers and such)

    curl http://www.sqlite.org/sqlite-autoconf-3071400.tar.gz -o sqlite-autoconf-3071400.tar.gz
    tar xvf sqlite-autoconf-*.tar.gz -C ./
    cd sqlite-autoconf-*/
    ./configure
    make
    sudo make install
    # to clean up old sqlite references in PATH
    exit

Open a **new shell** and ensure you've got the right sqlite3 in your path

    sqlite3 --version
    which sqlite3

Now actually read the version. You probably didn't exit your shell and open a new one like
I told you to and so you're probably going to have weird parse error problems from an
incompatible version of sqlite3.

SQLite3 Half Module
---

Test that it doesn't work

    sqlite3
    SELECT 42;
    > 42
    SELECT HALF(42);
    > Error: no such function: HALF
    .exit

Build a simple half module

    git clone git://github.com/coolaj86/node-sqlite-fts-demo.git
    cd node-sqlite-fts-demo
    cd loadable-extension-example
    cat half.c
    cat Makefile
    make

Test that it worketh

    sqlite3
    .load half.sqlext
    SELECT HALF(42);
    > 6.0
    .exit

NodeJS-FTS
===

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

Appendix
===

Mac OS X
---

You need to install the XCode Commandline Tools and Homebrew

If you have problems because you've already installed sqlite3 with homebrew, give this a shot and `make install` again:

    rm -rf /usr/local/*/*sqlite3*
    rm -rf /usr/local/*/*/*sqlite3*
    rm -rf /usr/local/*/*/*/*sqlite3*

Ubuntu Linux
---

    sudo apt-get install build-essential git

Windows
---

Don't bring a spoon to a gunfight!
