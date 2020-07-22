const express = require('express')
const Sentiment = require('sentiment');
const { text } = require('express');

const app = express()
const sentiment = new Sentiment();
const PORT = 3000

app.use(express.static(__dirname + '/public'));
//construct a basic
/*app.get('/',function(req, res){
    res.send('hello world')
    console.log('hp')
})*/
app.get('/test',function(req, res){
    res.send('test page')
    console.log('test 1111')
})

//this funciton takes two numbers, adds them together and returnes the ressult 
//works dont touch it 
let addition=function(num1, num2){
    result = num1 + num2;
    return result 
}
let sentimentAnalysis=function(text){ 
     result = sentiment.analyze(text);
     return result;

}
app.get('/adder',function(req, res){
    let num1 = parseInt(req.query.num1,10);
    let num2 = parseInt(req.query.num2,10);
    console.log(num1);
    console.log(num2);
    let sum = addition(num1, num2);
    res.send('The sum is '+sum);
})

app.get('/sentiment',function(req, res){
    let text = req.query.text;
    let analysis = sentimentAnalysis(text)
    console.log(analysis)
    res.json(analysis)
})

//start the server and listen on port 3000
app.listen(PORT)