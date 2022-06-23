
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');


const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

let dbparams = {
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'wptexam',
	port:3306
}


const conn = mysql.createConnection(dbparams);

app.get("/getdetails", (req, res) => {
	console.log("inside get details");
	let bookid = req.query.bookid;
	console.log(bookid);


	console.log("connection successfull");


	let output = { status: false, bookdetails: { bookid: 0, bookname: "", price:0 } }
	conn.query('select * from book where bookid = ?', [bookid],
		(err, rows) => {
			if (err) {
				console.log("Some error" + error);
			}
			else {
				if (rows.length > 0) {
					output.status = true;
					output.bookdetails = rows[0];
				}
				else {
					console.log("bookid not found")
				}
			}
			resp.send(output);
		});
});




app.get("/updatebook",(req,res)=>{
	console.log("Inside updatebook function");
	
	let bookdetails = {bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price}
	let output = {status:false}

	conn.query('update book set bookid = ?,bookname = ?,price=? ',[bookdetails.bookid,bookdetails.bookname,bookdetails.price],
	(err,res)=>{
		if(err){
			console.log("error")
		}
		else{
			if(res.affectedRows > 0){
				console.log("update successfullly");
				output.status=true;
			}
			else{
				console.log("insert failed");
			}


		}
		resp.send(output);
	});

});







// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});