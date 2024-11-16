const Profile = require("../Models/Profile");
const User = require("../Models/User");
const {uploadToCloudinary} = require("../Utils/uploadtoCloudinary");


// HANDLER FUNCTION FOR UPDATING PROFILE
exports.updateProfile = async(req,res) =>{
    try{
        // FETCH DATA FROM REQUEST BODY
        const{dateOfBirth = "",about = "",contactNumber,gender} = req.body;
        
        const id = req.user.id; 

        if(!contactNumber || !gender){
            return res.status(400).json({
                success:true,
                message:"please fill all the fields",
            });
        }
        // FETCH THE PROFILE DETAILS
        const userDetails = await User.findById(id);
        const profileID = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileID);

        // NOW UPDATE THE PROFILE WITH DATA THAT WE GOT
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;


        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// HANDLER FUNCTION FOR DELETING A USER
exports.deleteProfile = async(req,res) =>{
    try{
        // FETCH DATA FROM REQUEST BODY
        
        const id = req.user.id;
        
        // FETCH DATA FROM DB
        const userDetails = await User.findById({_id : id});

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"User Not Found",
            });
        }

        // DELETE PROFILE FROM PROFILE DB
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // DELETE DATA FROM USER DB.
        await User.findByIdAndDelete({_id: id});

        return res.status(200).json({
            success:true,
            message:"User Deleted SUccessFully",

        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// HANDLER FUNCTION TO GET ALL DATA FROM PROFILE
exports.getProfileData = async(req,res) =>{
    try{

        // FETCH USER ID FROM REQ
        const id = req.user.id;

        // GET USER DETAILS FROM DB
        const userDetails = await User.findById(id).
        populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"Details Fetched SUccessfully",
            userDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Some Error Occurred",
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};