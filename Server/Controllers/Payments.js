// const{instance} = require("../Config/Razorpay");
// const User = require("../Models/User");
// const Course = require("../Models/Course");
// const mailSender = require("../Utils/mailSender");
// const { default: mongoose } = require("mongoose");


// // HANDLER FOR CAPTURING PAYMENT AND INITIATE RAZORPAY ORDER
// exports.capturePayment = async(req,res) =>{
 
//     // GET Course ID
//     const {course_id} = req.body;

//     // GET USER ID
//     const {userId} = req.user.id;

//     // VALIDATION
//     if(!courseId){
//         return res.status(400).json({
//             success:false,
//             message:"Incomplete Details",
//         });
//     }
//     // VALIDATE COURSE DETAILS
//     let course;
//     try{

//         course = await Course.findById(course_id);
//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"Could Not Find The Course",
//             });
//         }

//         // CHECK IF USER ALREADY PAID FOR THIS COURSE
//         const uid = mongoose.Types.ObjectId(userID);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"User Is Already Enrolled",
//             });
//         }

//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Some Error Occurred",
//         });
//     }

//     // CREATE ORDER
//     const amount = course.price;
//     currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         recipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     // use orders.create on INSTANCE
//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             message:'Order Created SuccessFully',
//             paymentResponse,
//             courseName:course.courseName
//         })
//     }
//     catch(error){
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Some Error Occurred",
//         });
//     }
//     // RETURN RESPONSE
// }

// // VERIFY SIGNATURE AND RAZORPAY
// exports.verifySignature = async(req,res) =>{
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorized");

//     const{courseID,userID} = req.body.payload.payment.entity.notes;


//     try{

//          //FIND THE COURSE AND ENROLL STUDENT IN IT
//         const enrolledCourse = await Course.findOneAndUpdate(
//         {_id:courseID},
//         {$push:{studentsEnrolled:userID}},
//         {new:true});

//         if(!enrolledCourse){
//             return res.status(500).json({
//                 success:false,
//                 message:"Course Not Found",
//             });
//         }
//         console.log(enrolledCourse);

//          //find the student and add the course to their list enrolled courses
//         const enrolledStudent = await User.findOneAndUpdate(
//         {_id:userID},
//         {$push:{courses:courseID}},
//         {new:true},);

//         console.log(enrolledStudent);

//         //MAIL SEND AFTER ENROLLMENT

//         const emailResponse = await mailSender(enrolledStudent.email,
//             "Congratulations from CodeHelp",
//             "Congratulations, you are onboarded into new CodeHelp Course",
//         );

//         console.log(emailResponse);

//         return res.status(200).json({
//             success:true,
//             message:"COurse Enrolled Successfully",
//         })
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Some Error Occurred",
//         });
//     }
// }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Payment Error",
//         });
//     }
// }