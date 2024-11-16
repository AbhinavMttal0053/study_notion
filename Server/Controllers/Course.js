const User = require("../Models/User");
const Category = require("../Models/Category");
const Course = require("../Models/Course");
const {uploadToCloudinary} = require("../Utils/uploadtoCloudinary");


exports.createCourse = async(req,res) =>{
    try{
        // FETCH DATA FROM REQ BODY
        const{courseName,courseDescription,whatYouWillLearn,price,
            category,tag,instructions,status}
         = req.body;

        // GET THUMBNAIL
        const thumbnail = req.files.thumbnailImage;

        // VALIDATION
        if(!courseName || !courseDescription || !whatYouWillLearn 
            || !price || !category|| !tag || !instructions){
            return res.status(401).json({
                success:false,
                message:"Fill All The Fields Properly",
            });
        }
        if(!status || status === undefined){
            status === 'draft';
        }
        // CHECK IF INSTRUCTOR EXISTS
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor",
        });

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Not Found",
            });
        }
        
        // CHECK IF GIVEN TAG IS VALID
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Tag is Invalid",
            });
        }

        // UPLOAD TO CLOUDINARY
        const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);


        // CREATE DB ENTRY FOR THE NEW COURSE
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:status,
            instructions:instructions,
        });

        // ADD COURSE TO THE INSTRUCTOR'S DB 
        await User.findByIdAndUpdate({
            _id:instructorDetails._id,
        },
        {
            $push:{
                Courses:newCourse._id,
            }
        },
        {new:true},
    );

    // Update CATEGORY DB
    await Category.findByIdAndUpdate(
        { _id: category },
        {
            $push: {
                course: newCourse._id,
            },
        },
        { new: true }
    );


    return res.status(200).json({
        success:true,
        message:"Course Created",
        data:newCourse,
    });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        });
    }
}


// HANDLER FUNCTION TO SHOW ALL COURSES

exports.getAllCourses = async(req,res) =>{
    try{

        // GET DATA BY DB CALL
        const allCourses = await Courses.find({}, {
            courseName:true,
            courseDescription:true,
            instructor:true,
            price:true,
            whatYouWillLearn:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();


        return res.status(200).json({
            success:true,
            message:"Courses Fetched Successfully",
            data:allCourses,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        }); 
    }
}

// Handler FUnction for Getting All Details of course

exports.getCourseDetails = async(req,res) =>{
    try{

        // Fetch Course Id

        const{courseId} = req.body;

        // Get Course Details
        const courseDetails = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"Additional Details",
                    },
                }
            )
            .populate("category")
            .populate("RatingAndReview")
            .populate(
                {
                    path:"courseContent",
                    populate:{
                        path:"subSection",
                    },
                }
            ).exec();

            // Lil Validation
            
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:`could not find course details with course id ${courseId}`,
                });
            }

            return res.status(200).json({
                success:true,
                message:"course details fetched Successfully",
                courseDetails,
            });
    }
    catch(error){

        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"error occurred while fetching data"
        });
    }
}