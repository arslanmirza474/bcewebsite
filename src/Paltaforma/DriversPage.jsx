import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { notification,Modal } from 'antd';
import Radio from '@mui/material/Radio';
import "./Driver.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import Select from 'react-select';
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const stateOptions = states.map(state => ({ value: state, label: state }));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '9px',
    height: '51px',
    border: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : '1px solid rgba(0, 0, 0, 0.42)',
    boxShadow: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : 'none',
    color:"black",
    fontWeight:"450"
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'black', // Set arrow color
    borderRight: 'none', // Remove the border to the right of the arrow
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2a4764' : 'white', // Set background color for selected option
    color: state.isSelected ? 'white' : 'black', // Set text color for selected option
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black', // Set text color for the selected value
  }),
};
const StyledRadio = styled(Radio)({
  color: '#30577E',
  width: '30px',
  height: '30px',
  '&.Mui-checked': {
    color: '#30577E',
    width: '30px',
    height: '30px',
  },
});
function DriversPage({ changeIcon, handleNavigationClick }) {
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [fullName, setFullName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [licenseState, setLicenseState] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicletable, setVehicletable] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [expyear, setExpyear]=useState("")
  const [expmonth, setExpmonth]=useState("")
  const [informId, setInformId] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

const adddriver =()=>{
  setIsSectionVisible(!isSectionVisible);
}
useEffect(() => {
  const informationId = localStorage.getItem("mainid");
  if (informationId) {
    setInformId(informationId);
  }
}, []);

useEffect(() => {
  fetchdriver()
}, [informId]);
const fetchdriver =()=>{
  if (informId) {
    axios.get(`https://serverforbce.vercel.app/api/getdriverbyinforid/${informId}`)
      .then(res => {
        if (res.data.status === true) {
          setVehicletable(res.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle data:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }
}
const handleDelete = async (id) => {
  setDeleteId(id);
  setModalVisible(true);
};
// const handleButtonClick = () => {
//   if (
//     fullName &&
//     middleInitial &&
//     lastName &&
//     dob &&
//     licenseState &&
//     licenseNumber &&
//     selectedValue
//   ) {

//     const newDriverData = {
//       fullName,
//       middleInitial,
//       lastName,
//       dob,
//       licenseState,
//       licenseNumber,
//       selectedValue,
//       expyear,
//       expmonth,
//       informId
//     };

//     axios.post("https://serverforbce.vercel.app/api/postdriver", newDriverData)
//       .then(res => {
//         if (res.data.status === true) {
//           changeIcon('fa-regular fa-circle-check green-icon');
//           adddriver();
//           fetchdriver()
//           // Display success notification
//           openNotification('success', 'Driver Created Successfully');
//         } else {
//           // Display error notification
//           openNotification('error', 'Error Creating Driver', res.data.error);
//         }
//       })
//       .catch(error => {
//         console.error('Error creating driver:', error);

//         // Display error notification
//         openNotification('error', 'Error Creating Driver', 'An unexpected error occurred.');
//       });

//   } else {
//     alert('Please fill in all required fields.');
//   }
// };
const handleModalOk = async () => {
  try {
    const response = await axios.delete(`https://serverforbce.vercel.app/api/deletedriverbyid/${deleteId}`);

    if (response.data.status === true) {
      // Remove the deleted driver from the table
      setVehicletable((prevTable) => prevTable.filter((row) => row._id !== deleteId));
      openNotification('success', 'Driver Removed Successfully');
    } else {
      console.error('Error deleting driver:', response.data.error);
      openNotification('success', 'Driver Removed Successfully');
    }
  } catch (error) {
    console.error('Error deleting driver:', error);
    openNotification('error', 'A unexpected Error Occur');
  } finally {
    setModalVisible(false);
  }
};
const openNotification = (type, message, description = '') => {
  notification[type]({
    message,
    description,
  });
};
const handleModalCancel = () => {
  setModalVisible(false);
  setDeleteId(null);
};


const gotonext =()=>{
  if(vehicletable.length > 0){
    changeIcon('fa-regular fa-circle-check green-icon');
  handleNavigationClick('about');
  }else{
    openNotification('error', 'Please add atleast one Driver');

  }
  
}
  // Update Driver
  const handleUpdate = (driverId) => {
    const driverToUpdate = vehicletable.find((driver) => driver._id === driverId);

    if (driverToUpdate) {
      // Set state with the values of the driver to update
      setFullName(driverToUpdate.fullName);
      setMiddleInitial(driverToUpdate.middleInitial);
      setLastName(driverToUpdate.lastName);
      setDob(driverToUpdate.dob);
      setLicenseState(driverToUpdate.licenseState);
      setLicenseNumber(driverToUpdate.licenseNumber);
      setSelectedValue(driverToUpdate.selectedValue);
      setExpyear(driverToUpdate.expyear);
      setExpmonth(driverToUpdate.expmonth);
      setInformId(driverToUpdate.informId);
    // Show the form section
    setIsSectionVisible(false);
      // Set the driver ID to be updated
      setDeleteId(driverId);

  
    }
  };


  const handleButtonClick = (e) => {
    const form = e.target.form;

    // Manually check form validity
    if (!form.checkValidity()) {
      // If form is invalid, show an error message or handle it accordingly
      openNotification("error", "Please fill in all required fields.");
      return;
    }
  
    e.preventDefault();
   
    if (
      fullName &&
      lastName &&
      dob &&
      licenseState &&
      licenseNumber &&
      selectedValue
    ) {
      const newDriverData = {
        fullName,
        middleInitial,
        lastName,
        dob,
        licenseState,
        licenseNumber,
        selectedValue,
        expyear,
        expmonth,
        informId,
      };

      // Check if it's an update or a new post
      const url = deleteId
        ? `https://serverforbce.vercel.app/api/putdriver/${deleteId}`
        : "https://serverforbce.vercel.app/api/postdriver";

      const axiosMethod = deleteId ? axios.put : axios.post;

      axiosMethod(url, newDriverData)
        .then((res) => {
          if (res.data.status === true) {
            // If it's an update, reset the state and deleteId
            if (deleteId) {
              setDeleteId(null);
            }

            // Reset form and fetch updated driver data
            setFullName("");
            setMiddleInitial("");
            setLastName("");
            setDob("");
            setLicenseState("");
            setLicenseNumber("");
            setSelectedValue("");
            setExpyear("");
            setExpmonth("");
            fetchdriver();
            setIsSectionVisible(true);

            // Display success notification
            openNotification("success", deleteId ? "Driver Updated Successfully" : "Driver Created Successfully");
          } else {
            // Display error notification
            openNotification("error", deleteId ? "Error Updating Driver" : "Error Creating Driver", res.data.error);
          }
        })
        .catch((error) => {
          console.error(deleteId ? "Error updating driver:" : "Error creating driver:", error);

          // Display error notification
          openNotification("error", deleteId ? "Error Updating Driver" : "Error Creating Driver", "An unexpected error occurred.");
        });
    } else {
      openNotification("error","  Please Fill all the blanks" );
    }
  };
  const handleProtect = (selectedOption) => {
    setLicenseState(selectedOption.value);
    
  };
  return (
    <>
    <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">3</span><span className="outof">/5</span></span>
            <span className="Page_Name">Drivers</span>
           
        </div>
        <div className="next-page bsns-next">
            <span className="next-step">Next step</span>
            <span className="vehicles"  onClick={()=>{handleNavigationClick("about")}}>About business</span>

        </div>
       </div>
       </div>
      <div className="Driver_container">
        <div className={isSectionVisible ? "before_press" : "after_press"}>
          {isSectionVisible && (
            <>
              <p className="Device_information">Drive information</p>
              <p className="comontext">
                Please add all driver’s who will drive any previously listed vehicles<br />
(Full Name, Date of Birth, License State, License Number, CDL/Non-CDL)
              </p>
              {vehicletable.length > 0 && (
        <table className='main_table mt-5 mb-5'>
          <thead className='table_header'>
            <tr>
              <th></th>
              <th>Driver Name</th>
              <th>Date of Birth </th>
              <th>State</th>
              <th>License Number</th>
              <th> CDL/Non-CDL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicletable.map((row, index) => {

                  const state = row.licenseState;
                  const truckImages = {
                    'Alabama': 'AL',
                    'Alaska': 'AK',
                    'Arizona': 'AZ',
                    'Arkansas': 'AR',
                    'California': 'CA',
                    'Colorado': 'CO',
                    'Connecticut': 'CT',
                    'Delaware': 'DE',
                    'Florida': 'FL',
                    'Georgia': 'GA',
                    'Hawaii': 'HI',
                    'Idaho': 'ID',
                    'Illinois': 'IL',
                    'Indiana': 'IN',
                    'Iowa': 'IA',
                    'Kansas': 'KS',
                    'Kentucky': 'KY',
                    'Louisiana': 'LA',
                    'Maine': 'ME',
                    'Maryland': 'MD',
                    'Massachusetts': 'MA',
                    'Michigan': 'MI',
                    'Minnesota': 'MN',
                    'Mississippi': 'MS',
                    'Missouri': 'MO',
                    'Montana': 'MT',
                    'Nebraska': 'NE',
                    'Nevada': 'NV',
                    'New Hampshire': 'NH',
                    'New Jersey': 'NJ',
                    'New Mexico': 'NM',
                    'New York': 'NY',
                    'North Carolina': 'NC',
                    'North Dakota': 'ND',
                    'Ohio': 'OH',
                    'Oklahoma': 'OK',
                    'Oregon': 'OR',
                    'Pennsylvania': 'PA',
                    'Rhode Island': 'RI',
                    'South Carolina': 'SC',
                    'South Dakota': 'SD',
                    'Tennessee': 'TN',
                    'Texas': 'TX',
                    'Utah': 'UT',
                    'Vermont': 'VT',
                    'Virginia': 'VA',
                    'Washington': 'WA',
                    'West Virginia': 'WV',
                    'Wisconsin': 'WI',
                    'Wyoming': 'WY'
                  };
                  
                  const shortstate = truckImages[state];

              
return(
  <>
    <tr key={index}>
                <td>{index + 1}.</td>
                <td > {row.fullName} {row.lastName}</td>
                <td >{row.dob}</td>
                <td >{shortstate}</td>
                <td>{row.licenseNumber}</td>
                <td className="d-flex align-items-center ">{row.selectedValue}
                <div style={{marginLeft:"auto"}}>
                <button className="btn" style={{padding:"0px"}} onClick={() => handleUpdate(row._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M24.4424 20.6748C24.4424 23.083 22.4854 25.04 20.0771 25.04H9.54785C7.13965 25.04 5.18262 23.083 5.18262 20.6748V10.1484C5.18262 7.74023 7.13965 5.7832 9.54785 5.7832H13.3506V4.53223H9.54785C6.45117 4.53223 3.93164 7.05176 3.93164 10.1484V20.6748C3.93164 23.7715 6.45117 26.291 9.54785 26.291H20.0742C23.1709 26.291 25.6904 23.7715 25.6904 20.6748V16.8721H24.4395V20.6748H24.4424Z" fill="#263238"/>
  <path d="M26.0655 4.78711C25.3946 4.11621 24.5128 3.7793 23.631 3.7793C22.7491 3.7793 21.8702 4.11621 21.1964 4.78711L9.14072 16.8428C8.64561 17.3379 8.32334 17.9795 8.22666 18.6738L7.67002 22.5645C7.62315 22.8984 7.88389 23.1885 8.20908 23.1885C8.23545 23.1885 8.26182 23.1855 8.28818 23.1826L12.1788 22.626C12.8731 22.5264 13.5147 22.207 14.0099 21.7119L26.0655 9.65625C27.4103 8.31152 27.4103 6.13184 26.0655 4.78711ZM10.6056 17.1475L20.8097 6.94336L23.9063 10.043L13.7052 20.2471L10.6056 17.1475ZM12.003 21.3867L9.04111 21.8086L9.46299 18.8467C9.50401 18.5684 9.60361 18.2988 9.75303 18.0645L12.7823 21.0938C12.548 21.2461 12.2813 21.3486 12.003 21.3867ZM25.1808 8.76855L24.7911 9.1582L21.6944 6.05859L22.0841 5.66895C22.4972 5.25586 23.048 5.02734 23.6339 5.02734C24.2198 5.02734 24.7706 5.25586 25.1837 5.66895C26.0362 6.52441 26.0362 7.91602 25.1808 8.76855Z" fill="#263238"/>
</svg>                  </button>
<button className="btn" style={{padding:"0px"}} onClick={() => handleDelete(row._id)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M22.5 11.25C21.9375 11.25 21.5625 11.625 21.5625 12.1875V23.25C21.5625 24 21 24.375 20.4375 24.375H9.5625C8.8125 24.375 8.4375 23.8125 8.4375 23.25V12.1875C8.4375 11.625 8.0625 11.25 7.5 11.25C6.9375 11.25 6.5625 11.625 6.5625 12.1875V23.25C6.5625 24.9375 7.875 26.25 9.5625 26.25H20.25C21.9375 26.25 23.25 24.9375 23.25 23.25V12.1875C23.4375 11.625 23.0625 11.25 22.5 11.25Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M13.5 21.5625V12.1875C13.5 11.625 13.125 11.25 12.75 11.25C12.375 11.25 11.625 11.625 11.625 12.1875V21.5625C11.625 22.125 12 22.5 12.5625 22.5C13.125 22.5 13.5 22.125 13.5 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M18.375 21.5625V12.1875C18.375 11.625 17.8125 11.25 17.25 11.25C16.6875 11.25 16.5 11.625 16.5 12.1875V21.5625C16.5 22.125 16.875 22.5 17.25 22.5C17.625 22.5 18.375 22.125 18.375 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M24.375 7.5H19.6875V6.1875C19.6875 4.875 18.5625 3.75 17.25 3.75H12.75C11.4375 3.75 10.3125 4.875 10.3125 6.1875V7.5H5.625C5.0625 7.5 4.6875 7.875 4.6875 8.4375C4.6875 9 5.0625 9.375 5.625 9.375H24.375C24.9375 9.375 25.3125 9 25.3125 8.4375C25.3125 7.875 24.9375 7.5 24.375 7.5ZM12.1875 6.1875C12.1875 5.8125 12.375 5.625 12.75 5.625H17.25C17.625 5.625 17.8125 5.8125 17.8125 6.1875V7.5H12.1875V6.1875Z" fill="#263238" fill-opacity="0.77"/>
</svg>                  </button>
                </div>
                </td>
              
              </tr>
  </>
)
            
            })}
          </tbody>
        </table>
      )}
              {vehicletable.length > 0 && (
                <div className="table_small_screen">
                  {
                    vehicletable.map((row) => {
                      return (
                        <>
                          <table>
                            <tr className="border-bottom">
                              <td className="table_heading_secction">{row.fullName} {row.lastName}</td>
                              <td className='d-flex justify-content-end'>    <button className="btn" style={{padding:"0px"}}  onClick={() => handleUpdate(row._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M24.4424 20.6748C24.4424 23.083 22.4854 25.04 20.0771 25.04H9.54785C7.13965 25.04 5.18262 23.083 5.18262 20.6748V10.1484C5.18262 7.74023 7.13965 5.7832 9.54785 5.7832H13.3506V4.53223H9.54785C6.45117 4.53223 3.93164 7.05176 3.93164 10.1484V20.6748C3.93164 23.7715 6.45117 26.291 9.54785 26.291H20.0742C23.1709 26.291 25.6904 23.7715 25.6904 20.6748V16.8721H24.4395V20.6748H24.4424Z" fill="#263238"/>
  <path d="M26.0655 4.78711C25.3946 4.11621 24.5128 3.7793 23.631 3.7793C22.7491 3.7793 21.8702 4.11621 21.1964 4.78711L9.14072 16.8428C8.64561 17.3379 8.32334 17.9795 8.22666 18.6738L7.67002 22.5645C7.62315 22.8984 7.88389 23.1885 8.20908 23.1885C8.23545 23.1885 8.26182 23.1855 8.28818 23.1826L12.1788 22.626C12.8731 22.5264 13.5147 22.207 14.0099 21.7119L26.0655 9.65625C27.4103 8.31152 27.4103 6.13184 26.0655 4.78711ZM10.6056 17.1475L20.8097 6.94336L23.9063 10.043L13.7052 20.2471L10.6056 17.1475ZM12.003 21.3867L9.04111 21.8086L9.46299 18.8467C9.50401 18.5684 9.60361 18.2988 9.75303 18.0645L12.7823 21.0938C12.548 21.2461 12.2813 21.3486 12.003 21.3867ZM25.1808 8.76855L24.7911 9.1582L21.6944 6.05859L22.0841 5.66895C22.4972 5.25586 23.048 5.02734 23.6339 5.02734C24.2198 5.02734 24.7706 5.25586 25.1837 5.66895C26.0362 6.52441 26.0362 7.91602 25.1808 8.76855Z" fill="#263238"/>
</svg>   
                  </button>               <button  style={{padding:"0px"}}  className='btn tabltd' onClick={() => handleDelete(row._id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M22.5 11.25C21.9375 11.25 21.5625 11.625 21.5625 12.1875V23.25C21.5625 24 21 24.375 20.4375 24.375H9.5625C8.8125 24.375 8.4375 23.8125 8.4375 23.25V12.1875C8.4375 11.625 8.0625 11.25 7.5 11.25C6.9375 11.25 6.5625 11.625 6.5625 12.1875V23.25C6.5625 24.9375 7.875 26.25 9.5625 26.25H20.25C21.9375 26.25 23.25 24.9375 23.25 23.25V12.1875C23.4375 11.625 23.0625 11.25 22.5 11.25Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M13.5 21.5625V12.1875C13.5 11.625 13.125 11.25 12.75 11.25C12.375 11.25 11.625 11.625 11.625 12.1875V21.5625C11.625 22.125 12 22.5 12.5625 22.5C13.125 22.5 13.5 22.125 13.5 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M18.375 21.5625V12.1875C18.375 11.625 17.8125 11.25 17.25 11.25C16.6875 11.25 16.5 11.625 16.5 12.1875V21.5625C16.5 22.125 16.875 22.5 17.25 22.5C17.625 22.5 18.375 22.125 18.375 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M24.375 7.5H19.6875V6.1875C19.6875 4.875 18.5625 3.75 17.25 3.75H12.75C11.4375 3.75 10.3125 4.875 10.3125 6.1875V7.5H5.625C5.0625 7.5 4.6875 7.875 4.6875 8.4375C4.6875 9 5.0625 9.375 5.625 9.375H24.375C24.9375 9.375 25.3125 9 25.3125 8.4375C25.3125 7.875 24.9375 7.5 24.375 7.5ZM12.1875 6.1875C12.1875 5.8125 12.375 5.625 12.75 5.625H17.25C17.625 5.625 17.8125 5.8125 17.8125 6.1875V7.5H12.1875V6.1875Z" fill="#263238" fill-opacity="0.77"/>
</svg>  </button>
</td>

                            </tr>
                            <tr >
                              <td className="table_heading_secction">Date of Birth</td>
                              <td className="table_description tabltd">
                                {row.dob}</td>
                            </tr> 
                            <tr >
                              <td className="table_heading_secction">State</td>
                              <td className="table_description tabltd">
                                {row.licenseState}</td>
                            </tr> 
                            <tr >
                              <td className="table_heading_secction">License Number</td>
                              <td className="table_description tabltd">
                                {row.licenseNumber}</td>
                            </tr> 
                            <tr >
                              <td className="table_heading_secction"> CDL/Non-CDL</td>
                              <td className="table_description tabltd">
                                {row.selectedValue}</td>
                            </tr> 
                            
                          </table>
                        </>
                      )
                    })
                  }
                </div>
              )}

              <button className="Driver_button justify-content-center mt-3" onClick={adddriver}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
                  <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                </svg>{' '}
                {vehicletable.length > 0 ? " Add another Driver" : " Add a Driver"}
              </button>
          
            </>
          )}
        </div>
        {isSectionVisible && (
          <div className="btn_position">
            <button className="back_button" onClick={() => handleNavigationClick("vehicles")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("vehicles")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={gotonext}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
        {!isSectionVisible && (
          <div className="after_press">
            <p className="question">A few  more questions about  Driver #{vehicletable.length + 1}</p>
            <form onSubmit={handleButtonClick}>
            <div className="row newdriver">
             
              <label className="col-sm-3 lableforinput" htmlFor="fullName">
                Name:
              </label>
              <div className='namepart col-sm-8'>
              <div className="fnam">
                <input type="text" className="form-control" id="fullName" placeholder="First Name" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} required/>
              </div>
              <div className="nmi">
                <input type="text" className="form-control" id="middleInitial" placeholder="MI" value={middleInitial} onChange={(e)=>{setMiddleInitial(e.target.value)}}/>
              </div>
              <div className="lnam">
                <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
              </div>
              </div>
             
              </div>
            <div className="row align-items-center">
            <div class="row newdriver align-items-end">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Date of Birth:</label>
  <div class="col-sm-8">
    <input type="date" class="form-control"
     style={{
      color: dob !== '' ? 'black' : 'grey',
    }}
    value={dob} onChange={(e)=>{setDob(e.target.value)}}   
     required/>
  </div>

</div>
<div class="row newdriver align-items-center">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Driver’s License State:</label>
  <div class="col-sm-8">
  <Select
      options={stateOptions}
      styles={customStyles}
      onChange={handleProtect}
      required
    />
  </div>

</div>
<div class="row newdriver align-items-center">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">License Number:</label>
  <div class="col-sm-8">
 
    <input type="text" class="form-control " value={licenseNumber} onChange={(e)=>{setLicenseNumber(e.target.value)}}  placeholder="FRB34JU80005" required/>
  </div>

</div>
<div className="row newdriver">
              <div className="col-md-3 lableforinput">
              CDL:    
              </div>
              <div className="col-md-7 vehicle_typeans">
   
      <StyledRadio
   checked={selectedValue === 'Yes'}
  onChange={() => handleRadioChange('Yes')}
  value="Yes"
  name="radio-buttons"
  className="inputfield "
  required
/>
<label className="loanlbl" htmlFor="age1">Yes</label>

<StyledRadio
   checked={selectedValue === 'No'}
  onChange={() => handleRadioChange('No')}
  value="No"
  name="radio-buttons"
  className="inputfield mx-2"
/>
<label className="loanlbl" htmlFor="age2">No</label>
    </div>
            </div>
{
  selectedValue === "Yes" ?(
    <> 
     <div className="row align-items-center newdriver">
      <label htmlFor="colFormLabelLg" className="col-sm-3 lableforinput">CDL Experience:</label>
      <div className="col-sm-2 cdlexp">
        <input type="text" className="form-control" value={expyear} onChange={(e) => { setExpyear(e.target.value) }} placeholder="Year" />
      </div>
      <div className="col-sm-2">
        <input type="text" className="form-control" value={expmonth} onChange={(e) => { setExpmonth(e.target.value) }} placeholder="Month" />
      </div>
    </div>  
    </>
  ):(
    <>
    
    </>
  )
}
 
            </div>
       









            <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("vehicles")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("vehicles")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={handleButtonClick}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          </form> </div>
          
        )}
      </div>
      <Modal
        title="Confirm Deletion"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { background: '#2a4764', color: 'white' } }}

      >
        <p>Are you sure you want to remove this driver?</p>
      </Modal>
    </>
  );
}

export default DriversPage;
