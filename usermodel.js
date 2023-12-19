const express = require("express");

class userInfo{

    constructor(username, email, password, admin, disable, verify, createtime, lastupdate){
        this.username = username;
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.disable = disable;
        this. verify = verify;
        this.createtime = createtime;
        this.lastupdate = lastupdate;

    }

    userInfoSave(){

        return {
            username : this.username,
            email: this.email,
            password : this.password,
            admin : this.admin,
            disable: this.disable,
            verify: this.verify,
            createtime: this.createtime,
            lastupdat: this.lastupdate
        }
    }


}

module.exports = userInfo;