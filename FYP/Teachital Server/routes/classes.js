var express = require('express');
var router = express.Router();
var Class = require('../Models/classes');
var Relation = require('../Models/relational');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var User = require('../Models/users');
const auth = require('../middlewares/auth');
const multer = require('multer');
const Video = require('../Models/videos');
var ffmpeg = require('fluent-ffmpeg');
let thumbsFilePath = "";
let fileDuration = "";
/* GET users listing. */
// router.post('/register',async function(req, res, next) {
//   let user = await users.findOne({email:req.body.email});
//   if(user){
//     return res.status(400).send("Email already exists!!!");
//   }
//   else{
//     user = new users();
//     user.name = req.body.name;
//     user.status = req.body.status;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     var salt = await bcrypt.genSaltSync(10);
//     user.password = await bcrypt.hash(user.password,salt)
//     await user.save();
//     res.send(_.pick(user,["name","email"]));
//   }
   
// });
router.get('/TeacherHome',auth, async  (req, res, next)=> {
    let classes = await Class.find({teacherEmail:req.userdetails.email});
    //let classes = await Class.find();
    res.send(classes);
  });
  router.get('/StudentHome',auth, async  (req, res, next)=> {
    let my = [];
    let relations = await Relation.find({studentEmail:req.userdetails.email}, {classCode:1,_id:0});
    //let classes = await Class.find();
    //let classes = await Class.find({code:relations.classCode});
    for( a=0; a<relations.length;a++){
      my[a]= relations[a].classCode;
    }
    
    let classes = await Class.find( { code:my});
    res.send(classes);
  });
router.post('/createClass',auth, async  (req, res, next)=> {
    console.log(req.userdetails);
    if(req.userdetails.status == "Teacher"){
      
    let classes = new Class();
    classes.name = req.body.ClassName;
    classes.courseCode = req.body.CourseCode;
    classes.teacherName = req.userdetails.TeacherName;
    classes.teacherEmail = req.userdetails.email;
    classes.code = String(Math.floor(100000 + Math.random() * 900000));

    let sameCode = await Class.find({code:classes.code});
    console.log(sameCode);
    if(sameCode.length!=0){
    while(sameCode[0].code == classes.code){
      console.log("Code matched");
      classes.code= Math.floor(100000 + Math.random() * 900000);
      console.log("new",classes.code);
    }
  }
    await classes.save();
    res.send(classes);
    }
    else
    {
       res.send("You cannot create a class");
    }
  });
  router.post('/findClass',auth, async  (req, res, next)=> {
    console.log(req.userdetails);
    if(req.userdetails.status == "Student"){

    let classes = await Class.find({code:req.body.code});
    let relation = new Relation();
    
    relation.studentEmail = req.userdetails.email;
    relation.classCode = classes[0].code;
    res.send(classes);
    await relation.save();

 
    
    }
    else
    {
       res.send("You cannot Join a class");
    }
  });
  router.delete('/DeleteClass/:id',auth, async (req,res,next)=>{
    let classes = await Class.findByIdAndDelete(req.params.id);
    return res.send(classes);
  })
  router.get('/NumberOfStudents/:code',auth,async (req,res,next)=>{
    let relations = await Relation.find({classCode:req.params.code},{studentEmail:1,_id:0});
    let my = [];
   
    //let classes = await Class.find();
    //let classes = await Class.find({code:relations.classCode});
    for( a=0; a<relations.length;a++){
      my[a]= relations[a].studentEmail;
    }
    
    let users = await User.find( { email:my});
    console.log(users);
    return res.send(users);
    
  })
  router.delete('/FindStudentAndDelete/:email/:classCode',auth, async (req,res,next)=>{
    let relations = await Relation.findOneAndDelete({studentEmail:req.params.email,classCode:req.params.classCode});
    return res.send(relations);
  })
  router.get('/GetTeacherName/:code',auth, async (req,res,next)=>{
    let classes = await Class.find({code:req.params.code});
    return res.send(classes.teacherName);
  })
  router.get('/GetVideos/:code',auth,async (req,res,next)=>{
    let videos = await Video.find({classCode:req.params.code});
    // let my = [];
    console.log(req.params.code);
   
    // //let classes = await Class.find();
    // //let classes = await Class.find({code:relations.classCode});
    // for( a=0; a<relations.length;a++){
    //   my[a]= relations[a].studentEmail;
    // }
    
    // let users = await User.find( { email:my});
    console.log(videos);
    return res.send(videos);
    
  })

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb)=>{
      if(ext !== '.mp4'){
        return cb(res.status(400).end('only mp4 file id allowed'),false);
      }
      cb(null,true)
    }
  })
   
  var upload = multer({ storage: storage }).single('file');
  router.post('/UploadVideo',auth,async(req,res,next)=>{
    upload(req,res,err=>{
      if(err){
        return res.json( {success:false, err})
      }
     

      return res.json({success:true,filePath: res.req.file.path, fileName: res.req.file.filename})
    })

  })
  // router.post('/GenerateThumbnails/',auth,async(req,res,next)=>{
  //   let thumbsFilePath="";
  //   let fileDuration="";
  //   ffmpeg(req.body.filePath).ffprobe(0, function(err, metadata){
      
  //       console.dir(metadata);
  //       console.log("dasd",metadata);
  //       //fileDuration = metadata.format.duration;
  //   })
  //     ffmpeg(req.body.filePath).on('filenames', function (filenames){
  //       console.log('will generate'+ filenames.join(', '))
  //       thumbsFilePath = "uploads/Thumbnails/"+ filenames[0];
  //     }).on('end',function(){
  //       console.log('ScreenShot Taken');
  //       return res.json({ success: true, thumbsFilePath: thumbsFilePath , fileDuration: fileDuration })
  //     }).
  //     screenshots({
  //       count:3,
  //       folder: 'uploads/Thumbnails'
  //     })
  // })
  router.post("/GenerateThumbnails/", (req, res) => {



    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
        console.log(thumbsFilePath);
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath =filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration })
        })
        //Can this be uploaded to google storage?
        .screenshots({
            // Will take 3 screenshots
            count: 3,
            folder: 'uploads/Thumbnails/',
            size: '320x240',
            //Names file w/o extension
            filename:'thumbnail-%b.png'
        });
});
  router.post('/SaveVideoToMongo/:code',auth,async(req,res,next)=>{
      let video = new Video();
      video.email= req.userdetails.email;
      video.classCode = req.params.code;
      video.title = req.body.Title;
      video.description = req.body.Description;
      video.filePath = req.body.FileName;
      video.VideoDuration = fileDuration;
      video.ThumbnailsPath= thumbsFilePath;
      await video.save();
      res.send(video);
  })

module.exports = router;