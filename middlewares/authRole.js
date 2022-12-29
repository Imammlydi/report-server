const jwt = require('jsonwebtoken');
const UserLogin = require('../models/usersMysql');


exports.authRoleAdmin =async ( req, res, next) =>{

    const SCRET_KEY = "reportscret"
    const token = req.header('auth_token');
    const verified= jwt.verify(token, SCRET_KEY);
    const user_id = verified.role[0]
    // const user = await UserLogin.findOne({ where: { email: req.body.email },include:['roles'] });
    
    if(!token) return res.status(400).json({
        status:res.statusCode,
        message:"Access Denied !!!! "
    })
    if(user_id !== "6277d1c6a0dbcd93214378a0" || null ) return res.status(400).json({
        status:res.statusCode,
        message:"Anda bukan Admin!!!! "
    })

    try{
        console.log('isinya ',user_id);
        
        req.user = verified
        // res.json(decode)
        next();

    }catch(err){
        res.status(400).json({
            status:res.statusCode,
            message:"Inavalid Token !!!! "
        })
    }
}
exports.authRoleTunnel = ( req, res, next) =>{

    const SCRET_KEY = "reportscret"
    const token = req.header('auth_token');
    const verified= jwt.verify(token, SCRET_KEY);
    const role = verified.role
    
    if(!token) return res.status(400).json({
        status:res.statusCode,
        message:"Access Denied !!!! "
    })
    if(role !== "tunnel" || null ) return res.status(400).json({
        status:res.statusCode,
        message:"Anda tidak bertugas di tunnel Tunnel !!!! "
    })

    try{
        console.log('isinya ',role);
        
        req.user = verified
        // res.json(decode)
        next();

    }catch(err){
        res.status(400).json({
            status:res.statusCode,
            message:"Inavalid Token !!!! "
        })
        console.log('this is',err)
    }
}


exports.authRoleUser = ( req, res, next) =>{

    const SCRET_KEY = "dfjkghriueghutrjhjtn"
    const token = req.header('auth_token');
    const verified= jwt.verify(token, SCRET_KEY);
    const user_id = verified.role[0]
    
    if(!token) return res.status(400).json({
        status:res.statusCode,
        message:"Access Denied !!!! "
    })
    if(user_id !== "6277d1f9a0dbcd93214378a2" || null ) return res.status(400).json({
        status:res.statusCode,
        message:"Anda bukan User!!!! "
    })

    try{
        console.log('isinya ',user_id);
        
        req.user = verified
        // res.json(decode)
        next();

    }catch(err){
        res.status(400).json({
            status:res.statusCode,
            message:"Inavalid Token !!!! "
        })
    }
}

