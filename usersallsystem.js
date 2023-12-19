const router = require('express').Router();
const { userRegister, usercheck, emailvalidation, userlogin} = require('./mongodbfunc');
const userModel = require('./usermodel');
const {encrypt, decrypt} = require('./crypto');
const { emailsend } = require('./sendmailer')



router.post('/signup' , async (req , res, next)=>{

    var passwordkey;


    const { username, email, password } = req.query
    console.log(username)
    if ((username == undefined)||(username == null)) {
        res.json({
            error: true,
            code: 5003,
            message: "Invalid username"
        })
    }
    if ((email == undefined)||(email == null)) {
        res.json({
            error: true,
            code: 5004,
            message: "Invalid email"
        })
    }else if (!emailvalidation(email)) {
        res.json({
            error: true,
            code: 5005,
            message: "Invalid email type"
        })
    }
    if ((password == undefined)||(password == null)) {
        res.json({
            error: true,
            code: 5006,
            message: "Invalid password"
        })
    }else if (password.length <=5 ) {
        res.json({
            error: true,
            code: 5007,
            message: "Invalid password lenght"
        })
    }else{
        passwordkey = encrypt(password);
    }

    const userexist = await usercheck(email);
    console.log(userexist);
    if(!userexist.exist){

        const userdata = new userModel(username, email, passwordkey, false, false, false, Date.now(), Date.now());
        const usersregistnotify = await userRegister(userdata);
        const usersuccess = JSON.parse(usersregistnotify);
        if(usersuccess.acknowledged){
            const currentDate = new Date();
            const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000);
            const link = {
                email: email,
                time: oneHourLater,
                userId: usersuccess.insertedId
            }
            const linkdata = JSON.stringify(link)
            console.log(linkdata);
            const verifyemailData = encrypt(linkdata)
            var emaildata = `Hi \nThank You for register your account.\nYour verification link ${'http://localhost:3002/emailverify?verify='+verifyemailData}`
            await emailsend(email, emaildata);
            res.json({
                error: false,
                code: 2001,
                message: "User account creation successfull"
            })
        }else{
            res.json({
                error: true,
                code: 5009,
                message: "User account creation unsuccessfull"
            })
        }
        
    }else{
        res.json({
            error:true,
            message: "You have already an account",
            code: 5008
        })
    }
    // router code here
});

router.all('/login', async (req, res)=>{
    var user;
   let {email, password} = req.query;
   const checkemail = emailvalidation(email);
   if (!checkemail) {
    res.json({
        error: true,
        code: 5010,
        message: "Invalid email for login"
    })
    return;
   }
   if ((email && password)) {
    const encryptpassword = encrypt(password);
    user = await userlogin(email);
    //console.log(user);
    if (user != null) {
        const userPassword = user.password;
        if (userPassword === encryptpassword) {
            res.json({
                error: false,
                code: 2002,
                message: "Login successfully"
            })
        }else{

            res.json({
                error: true,
                code: 5012,
                message: " Incorrect password "
            })
        }
    } else {
        res.json({
        error: true,
        code: 5011,
        message: " There is no account using this email"
        })
    }
   } else {
    res.json({
        error: true,
        code: 5013,
        message: "Wrong format of password or email"
        })
   }
})


router.get('/' , (req , res)=>{
    // router code here
    res.send("welcome")
});

module.exports  = router
