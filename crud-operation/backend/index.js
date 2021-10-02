const express = require( "express");
const app =express();
const mysql =require("mysql");
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'employeesystem',
});

app.post('/create',(req,res) => {
   const SellerName =req.body.SellerName;
   const SellerPhone =req.body.SellerPhone;
   const SellerAddress =req.body.SellerAddress;
   const Product =req.body.Product;
   const Description =req.body.Description;

   db.query("INSERT INTO sellers (sellername, sellerphone, selleraddress, product, description) VALUES(?,?,?,?,?)",
   [SellerName,SellerPhone,SellerAddress,Product,Description],
   (err,result) =>{
         if (err){
             console.log(err);
         }
         else{
             res.send(result);
         }
   }
   );
});

app.get("/sellers", (req, res) => {
    db.query("SELECT * FROM sellers", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update", (req, res) => {
    const id = req.body.id;
    db.query(
      "UPDATE SET sellers = ? WHERE id = ?",
      [ id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM sellers WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () =>{
    console.log("your server is runnig successfully");
})