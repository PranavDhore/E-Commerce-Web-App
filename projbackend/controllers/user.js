const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No User was found in DB"
            })
        }

        req.profile = user;
        next();

    })
}

exports.getUser = (req,res) =>{
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req,res) =>{

    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update."
                })
            }

            user.salt = undefined;
            user.encry_password = undefined;

            res.json(user)
        }
    )

}

exports.userPurchaseList = (req,res) =>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err)
            return res.status(400).json({
                error:"No Order in this account."
            })
        
        return res.json(order)
    })

}

exports.pushOrderInPurchaseList = (req,res,next) =>{

    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push(
            {
                _id:product._id,
                name:product.name,
                description:product.description,
                category:product.category,
                quantity:product.quantity,
                amount:req.body.order.amount,
                trasaction_id:req.body.order.trasaction_id
            }
        );
    });

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push: {purchases:purchases}},
        {new:true},
        (err, purchase)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to Save Purchase List"
                })
            }
            next();
        }
    )

    

}

// exports.getAllUsers = (req,res) =>{

//     User.find().exec((err,user) =>{

//         if(err || !user)
//             return res.status(400).json({
//                 error:"No Users Found"
//             })
        
//         return res.json(user)

//     })

// }