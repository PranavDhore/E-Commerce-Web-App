const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) =>{

    Category.findById(id).exec((err,cate)=>{
        if(err) 
            return res.status(400).json({
                error:"Category Not Found In DB"
            })
        
        req.category = cate;
        next();
    })

    // next();
}

exports.createCategory = (req,res) =>{

    const category = new Category(req.body);

    category.save((err,category)=>{
        if(err)
            res.status(400).json({
                error:"Not able to save category in DB"
            })
        
        res.json(category);
    })

}

exports.getCategory = (req,res) =>{
    //
    return res.json(req.category)
}

exports.getAllCategory = (req,res) =>{
    //
    Category.find().exec((err,categories)=>{
        if(err)
            res.status(400).json({
                error:"No Categories Found"
            })
        
        res.json(categories);
    })
}

exports.updateCategory = (req,res) =>{
    // const category = req.category;
    // category.name = req.body.name;

    // category.save((err,updatedCategory)=>{
    //     if(err)
    //         return res.status(400).json({
    //             error:"Fail to update category"
    //         })
        
    //     res.json(updatedCategory);
    // })

    Category.findByIdAndUpdate(
        {_id:req.category._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err,category)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update."
                })
            }

            

            res.json(category)
        }
    )

}

exports.removeCategory = (req,res) =>{

    const category = req.category;
    
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Fail to Delet category"
            })
        }
            
        
        res.json({
            message:"Successfully Deleted"
        });
    });

}
