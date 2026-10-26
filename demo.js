const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require('express');
const path=require("path");
const methodOverride=require('method-override');
const app= express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"/views"));

let q = "INSERT INTO user (id,username,email,password) VALUES ?";
let users=[["125","user125","u125@gmail.com","abc"],["125b","user125b","u125b@gmail.com","abcb"],["125c","user125c","u125c@gmail.com","abcc"]];

//home page
app.get("/",(req,res)=>{
  let q = 'SELECT count(*) FROM user';
  connection.query(q, (err, results) => {
    try {
      if (err) throw err;
      let count =results[0]["count(*)"];
      res.render("home.ejs",{count});
    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

//user details
app.get("/user",(req,res)=>{
  let q='SELECT * FROM user';
  connection.query(q, (err, results) => {
    try {
      if (err) throw err;
      res.render("showusers.ejs",{results});
    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

//NEW USER FORM (keep above /user/:id routes)
app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
})

//ADD NEW USER
app.post("/user",(req,res)=>{
  let {username,email,password}=req.body;
  let id=faker.string.uuid();
  let q=`INSERT INTO user (id,username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
  connection.query(q,(err,result)=>{
    try {
      if (err) throw err;
      res.redirect("/user");
    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

//EDIT ROUTE
app.get("/user/:id/edit",(req,res)=>{
  let{id}=req.params;
  
  let q=`SELECT *FROM user WHERE id='${id}'`;
  connection.query(q, (err, results) => {
   try {
      if (err) throw err;
      let user=results[0];

      res.render('edit.ejs',{user});

    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
  
})

//UPDATE  ROUTE
app.patch("/user/:id",(req,res)=>{
 let{id}=req.params;
 let{password:formpass,username:newUsername}=req.body;
  
  let q=`SELECT *FROM user WHERE id='${id}'`;

  connection.query(q, (err, results) => {
   try {
      if (err) throw err;
      let user=results[0];
      if(formpass!=user.password){
        res.send("Wrong Paaword!");
      }
      else{
        let q2=`UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err){
            console.log(err);
            return res.send("Oops some errors!");
          }
         res.redirect("/user");
        });
      }
    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

//DELETE FORM
app.get("/user/:id/delete",(req,res)=>{
  let{id}=req.params;

  let q=`SELECT *FROM user WHERE id='${id}'`;
  connection.query(q, (err, results) => {
   try {
      if (err) throw err;
      let user=results[0];

      res.render('delete.ejs',{user});

    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

//DELETE ROUTE
app.delete("/user/:id",(req,res)=>{
  let{id}=req.params;
  let{email:formEmail,password:formpass}=req.body;

  let q=`SELECT *FROM user WHERE id='${id}'`;
  connection.query(q, (err, results) => {
   try {
      if (err) throw err;
      let user=results[0];
      if(formEmail!=user.email || formpass!=user.password){
        res.send("Wrong email or password!");
      }
      else{
        let q2=`DELETE FROM user WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err){
            console.log(err);
            return res.send("Oops some errors!");
          }
          res.redirect("/user");
        });
      }
    } catch (err) {
      console.log(err);
      res.send("Oops some errors!");
    }
  });
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '392033'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let data  = [];
for(let i =1;i<=100;i++){
  data.push(getRandomUser());
}

const port = 8080;
app.listen(port,()=>{
  console.log(`Server listing to ${port} `);
})

// try {
//   connection.query(q,[data], (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     console.log(results.length);
//     console.log(results[1]);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();