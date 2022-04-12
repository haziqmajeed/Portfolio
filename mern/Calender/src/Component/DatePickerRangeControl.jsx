
import {  DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import { useEffect, useState } from "react";
import moment from 'moment';
import ru from 'moment/locale/ru';
import 'font-awesome/css/font-awesome.min.css';
import '../css/DateRange.css'
import CustomizedSwitches from './Switch/DarkModeSwitch';
import DarkModeSwitch from './Switch/DarkModeSwitch';
import BackgroundSwitch from './Switch/BackgroundSwitch';
import {END_DATE} from 'react-dates/constants'

function DatePickerRangeControl({
  selectedStartBgColor, 
  selectedStartColor,
  selectedRangeBgColor,
  selectedRangeColor,
  selectedEndBgColor,
  selectedEndColor,
  sidebar,
  button,
  // darkmode,
  // noborder
 }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calenderUpdate, setCalenderUpdate] = useState(true);
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [darkmode,setDarkMode] = useState(false);
  const [noborder,setNoBorder] = useState(false);
  useEffect(()=>{
    moment.locale("ru");
    setTimeout(()=>{
      getMonthAndYear()
    },30)
  },[])
  
  useEffect(()=>{
    if(sidebar){
    const parent = document.getElementsByClassName('DayPickerRangeController');
    const list = parent[0].getElementsByClassName("sidebar")
    const allList = list[0].childNodes[0].childNodes;
    
    setTimeout(()=>{
      for(let i = 0 ;i<allList.length ;i++){
        allList[i].addEventListener("click", (e)=>{
          const activeList = parent[0].querySelectorAll('.sidebar .active');
          activeList[0].classList.remove("active")
          e.target.parentNode.classList.add("active")
        })
      }
    },30)
  }
  },[])

  const handleDarkMode = (val) =>{
    if (val){
      setDarkMode(true)
    }else{
      setDarkMode(false)
    }
  }
  const handleBackground = (val) =>{
    if (val){
      setNoBorder(true)
    }else{
      setNoBorder(false)
    }
  }
  const handlePrevClick = () => {
      setTimeout(()=>{
        getMonthAndYear()  
      },1)
  }
  const handleNextClick = () => {  
    setTimeout(()=>{
      getMonthAndYear()
    },1)
}
  const updateCalender = () => {
    const parent = document.getElementsByClassName('DayPickerRangeController');
    if(calenderUpdate){     
      
      setTimeout(()=>{
        const weekdays = parent[0].getElementsByClassName("DayPicker_weekHeader_ul")
        
        for (let i = 0;i<weekdays[0].childNodes.length;i++){
          if(i<=5){
          weekdays[0].childNodes[i].childNodes[0].innerHTML=moment()._locale._weekdaysMin[i+1]
          }
          else{
          weekdays[0].childNodes[i].childNodes[0].innerHTML=moment()._locale._weekdaysMin[0]
          }
        }
        setCalenderUpdate(false)
      },30)
    }
    return(
      sidebar ?  <div className='sidebar'>
        <ul>
          <li className='active'>
            <a href="#">Сегодня</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>
          </li>
          <li>
            <a href="#">Вчера</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>
          </li>
          <li>
            <a href="#">Текущая неделя</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>
          </li>
          <li>
            <a href="#">Прошлая неделя</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>  
          </li>
          <li>
            <a href="#">Прошлый месяц</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>
          </li>
          <li>
            <a href="#">Другая дата</a>
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
            </span>
          </li>
        </ul>
      </div> : button ? <button>Кнопка</button> : <></>
    )
  }
//   const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
     
//     console.log("month",month)
//     let i
//     let years = []
//     for(i = moment().year(); i >= moment().year() - 100; i--) {
//         years.push(<option value={i} key={`year-${i}`}>{i}</option>)
//     }
//     return (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//             <div>
//                 <select value={month.month()} onChange={e => onMonthSelect(month, e.target.value)}>
                    
//                     {moment.months().map((label, value) => (
                        
//                         <option value={value} key={value}>{label}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <select value={month.year()} onChange={e => onYearSelect(month, e.target.value)}>
//                     {years}
//                 </select>
//             </div>
//         </div>
//     )
// }
function getMonthAndYear(){
  const parent = document.getElementsByClassName('DayPickerRangeController');
  const allMonths = parent[0].getElementsByClassName("CalendarMonth_caption")
  const array = allMonths[1].childNodes[0].innerHTML.split(" ");
  if(allMonths[1].childNodes.length<=1){
  const month = document.createElement("p");
  const year = document.createElement("p");
  const yearmonth = document.createElement("div");
  month.classList.add("calenderMonths")
  year.classList.add("calenderYears")
  yearmonth.classList.add("calenderYearsMonths")
  const yeartext = document.createTextNode(array[1]);
  const monthtext = document.createTextNode(array[0]);
  year.appendChild(yeartext);
  month.appendChild(monthtext);
  yearmonth.appendChild(month);
  yearmonth.appendChild(year);
  parent[0].getElementsByClassName("CalendarMonth_caption")[1].appendChild(yearmonth) 
  }
}
  const css = `  
  
  .DayPickerRangeController .CalendarDay__selected_span {
    background: ${selectedRangeBgColor} !important;
    color: ${selectedRangeColor} ;
  }
  .DayPickerRangeController .CalendarDay__selected_start {
    color:${selectedStartColor} !important;
    background-color: ${selectedStartBgColor} !important;
  }
  .DayPickerRangeController .CalendarDay__selected_end {
    background-color: ${selectedEndBgColor} !important;
    color:${selectedEndColor} !important;
  }
  .DayPickerRangeController .DayPicker_portal__horizontal {
    ${sidebar ? "width:451px !important" : "width: 267px !important;"};
  }
  .DayPickerRangeController .DayPicker__horizontal .DayPicker_wrapper__horizontal_1{
    ${sidebar ? "width:64% !important;" : "width:100% !important;"}
  }
  .DayPickerRangeController .DayPicker_transitionContainer {
    ${sidebar ? 'width: 400px !important;' : 'width: 267px !important;' }
  }
  .DatePicker-nextBtn svg{
    ${sidebar ? "right: 42px;" : "right: 20px;"}
  }
  .DayPickerRangeController .DayPicker.DayPicker_1.DayPicker__horizontal.DayPicker__horizontal_2.DayPicker_portal__horizontal.DayPicker_portal__horizontal_3 > div{
    ${sidebar ? "display:flex" : 
    ""}
  }
  ${button ? `.DayPickerRangeController .DayPicker_calendarInfo__horizontal.DayPicker_calendarInfo__horizontal_1{
    border-top:1px solid #DDDFE0;
    width: 100%;
    text-align: center;
  }` : ""}
  ${sidebar ? `.DayPickerRangeController .DayPicker_calendarInfo__horizontal.DayPicker_calendarInfo__horizontal_1{
    width:32%;
    z-index: 2;
    border-left: 1px solid #DDDFE0;
  }` : ""}

  ${darkmode ? 
  `
  .column1{
    background-color:black;
    height:100vh;
  }
  .column1 .MuiTypography-root{
    color:white;
  }
  .DayPickerRangeController .DayPicker{
    background: #333333;
  }
  .DayPickerRangeController .CalendarMonth{
    background: #333333;
  }
  .DayPickerRangeController .CalendarMonth .CalendarMonth_caption{
    color:#FFFFFF
  }
  .DayPickerRangeController .CalendarMonthGrid{
    background: #333333;
  }
  .DayPickerRangeController .CalendarDay__default{
    background: #333333;
    color: #FFF;
  }
  .DayPickerRangeController .DayPicker_weekHeader_li small{
    color: rgba(255, 255, 255, 0.72);
  }
  .DayPickerRangeController .CalendarMonth_table tr td:nth-last-child(2){
    color: rgba(255, 255, 255, 0.72);
  }
  .DayPickerRangeController .CalendarMonth_table tr .CalendarDay__lastDayOfWeek_3:last-child{
    color: rgba(255, 255, 255, 0.72);
  }
  .DayPickerRangeController .DayPicker_portal__horizontal{
    box-shadow:unset;
    border: 1px solid #5C636B;
  }
  ${sidebar ? `.DayPickerRangeController .DayPicker_calendarInfo__horizontal.DayPicker_calendarInfo__horizontal_1{
    border-left: 1px solid #5C636B;
  }` : ``}
  .DayPickerRangeController .sidebar ul li{
    color:#FFF
  }
  .DayPickerRangeController .sidebar ul li span svg{
    fill:#FFF
  }
  .DayPickerRangeController .DayPicker_calendarInfo__horizontal.DayPicker_calendarInfo__horizontal_1 button{
    color: #3D91FF;
  }
  .DayPickerRangeController .DatePicker-nextBtn svg {
    fill:#3D91FF;
  }
  .DayPickerRangeController .DatePicker-prevBtn svg{
    fill:#3D91FF;
  }
  .DayPickerRangeController .CalendarMonth_caption .calenderYears{
    color: #3D91FF;
  }
  .DayPickerRangeController .CalendarDay__today.CalendarDay__today_3:after{
    border: 1px solid #fff;
  }
  .DayPickerRangeController .sidebar a{
    color: #fff;
  }
  ${button ? `.DayPickerRangeController .DayPicker_calendarInfo__horizontal.DayPicker_calendarInfo__horizontal_1{
    border-top: 1px solid #5C636B;
  }` : ``}
  `
  :``}
  ${noborder ? 
    `
    .DayPickerRangeController .DayPicker_portal__horizontal{
      box-shadow:unset;
      border:unset
    }
    .DayPickerRangeController .DayPicker{
      background: unset;
    }
    .DayPickerRangeController .CalendarMonth{
      background: unset;
    }
    .DayPickerRangeController .CalendarMonthGrid{
      background: unset;
    }
    .DayPickerRangeController .CalendarDay__default{
      background: unset;
    }
    `
    : ``}

`
const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
}

const handleFocusChange = focusedInput => {
  setFocusedInput(focusedInput || 'startDate' )
}

// const dayClick = date => {
//     console.log(date)
// }
  
  return(
    <>
      <div className='DayPickerRangeController'>
        <h1 className='heading'>DayPickerRangeController</h1>
        <DarkModeSwitch handleDarkMode={handleDarkMode}/>
        <BackgroundSwitch handleBackground={handleBackground} />
        <style>{css}</style>
          <DayPickerRangeController
              numberOfMonths={1}
              onDatesChange={handleDateChange}
              focusedInput={focusedInput}
              onFocusChange={handleFocusChange}
              renderCalendarInfo={updateCalender}
              onPrevMonthClick={handlePrevClick}
              onNextMonthClick={handleNextClick}
              calendarInfoPosition="after"
              startDate={startDate}
              // renderMonthElement={renderMonthElement}
              transitionDuration={0}
              endDate={endDate}
              enableOutsideDays={true}
              withPortal={true}
              navPrev={(
                  <span className="DatePicker-prevBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
                  </span>
              )}
              navNext={(
                  <span className="DatePicker-nextBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
                  </span>
              )}
              noBorder={true}  
            />
      </div>
    </>
  ) 
}
export default DatePickerRangeControl

