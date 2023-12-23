const express = require('express')
require('dotenv').config();
const app = express()
const users = require('./usersallsystem');
const {usersupdate, findusersdata} = require('./mongodbfunc')
const {decrypt} = require('./crypto')
const {setData} = require('./public/forgetfrontend');

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
setData("g")
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.use(express.static('public'));

app.get('/emailverify', async (req, res)=>{
    const {verify} = req.query;
    const string = decrypt(verify);
    var verification;
    console.log(string);
    const jsonString = JSON.parse(string);
    console.log(jsonString);
    const update = {
        verify: true,
        lastupdate: Date.now()
    }
    if (jsonString.userId != undefined) {
        const userData = await findusersdata("users",jsonString.userId);
        if (userData == null) {
            res.send('Invalid user ID')
        }
        verification = JSON.parse(userData)
        console.log(verification);

        
    }
    if ((verification == undefined)|| (verification == null)) {
        res.send("Invalid verification url");
    }else if (verification.verify) {
        res.send(" You have already verify your account")
    }else{
        const logData = await usersupdate('users', update, jsonString.userId)
        console.log(logData);
        res.send("Account verification complete")
    }
    
    
})

app.use('/api/v1', users);

//const client = new MongoClient(dbData.dburl);
// async function read(){
//     const dbmongo = await client.connect()
//     const database = dbmongo.db(dbData.dbname);
//     var datainsert = await database.collection('test').find().toArray();
//     datainsert.forEach(element => {
//         objectIdToFind = element._id.toString()
//         console.log(objectIdToFind);
//     });
//     var data = await database.collection('test').find({_id: new ObjectId(objectIdToFind)}).toArray()
//     console.log(data);
    
//     //console.log(datainsert);

// }
//read();
