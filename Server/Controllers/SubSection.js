const Section = require("../Models/Section");
const subSection = require("../Models/subSection");
const {uploadToCloudinary} = require("../Utils/uploadtoCloudinary");

exports.createSubSection = async(req,res) =>{

    try{

        // FETCH DATA FROM REQ BODY
        const {title,description,timeDuration,sectionID} = req.body;

        // EXTRACT VIDEO FILE
        const video = req.files.videoFile;

        // vALIDATE THE DATA
        if(!title || !description || !timeDuration || !videoUrl || !sectionID){
            return res.status(402).json({
                success:false,
                message:"Fill All The Details",
            });
        }

        // UPLOAD VIDEO TO CLOUDINARY
        const uploadDetails = await uploadToCloudinary(video,process.env.FOLDER_NAME);

        // CREATE ENTRY IN DB For SUBSECTION
        const subSectionDetails = await subSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:uploadDetails.secure_url,
        });

        // UPDATE SECTION DB WITH SUBSECTION
        const updatedSection = await Section.findByIdAndUpdate({_id : sectionID},
            {
                $push:{
                    subSection:subSectionDetails._id,

                }
            },
            {new:true},
        ).populate("subSection").exec();

        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Some Error Occurred",
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, title, description } = req.body
      const subSection = await SubSection.findById(sectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      return res.json({
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}