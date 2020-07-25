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
app.get('/test', function (req, res) {
    res.send('test page')
    console.log('test 1111')
})

//this funciton takes two numbers, adds them together and returnes the ressult 
//works dont touch it 
let addition = function (num1, num2) {
    result = num1 + num2;
    return result
}
let sentimentAnalysis = function (text) {
    result = sentiment.analyze(text);
    return result;

}
//The function to search data in array from id
let getDataFromId = function (Id) {
    let int = 0;
    for (let element of accounts) {
        if (Id == element.id) {
            result = 'This user id is ' + Id + '\nThe user name is ' +
                accounts[int].name + '\nThe user deposit is ' + accounts[int].deposit;
            break;
        }
        else {
            int++;
        }
    };
    return result;
}
//The function to search data in array from name
let getDataFromName = function (Name) {
    let int = 0;
    for (let element of accounts) {
        if (Name == element.name) {
            result = 'This user id is ' + accounts[int].id + '\nThe user name is ' +
                Name + '\nThe user deposit is ' + accounts[int].deposit;
            break;
        }
        else {
            int++;
        }
    };
    return result;
}
//the array i used
let accounts = [
    { id: 1, name: 'alex', deposit: 5 },
    { id: 2, name: 'sarah', deposit: 5 },
    { id: 3, name: 'jim', deposit: 15 }
]

app.get('/adder', function (req, res) {
    let num1 = parseInt(req.query.num1, 10);
    let num2 = parseInt(req.query.num2, 10);
    console.log(num1);
    console.log(num2);
    let sum = addition(num1, num2);
    res.send('The sum is ' + sum);
})

app.get('/sentiment', function (req, res) {
    let text = req.query.text;
    let analysis = sentimentAnalysis(text)
    console.log(analysis)
    res.json(analysis)
})

app.get('/dep', function (req, res) {
    //get the user input
    let id = parseInt(req.query.accountid);
    let name = req.query.accountname;
    //check the input in console
    console.log('The input id is ', id);
    console.log('The input name is ', name);
    //If the user input the name
    if (isNaN(id) && name) {
        //call function
        let result = getDataFromName(name);
        //check the result in console
        console.log(result);
        //output to the brower
        res.send(result);

    }
    //if user input the id
    else if (!name && id) {
        //call function
        let result = getDataFromId(id);
        //check the result in console
        console.log(result);
        //output to the brower 
        res.send(result);
    }
    else {
        //if user dose not input anything or input both id and name
        res.send('You did not input anything or you input both of id and name,please just input one');
    }

})

//start the server and listen on port 3000
app.listen(PORT)