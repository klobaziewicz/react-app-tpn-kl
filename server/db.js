process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const Pool = require("pg").Pool
const { Client } = require('pg');

const pool = new Pool({
    user: 'zlsbwmmdzgdvaf',
    host: 'ec2-52-49-120-150.eu-west-1.compute.amazonaws.com',
    database: 'dflbq5p1a4jdk5',
    password: 'adadaff696cfdd7322302a519cc74aacbff71667d563646cc8f3ff25c6fa9f99',
    port: 5432,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      "ssl": {"require":true }
    },
    logging: false,
    tls: {
        rejectUnauthorized: false
      }
})

const client = new Client({
  user: 'zlsbwmmdzgdvaf',
  host: 'ec2-52-49-120-150.eu-west-1.compute.amazonaws.com',
  database: 'dflbq5p1a4jdk5',
  password: 'adadaff696cfdd7322302a519cc74aacbff71667d563646cc8f3ff25c6fa9f99',
  port: 5432,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": {"require":true }
  },
  logging: false,
  tls: {
      rejectUnauthorized: false
    }
});


module.exports = pool