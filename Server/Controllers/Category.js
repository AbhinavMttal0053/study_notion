const Category = require("../Models/Category");


// CREATE CATEGORY HANDLER FUNCTION
exports.createCategory = async(req,res) =>{
    try{
        // FETCH TAG FROM REQUEST BODY
        const{name,description} = req.body;

        // VALIDATION
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"INSUFFICIENT TAG DATA",
            });
        }

        // CREATING ENTRY IN DB
        const categoryDetails = await Category.create(
            {
                name:name,
                description:description
            }
        );
        console.log("Categories:",categoryDetails);

        return res.status(200).json({
            success:true,
            categoryDetails,
            message:"Category Created SuccessFully",
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Some error Occurred while Creating Category",
        });
    }

}

// HANDLER FUNCTION FOR GETTING ALL TAGS

exports.getAllCategories = async(req,res) =>{

    try{
        const allCategories = await Category.find({} , 
            {name:true},
            {description:true}
        );

        return res.status(200).json({
            success:true,
            message:"All Categories Returned SuccessFully",
            allCategories,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await Category.find({
                _id: {$ne: categoryId},
            })
                .populate("courses")
                .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}