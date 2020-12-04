
const http=require("http");

console.log("Running on http:localhost:3000")

http.createServer(function(req,res){
    res.write("<h1> Hello World. </h1>");
    res.end();
}).listen(3000);