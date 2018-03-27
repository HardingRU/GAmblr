const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: process.env.PG_DATABASE || 'gamblr',
    port: process.env.PG_PORT || 5432,
    host: process.env.PG_HOST || 'localhost',
    username: 'lillian',
    password: '123'
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp(process.env.DATABASE_URL);
}

module.exports = db;
