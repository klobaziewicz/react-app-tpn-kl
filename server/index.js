const express = require("express")
const app = express()
const pool = require("./db")
const merchant_model = require('./merchant_model')
const cors = require("cors");
const client = require('./db')
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

//---------- tworzenie wszystkich baz danych
const query = `
CREATE SEQUENCE IF NOT EXISTS zgloszenia_id_seq;

CREATE TABLE IF NOT EXISTS public.zgloszenia
(
    id integer NOT NULL DEFAULT nextval('zgloszenia_id_seq'::regclass),
    login character varying(255) COLLATE pg_catalog."default",
    droga text COLLATE pg_catalog."default",
    data date,
    liczba_osob integer,
    CONSTRAINT zgloszenia_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE IF NOT EXISTS warunki_id_seq;

CREATE TABLE IF NOT EXISTS public.warunki
(
    id integer NOT NULL DEFAULT nextval('warunki_id_seq'::regclass),
    data character varying COLLATE pg_catalog."default",
    info character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT warunki_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE IF NOT EXISTS login_id_seq;

CREATE TABLE IF NOT EXISTS public.login
(
    id integer NOT NULL DEFAULT NEXTVAL('login_id_seq'),
    login character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    mail character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT login_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE IF NOT EXISTS drogi_id_seq;

CREATE TABLE IF NOT EXISTS public.drogi
(
    id integer NOT NULL DEFAULT nextval('drogi_id_seq'::regclass),
    droga character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT drogi_pkey PRIMARY KEY (id)
);
`;
//DELETE FROM drogi WHERE Id>8;
//INSERT INTO drogi (droga) VALUES ('Mięguszowiecki Szczyt Wielki'),('Cubryna'),('Mięguszowiecki Szczyt Czarny'),('Niżne Rysy'),('Mnich'),('Zamarła Turnia'),('Zadni Kościelec');

client.query(query, (err, res) => {
    client.connect();
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    //client.end();
});

//
app.get("/create_all_databases", async (req, res) => {
    try {
        const name = req.query

        let int_name = name.id.toString()
        const wpisy = await pool.query(
            ""
        )
        res.json(wpisy.rows)
        res.send(wpisy.rows)

    } catch (error) {
        console.log(error.message)
    }
})


//
app.get("/wpisy", async (req, res) => {
    try {
        const name = req.query

        let int_name = name.id.toString()
        //console.log(int_name)

        const wpisy = await pool.query(
            "SELECT * FROM warunki WHERE Cast(id as varchar(11)) LIKE $1",
            [`%${int_name}%`]
        )
        res.json(wpisy.rows)
        res.send(wpisy.rows)

    } catch (error) {
        console.log(error.message)
    }
})

// SELECT
app.get("/select", async (req, res) => {
    try {
        //const name2 = req.query

        //let int_name2=name2.id.toString()
        //console.log(int_name)

        const wpisy2 = await pool.query(
            "SELECT * FROM warunki"
        )
        console.log(wpisy2.rows)
        res.json(wpisy2.rows)

    } catch (error) {
        console.log(error.message)
    }
})

// ADD
app.get("/add", async (req, res) => {
    try {
        let now = new Date();
        let date = now.toLocaleString()
        //
        const info = req.query
        console.log(info)
        const newInfo = await pool.query(
            "INSERT INTO warunki (info,data) VALUES ($1,$2);",
            [info.info, date]
        )
        res.json(newInfo.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})
//

// REGISTER
app.get("/register", async (req, res) => {
    try {
        const info = req.query
        console.log(info)

        const newInfo = await pool.query(
            "INSERT INTO login (login,password,mail) VALUES ($1,$2,$3);",
            [info.login, info.password, info.mail]
        )
        res.json(newInfo.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})
//

// SELECT LOGIN
app.get("/select_login", async (req, res) => {
    try {
        const wpisy2 = await pool.query(
            "SELECT * FROM login"
        )
        console.log(wpisy2.rows)
        res.json(wpisy2.rows)

    } catch (error) {
        console.log(error.message)
    }
})

//
// SELECT drogi
app.get("/select_drogi", async (req, res) => {
    try {
        const drogi = await pool.query(
            "SELECT * FROM drogi"
        )
        //console.log(drogi.rows)
        res.json(drogi.rows)

    } catch (error) {
        console.log(error.message)
    }
})
//
// INSERT zgloszenia
app.get("/insert_zgloszenia", async (req, res) => {
    try {
        const info = req.query
        console.log(info)

        const newInfo = await pool.query(
            "INSERT INTO zgloszenia (login,droga,data,liczba_osob) VALUES ($1,$2,$3,$4);",
            [info.login, info.droga, info.data, info.liczba_osob]
        )
        res.json(drogi.rows)

    } catch (error) {
        console.log(error.message)
    }
})
// SELECT zgloszenia
app.get("/select_zgloszenia", async (req, res) => {
    try {
        const drogi = await pool.query(
            "SELECT * FROM zgloszenia"
        )
        res.json(drogi.rows)

    } catch (error) {
        console.log(error.message)
    }
})
//

app.use(express.json()) //req.body
app.use(cors());
//

app.get("/", (req, res) => {
    res.send('drogi.rows')
})

app.listen(process.env.PORT||5000, () => {
    console.log("server jest na porcie 5000")
})

//---------baza zgloszenia-----------
/*
CREATE SEQUENCE IF NOT EXISTS zgloszenia_id_seq;

CREATE TABLE IF NOT EXISTS public.zgloszenia
(
    id integer NOT NULL DEFAULT nextval('zgloszenia_id_seq'::regclass),
    login character varying(255) COLLATE pg_catalog."default",
    droga text COLLATE pg_catalog."default",
    data date,
    liczba_osob integer,
    CONSTRAINT zgloszenia_pkey PRIMARY KEY (id)
)
*/

//----------baza warunki---------------
/*
CREATE SEQUENCE IF NOT EXISTS warunki_id_seq;

CREATE TABLE IF NOT EXISTS public.warunki
(
    id integer NOT NULL DEFAULT nextval('warunki_id_seq'::regclass),
    data character varying COLLATE pg_catalog."default",
    info character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT warunki_pkey PRIMARY KEY (id)
)
*/
//----------baza login---------------
/*
CREATE SEQUENCE IF NOT EXISTS login_id_seq;

CREATE TABLE IF NOT EXISTS public.login
(
    id integer NOT NULL DEFAULT NEXTVAL('login_id_seq'),
    login character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    mail character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT login_pkey PRIMARY KEY (id)
)
*/
    //----------baza drogi---------------
/*
CREATE SEQUENCE IF NOT EXISTS drogi_id_seq;

CREATE TABLE IF NOT EXISTS public.drogi
(
    id integer NOT NULL DEFAULT nextval('drogi_id_seq'::regclass),
    droga character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT drogi_pkey PRIMARY KEY (id)
);
INSERT INTO drogi (droga) VALUES ('Mięguszowiecki Szczyt Wielki'),('Cubryna'),('Mięguszowiecki Szczyt Czarny'),('Niżne Rysy'),('Mnich'),('Zamarła Turnia'),('Zadni Kościelec');
*/