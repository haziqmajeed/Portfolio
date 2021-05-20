import React from 'react'
import userService from '../services/Userservice';
import SingleClass from './SingleClass';
const TeacherHomeCopy = () => {
    const [Classes, setClasses] = React.useState([]);
     const getClasses = () => {
      userService
        .GetClasses().then((data) => {
          setClasses(data);
    
          console.log(data);
         
        })
        .catch((err) => {
          console.log(err);
        });
        
    };
    
    React.useEffect(getClasses, []);
    return ( 
      
            <div>
            {Classes.map((product, index) => (
                <SingleClass key={index} product={product}  />
              ))}
       
       </div>
     );
}
 
export default TeacherHomeCopy;