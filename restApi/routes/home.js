const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    const home = {
        header : "Home Page",
        body: "This is the homepage of the website"
    }
    res.send(home);
});

module.exports = router; 
