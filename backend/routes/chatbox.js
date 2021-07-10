const router = require("express").Router();
const formidable = require('express').Router();
const fs = require('fs')
const path = require('path' )

const auth = require("../middlewares/auth");

router.post("/upload", auth, (req, res) => {
    const data = new formidable.IncomingForm();

    data.parse(req, (err, fields, files) => {
        const oldpath = files.filetoupload.path;
        const newpath = path.join(__dirname, '..', files.filetoupload.name);

        fs.renameSync(oldpath, newpath);
        res.send('File uploaded and moved!');
    })
});

module.exports = router;