DROP DATABASE single_sign_on;
CREATE DATABASE single_sign_on;
CREATE TABLE IF NOT EXISTS login(
   user CHAR(100) NOT NULL PRIMARY KEY,
   password CHAR(200),
   name CHAR(190),
   state CHAR(1) NOT NULL DEFAULT '1'
);

CREATE TABLE IF NOT EXISTS section(
   token CHAR(200) NOT NULL PRIMARY KEY,
   login_user CHAR(100) NOT NULL,
   app CHAR(1) NOT NULL DEFAULT '1',
   state CHAR(1) NOT NULL DEFAULT '1',
	FOREIGN KEY (login_user) REFERENCES login(user)
);