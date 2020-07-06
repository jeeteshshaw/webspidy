const route = require('express').Router();
const con = require('../Mysql');
const format = require('date-format');


// to feedback database client-footer
route.post('/', async (req, res, next) => {
    let Today = format.asString('yyyy-MM-dd', new Date());
    let sql = `INSERT INTO feedback(NAME, CONTACT, TEXT, DOS ) VALUES('${req.body.name}', '${req.body.contact}', '${req.body.text}', '${Today}')`;
    try {
        await con.query(sql, (err, result) => {
            if (err) return res.status(400).send({error: err, msg: "Failed to Upload Please try again or Try few hours Later"})
            console.log(result);
            res.status(200).send({ msg: "Inserted Successfully" });
        })
    } catch (error) {
        return res.status(400).send({error: err, msg: "Failed to Upload Please try again or Try few hours Later"})
    }
    
});


module.exports = route;