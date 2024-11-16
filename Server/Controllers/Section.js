const Section = require("../Models/Section");
const Course = require("../Models/Course");

exports.createSection = async(req,res) =>{

    try{

        // FETCH DATA FROM REQ BODY
        const {sectionName,sectionId} = req.body;


        // DATA VALIDATION
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:true,
                message:"Please Fill All the Fields",
            });
        }

        // CREATE SECTION
        const newSection = await Section.create({sectionName});

        // CREATE ENTRY OF SECTION IN COURSE DB.
        const updatedSectionDetails =await Course.findByIdAndUpdate(courseID,
            {
                $push:{
                    courseContent:newSection._id,

                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            newSection,
            updatedSectionDetails,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Some Error Occurred",
        });
    }
}

// UPDATE SECTION HANDLER FUNCTION
exports.updateSection = async(req,res) =>{
    try{

        // FETCH DATA
        const{sectionName,sectionID} = req.body;

        // VALIDATE DATA
        if(!sectionID || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Fill All The Fields",
            });
        }

        // UPDATE SECTION NAME IN DB
        const section = await Section.findByIdAndUpdate(courseID,
            {sectionName},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:"Section Name Updated",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Some Error Occurred",
        });
    }
}   

// DELETE SECTION HANDLER FUNCTION
exports.deleteSection = async(req,res) =>{
    try{
        // GET DATA FROM PARAMATERS
        const{sectionID} = req.params;

        // DELETE DATA FROM DB
        await Section.findByIdAndDelete(sectionID);

        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Some Error Occured"
        })
    }
}