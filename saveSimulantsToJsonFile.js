const fetch = require('node-fetch');
const fs = require('fs');


const ENV = {
    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzgyMCIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiYjQyYjc4Y2YtMjc0YS00NDJhLWJiNDYtYWExYmZhYzNkMWRiIn0.U8kNKnCWhZvwGqmQM8I_8d9_CMYW-EmGT5L7dhJHXoQ',
    botsApiUrl: 'https://dev.botsfinancial.com/api'
  }


async function doSomething  (){
    let customers = await fetch(`${ENV.botsApiUrl}/simulants`,{ 
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json' ,
            'Accept': 'application/json',
            'Authorization': ENV.authorization
        }
    })
    let body = await customers.json()
    console.log(body.result)//body.response)
    fs.writeFile("simulants.json", JSON.stringify(body.result), function(err) {
        if(err) {
            return console.log(err);
        }
    })
        
    
    //     console.log("The file was saved!");
    // }); 
}

doSomething()