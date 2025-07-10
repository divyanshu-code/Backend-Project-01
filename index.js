const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine' , 'ejs');


app.use(express.static(path.join(__dirname , 'public')));           // static path 


app.get('/', function (req, res) {

  fs.readdir(`./File`, function(err , files){
    
    res.render('hlo.ejs' , {files : files});
  })
})

app.get('/hook/:filename', function (req, res) {

        fs.readFile(`./File/${req.params.filename}` , 'utf8' , function(err , data){
                res.render('hook.ejs' , { filename : req.params.filename , data : data});
        })
 
})
app.get('/edit/:filename', function (req, res) {

          res.render('edit.ejs' , { filename : req.params.filename });
     
 
})

app.post('/create', function (req, res) {

         fs.writeFile(`./File/${req.body.title.split(' ').join('')}.txt` , req.body.detail , function(err){
                     res.redirect('/')
         })
  })

app.post('/edit1', function (req, res) {

        fs.rename(`./File/${req.body.yes}`, `./File/${req.body.no}` , function(err){
                if(err) throw err;
                res.redirect('/');
        })
  })


app.listen(3000)