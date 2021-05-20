import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './components/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherProfile from './components/TeacherProfile';
import StudentProfile from './components/StudentProfile';
import CreateClass from './components/CreateClass';
import InsideClass from './components/InsideClass';
import TeacherHomeCopy from './components/TeacherHomeCopy';
import NumberOfStudents from './components/NumberOfStudents';
import InsideStudentClass from './components/InsideStudentClass';
import Lectures from './components/Lectures';
import UploadedLecturesTeacher from './components/UploadedLecturesTeacher';
import UploadedLecturesStudent from './components/UploadedLecturesStudent';
function App() {
  return (
    <div className="App">

      <Router>
        <div>
         <ToastContainer/>
          <Switch>
          <Route path="/StudentProfile" exact component={StudentProfile} />
          <Route path="/TeacherProfile" exact component={TeacherProfile} />
          <Route path="/TeacherCreateNewClass" exact component={CreateClass} />
          <Route path="/InsideClass/Students/:code" exact component={NumberOfStudents} />
          <Route path="/InsideClass/Lectures/:code" exact component={Lectures} />
          <Route path="/InsideClass/UploadedLecturesTeacher/:code" exact component={UploadedLecturesTeacher} />
          <Route path="/InsideClass/:id/:code" exact component={InsideClass} />
          <Route path="/InsideStudentClass/UploadedLecturesStudent/:code" exact component={UploadedLecturesStudent} />
          <Route path="/InsideStudentClass/:id/:code" exact component={InsideStudentClass} />
          
            <Route path="/Signup" exact component={Signup} />
            <Route path="/Login" exact component={Login} />
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </Router>
     
    </div>
  );
}

export default App;
