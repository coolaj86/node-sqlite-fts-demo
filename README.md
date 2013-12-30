NodeJS Full-Text Search Demo
===

This is mostly a sqlite3 fts demo, but with a little NodeJS sprinkled in for added pleasure.


SQLite3-FTS v3.8.2
===

Check to see if you already have SQLite at the correct version:

    sqlite3 --version
    which sqlite3

Remove old versions of sqlite3 if necessary (see appendix). This is especially important on Linux.

Now disregard that and install it the old fashioned way anyway (we need the headers and such)

    curl http://www.sqlite.org/2013/sqlite-autoconf-3080200.tar.gz -o sqlite-autoconf-3080200.tar.gz
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

If you get the `SQLite header and source version mismatch` error when trying to run SQLite, make sure that you've completely removed the previous version including its library and development files (read on below).

Mac OS X
---

You need to install the XCode Commandline Tools and Homebrew

If you have problems because you've already installed sqlite3 with homebrew, give this a shot and `make install` again:

    rm -rf /usr/local/*/*sqlite3*
    rm -rf /usr/local/*/*/*sqlite3*
    rm -rf /usr/local/*/*/*/*sqlite3*

Ubuntu Linux
---

Bring the system up-to-date

    sudo apt-get update
    sudo apt-get upgrade --yes
    
You should probably also perform

    sudo apt-get dist-upgrade --yes
    
Remove any old versions of the sqlite3 commandline tool

    sudo apt-get remove --purge --yes sqlite3
    
Install the necessary build tools

    sudo apt-get install build-essential git curl wget
    
Manually remove `libsqlite3-0` and  `libsqlite3-dev`. You **must manually remove** these packages, otherwise they will be reinstalled anytime that another package relies on them. You may occasionally have to manually remove them again after a `upgrade` or `dist-upgrade`

    rm -rf /usr/lib/*sqlite3*
    rm -rf /usr/lib/*/*sqlite3*
    rm -rf /usr/include/*sqlite3*
    rm -rf /usr/include/*/*sqlite3*

Windows
---

Don't bring a spoon to a gunfight!
