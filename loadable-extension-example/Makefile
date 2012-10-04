all: linux
	#Linux

linux:
	gcc -shared -fPIC -Isqlite3 -o half.sqlext half.c
	#Using GCC on Mac OSX

darwin:
	gcc -bundle -fPIC -Isqlite3 -o half.sqlext half.c

win32:
	#Microsoft Tools on Windows
	cl /Gd half.c /I sqlite3 /DDLL /LD /link /export:sqlite3_extension_init /out:half.sqlext
