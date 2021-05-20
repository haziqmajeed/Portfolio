import GenericServices from "./GenericServices";
import jwtDecode from "jwt-decode"
import axios from "axios"
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
class Userservice extends GenericServices{
    constructor(){
        super();
    } 
    //User Registration Process
    addUser = (data)=>this.post("users/register",data)

    //User Login Process
    login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("users/login", { email, password })
        .then(async(token) => {
          await localStorage.setItem("token", token);
          console.log("Token decode",jwtDecode(token));
          await resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    }); 
    //Create New Class
    CreateClass = (data)=> this.post("classes/createClass",data)

    // Get All Classes of sign in User
    GetTeacherClasses = () => this.get("classes/TeacherHome");
    
    //log out 
    logout = ()=>{
      localStorage.removeItem("token");
    }

  //check user is logged in or not
  isLoggedIn = ()=>{
    return localStorage.getItem("token") ? true : false
  }

  //get log in user
  getLoggedInUser = () => {
    try {
      console.log('get logged in user method called');
      const jwt = localStorage.getItem("token"); 
      var obj = jwtDecode(jwt);
      console.log(obj);
      return obj
    } catch (ex) {
      return console.log(ex);
    }
  } 
  //Get Teacher Videos
  GetVideos = (code) => this.get('classes/GetVideos/'+code);
  //UploadVideo
  UploadVideo= (formData,Config) => this.post('classes/UploadVideo',formData,Config);
  //SaveVideotoMongo
  SaveVideoToMongo=(data,code) => this.post('classes/SaveVideoToMongo/'+code,data);
  //Get teacher Name
  GetTeacherName= (code)=> this.get("classes/GetTeacherName/"+code)
  //add Class
  addClass = (data)=>this.post("/classes/findClass",data)

  // Get All Classes of sign in User
  GetStudentClasses = () => this.get("/classes/StudentHome");

  isTeacher = ()=>{
      console.log("User: ",this.getLoggedInUser().status);
       if(this.getLoggedInUser().status === "Teacher") return true; else return false
    
  }
  DeleteClass =(_id) => this.delete('classes/DeleteClass/'+ _id);
  getStudentsOfClass = (code) => this.get('classes/NumberOfStudents/'+code);
  FindStudentAndDelete = (email,classCode)=> this.delete('classes/FindStudentAndDelete/'+email+'/'+classCode);
  //Generate Thumbnails
  GenrateThumbnails =(data) => this.post('classes/GenerateThumbnails/',data);
}

let userService = new Userservice();
export default userService;