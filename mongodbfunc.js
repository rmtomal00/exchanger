const { MongoClient, ObjectId } = require('mongodb');
const dbData = require('./configmongo')

const setupdburl = new MongoClient(dbData.dburl);

//user account creation in database
const userRegister = async function usersregister(data){

    var rData;
    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection('users');

        var user = await coll.insertOne(data, { safe: true })

        client.close();
        //console.log("test");
        return JSON.stringify(user);
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
}

//user email check in database
const usercheck = async function Usercheck(email) {

    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection('users');

        var user = await coll.findOne({email: email})
        console.log(user);
        if ((user == undefined) || (user == null)){
            return {
                exist: false
            }
        }else{
            return {
                exist: true
            }
        }
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
}
//user data update

let usersupdate = async function usersDataupdate(collection,data,userId) {

    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection(collection);

        var userupdater = await coll.findOneAndUpdate({_id: new ObjectId(userId)}, { $set: data })

        
        //console.log("test");
        client.close();
        return JSON.stringify(userupdater);
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
    
}

//find user data
let findusersdata = async function findusersreturndata(collection, userId) {
    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection(collection);

        var data = await coll.findOne({_id: new ObjectId(userId)})

        
        //console.log("test");
        client.close();
        return JSON.stringify(data);
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
}

//valid email check

let emailvalidation = function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function getUserDataEmail(email) {

    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection(collection);

        var data = await coll.findOne({email: email})

        
        //console.log("test");
        client.close();
        return JSON.stringify(data);
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
    
}

//userlogin 
let userlogin = async function usersign_in(email) {
        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection("users");

        const userdata = await coll.findOne({email: email});
        if(userdata != null || userdata != undefined){
            return userdata;
        }else {
            return null;
        }
    
}

// find and update user password
 async function updatePassword(mail, passwords) {
    try {

        const client = await setupdburl.connect();
        const database =  client.db(dbData.dbname)
        const coll = database.collection("users");
        console.log(coll.collectionName);

        var data = await coll.findOneAndUpdate({email: mail}, {$set: {password: passwords}})
        console.log(data);

        
        console.log("test");
        client.close();
        return JSON.stringify(data);
        
    } catch (error) {
        console.log("test error");
        return {
            message: `API error register function`,
            code: 5002,
            error: true
        }
    }
}
module.exports = {
    userRegister, 
    usercheck,
    emailvalidation,
    usersupdate,
    findusersdata,
    userlogin,
    getUserDataEmail,
    updatePassword,
}