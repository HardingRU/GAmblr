\c gamblr

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS followers;



CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  pic TEXT,
  bg TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255),
  content TEXT,
  user_id INT
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  user_id INT,
  post_id INT
);

CREATE TABLE likes (
  user_id INT,
  post_id INT
);

CREATE TABLE followers (
  follower_id INT,
  following_id INT
);