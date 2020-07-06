const route = require('express').Router();
const con = require('../Mysql');
const format = require('date-format');
const multer = require('multer');



// Config file and store in upload/projects
const storage = {
    storage : multer.diskStorage({
        destination: (req, file, cd)=>{
            cd(null, './upload/Projects')
        },
        filename: (req, file, cd) =>{
            
            const exe = file.mimetype.split('/')[1];
            cd(null, file.fieldname+Date.now()+"."+exe)
        }
    })
}

// project upload 
route.post('/', multer(storage).single('file'), async (req, res, next) => {
    const file  = req.file;
    if(!file){
    const filename = "";
    }else
    const filename = file.filename;
    
    let Today = format.asString('yyyy-MM-dd', new Date());
    let sql = `INSERT INTO project_list (NAME, CONTACT, BUDGET, TYPE, CATEGORY, MESSAGE, PROJECT_FILE, DOS ) VALUES('${req.body.name}', '${req.body.contact}', '${req.body.budget}', '${req.body.type}', '${req.body.category}', '${req.body.message}', '${filename}', '${Today}')`;
    try {
        await con.query(sql, (err, result) => {
            if (err) return res.status(400).send({error: err, msg: "Failed to Upload Please try again or Try few hours Later"})
            console.log(result);
        })
        res.status(200).send({msg: "Inserted Successfully"});
    } catch (error) {
        return res.status(400).send({error: error, msg: "Failed to Upload Please try again or Try few hours Later"});
    }
    
    
    
});


// route.get('/', (req, res, next) => {
//     res.send("Thanks for sending");
// })

module.exports = route