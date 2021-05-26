/*jshint esversion: 6 */
var express = require('express'); //import modulul express
var path = require('path'); //import modulul path
var server = express(); //aici am creat serverul
var fs = require('fs');
const formidable = require('formidable');

server.use(express.static("resurse"));

server.set('view engine', 'ejs'); //setez drept compilator de template-uri ejs (setez limbajul in care vor fi scrise template-urile)

//aici astept cereri de forma localhost:8081 (fara nimic dupa)
server.get('/', function (req, res) {
    var number_array = "";
    res.render('pagini/index'); //afisez pagina de intrare
});


function clone(a) 
{
    return JSON.parse(JSON.stringify(a));
}
function BBS(p,q,s,mb)
{
	var b;
	b = mb*1048576;
	

	var filePath;
	var isMode;
	var fileObject;

	var M = p * q;

	var x = undefined;
	var sol;

	/** Get the gcd of two numbers, A and B. */
	function gcd(a, b) {
		while(a != b) {
			if(a > b) {
				a = a - b;
			} else {
				b = b - a;
			}
		}
		return a;
	}

	/** Seed the random number generator. */
	function seed() {
		if(s == 0) {
			throw new Error("The seed x[0] cannot be 0");
		} else if(s == 1) {
			throw new Error("The seed x[0] cannot be 1");
		} else if(gcd(s, M) != 1) {
			throw new Error("The seed x[0] must be co-prime to " + M.toString());
		} else {
			x = s;
			return s;
		}
	}

	/** Get next item from the random number generator. */
	function next() {
		var cachedx = x;
		cachedx = cachedx * x;
		cachedx = cachedx % M;
		x = cachedx;
		return x%2;
	}

	seed(s);
	var arr=[];
	var number_arr=[];
	

	for(let i=0; i<b;i++){
		sol = next()
		arr.push(sol);
		//document.getElementById("rezultat").innerHTML=sol; 
		//return arr;
	}
	number_arr = clone(arr);
	console.log(number_arr);
    return number_arr;
	
}


server.post("/getinput",function(req, res){
    var formular= formidable.IncomingForm();
    formular.parse(req, function(err, campuriText){
        console.log(campuriText.p);
        console.log(campuriText.q);
        console.log(campuriText.s);
        console.log(campuriText.mb);
        var number_array = BBS(campuriText.p,campuriText.q,campuriText.s,campuriText.mb);
		var arr = Buffer.from(number_array);;

		
		fs.writeFile('binary.txt', arr, 'binary', function (err) {
			if (err) throw err;
			console.log('Saved!');
		  });
        res.render('pagini/index');
    })
});

//var arr = [0,1,1,1,0,0];
//var buffer = Buffer.from(arr);
//console.log(Buffer.byteLength(buffer));

// var buffer1 = new ArrayBuffer(5);
// //buffer1 = [0,1,1,1,1];
// console.log(buffer1.byteLength);



// fs.writeFile('binary.txt', buffer, 'binary', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });


server.get('/*', function (req, res) {
    res.render('pagini' + req.url);
    //console.log(req.url); //afisez in consola url-ul pt verificare
});


server.listen(8081);
console.log("A pornit serverul pe portul 8081");