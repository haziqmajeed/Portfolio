import './App.css';
import DatePickerRangeControl from './Component/DatePickerRangeControl';
import DayPickerSingleController from './Component/DayPickerSingleController';
function App() {
  return (
    <div className="App">
      {/* <CustomizedSwitches/> */}
      <div className="parent">
          <div className='column1'>
            <DatePickerRangeControl
            selectedStartBgColor="rgba(51, 119, 187, 0.9)"
            selectedStartColor="#FFFFFF"
            selectedRangeBgColor="#F6F6F6"
            selectedRangeColor="rgba(27, 31, 59, 0.8)"
            selectedEndBgColor="rgba(51, 119, 187, 0.9)"
            selectedEndColor="#FFFFFF"
            sidebar={true}
            button={false}
            darkmode={false}
            noborder={false}
            />
          </div>
          <div className='column2'>
            <DayPickerSingleController
            selectedBgColor="rgba(51, 119, 187, 0.9)"
            selectedColor="#FFFFFF"
            sidebar={false}
            button={true}
            darkmode={false}
            noborder={false}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
