import { useEffect, useState } from "react";
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/Rectangle 34627020.png"
import truck3 from "./images/Rectangle 34627021.png"
import truck4 from "./images/Rectangle 34627022.png"
import truck5 from "./images/Rectangle 34627023.png"
import unknown from "./images/unknown.png"
import Modals from "./Modal"
import "./Table.css"
import { Modal,Skeleton } from 'antd';
import {notification } from 'antd';
import { Modal as AntModal } from 'antd';
import Select from 'react-select';
import axios from "axios";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import deleteimg from "./images/delete-103 1.png"
import updateimg from "./images/edit-246 1.png"

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
function VehiclesPage({ changeIcon, handleNavigationClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [needCoverage, setNeedCoverage] = useState('');
  const [vehicleWorth, setVehicleWorth] = useState('');
  const [vehicalby, setVehicalby] = useState("VIN")
  const [Vin, setVin] = useState("")
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [vehicletable, setVehicletable] = useState([])
  const [informId, setInformId] = useState("")
  const[updatevehicle,setUpdatevehicle]=useState(false)
  const[vehicleid,setVehicleid]=useState("")
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [loading,setLoading]=useState(false)
  const [vinresponse,setVinresponse]=useState("")
  const [loader, setLoader]=useState(true)
  useEffect(()=>{
   const code = localStorage.getItem("zipCode")
if(code){
  setZipCode(code)
}
  },[])
  const openNewModal = () => {
    setNewModalVisible(true);
  };
  
  const closeNewModal = () => {
    setVin("")
    setNewModalVisible(false);
  };
  const doneNewModal = () => {
    setNewModalVisible(false);
    openNotification('success', 'Vin Added Successfully');

  };
  
  const handleRadio = (event) => {
    setVehicalby(event.target.value);
  };

  const lookupvinnumber = (e) => {
    // Set loading to true when the function starts
e.preventDefault()
    setLoading(true);
    openNewModal()
    // Perform the API request
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${Vin}?format=json`)
      .then(res => {
        // Handle the response data
        setMake(res.data.Results[7].Value);
        setYear(res.data.Results[10].Value);
        setModel(res.data.Results[9].Value);
        setVinresponse(res.data.Results)
      })
      .catch(error => {
        // Handle errors if needed
        console.error('Error fetching VIN information:', error);
      })
      .finally(() => {
        // Set loading to false when the request completes (either success or failure)
        setLoading(false);
      });
  };
  

  const handleCoverage = (event) => {
    setNeedCoverage(event.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
const gotonext =()=>{
  if(vehicletable.length > 0){
    changeIcon('fa-regular fa-circle-check green-icon');
  handleNavigationClick('drivers');
  }else{
    openNotification('error', 'Please add atleast one vehicle');

  }
  
}
  const truckData = [
    { title: 'Truck Tractor ', image: truck },
    { title: 'Box Truck', image: truck2 },
    { title: 'Pickup Truck', image: truck3 },
    { title: 'Flatbed Truck', image: truck4 },
    { title: 'Cargo Van', image: truck5 },
    { title: 'Trailer', image: unknown },
    { title: 'Other/ Not listed', image: unknown },
  ];
  const handleTruckClick = (title) => {
    setSelectedTruck(title);
  };
  const isTruckSelected = (title) => {
    return selectedTruck === title;
  };
  useEffect(() => {
    const informationId = localStorage.getItem("mainid");
    if (informationId) {
      setInformId(informationId);
    }
  }, []);

  useEffect(() => {
    fetchvehicle()
  }, [informId]);
const fetchvehicle =()=>{
  if (informId) {
    axios.get(`https://serverforbce.vercel.app/api/getvehicalbyinforid/${informId}`)
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

const [modalVisible, setModalVisible] = useState(false);
const [deleteId, setDeleteId] = useState(null);

const handleDelete = async (id) => {
  setDeleteId(id);
  setModalVisible(true);
};
const handleModalCancel = () => {
  setModalVisible(false);
  setDeleteId(null);
};
const handleModalOk = async () => {
  try {
    const response = await axios.delete(`https://serverforbce.vercel.app/api/deletebyid/${deleteId}`);
    
    if (response.data.status === true) {
      // Remove the deleted vehicle from the table
      setVehicletable(prevTable => prevTable.filter(row => row._id !== deleteId));
      openNotification('success', 'Vehicle Deleted Successfully');

    } else {
      console.error('Error deleting vehicle:', response.data.error);
      // Handle the error, e.g., display an error message to the user
      openNotification('error', 'Error Deleting Vehicle', response.data.error);
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    // Handle the error, e.g., display an error message to the user
    openNotification('error', 'Error Deleting Vehicle',"Any unexpected Error Occur");
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
  const handleEdit = (vehicle) => {
    setUpdatevehicle(true)   
    setIsConfirmed(true);
    setVehicleid(vehicle._id)
    setSelectedTruck(vehicle.selectedTruck);
    setZipCode(vehicle.zipCode);
    setDistance(vehicle.distance);
    setNeedCoverage(vehicle.needCoverage);
    setVehicleWorth(vehicle.vehicleWorth);
    setVehicalby(vehicle.vehicalby);
    setVin(vehicle.Vin);
    setYear(vehicle.year);
    setMake(vehicle.make);
    setModel(vehicle.model);
  
    // Set any other fields you have in your modal
    setIsModalOpen(true);
  };
  
  const handleButtonClick = () => {
    setLoader(false);
  
    // Declare postData before using it
    let postData = {
      informId,
      selectedTruck,
      zipCode,
      distance,
      needCoverage,
      vehicleWorth,
      vehicalby,
      year,
      make,
      model,
      Vin,
    };
  
    // Check if all fields are filled
    const requiredFields = ["selectedTruck", "zipCode", "distance", "needCoverage", "vehicleWorth", "vehicalby", "Vin"];
    const missingFields = requiredFields.filter(field => !postData[field]);
  
    if (missingFields.length > 0) {
      openNotification('error', `Please fill in the following fields before continuing`);
      setLoader(true);
      return;
    }
  
    const url = updatevehicle ? `https://serverforbce.vercel.app/api/putvehicle/${vehicleid}` : "https://serverforbce.vercel.app/api/postvehicle";
    const axiosMethod = updatevehicle ? axios.put : axios.post;
  
    axiosMethod(url, postData)
      .then(res => {
        if (res.status === 200 && res.data.status === true) {
          setIsConfirmed(false);
          fetchvehicle();
          setUpdatevehicle(false)
          openNotification('success', informId ? `Vehicle Updated Successfully` : `Vehicle Added Successfully`);
          // Clear the form fields
          setVehicleid("");
          setSelectedTruck("");
          setZipCode("");
          setDistance("");
          setNeedCoverage("");
          setVehicleWorth("");
          setVehicalby("");
          setVin("");
          setYear("");
          setMake("");
          setModel("");
        } else {
          console.error("Unexpected server response:", res);
          alert("Error while processing the request. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error during request:", error);
        alert("Error during request. Please try again.");
      })
      .finally(() => {
        setLoader(true);
      });
  };
  
  
  
  
  const formatNumberWithCommas = (value) => {
    // Remove existing commas and dollar sign
    const cleanedValue = value.replace(/[$,]/g, '');

    // Format the number with commas
    const formattedValue = Number(cleanedValue).toLocaleString();

    // Add dollar sign and return the result
    return `$ ${formattedValue}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Update the state with the formatted value
    setVehicleWorth(formatNumberWithCommas(inputValue));
  };
  const motortruckOptions = [
    { value: 'Not Selected', label: 'Not Selected' },
    { value: '100 Miles', label: '100 Miles' },
    { value: '300 Miles', label: '300 Miles' },
    { value: '500 Miles', label: '500 Miles' },
    { value: 'Unlimited', label: 'Unlimited' },
  ];
  return (
    <>
      <div className="small-screen-header">
        <div className="Start_Nav d-flex">
          <div className="Page_Position gap-2 d-flex  align-items-center">

            <span className="circle_position"><span className="first_name">2</span><span className="outof">/5</span></span>
            <span className="Page_Name">Vehicles</span>

          </div>
          <div className="next-page">
            <span className="next-step">Next step</span>
            <span className="vehicles" onClick={() => { handleNavigationClick("drivers") }}>Drivers</span>

          </div>
        </div>
      </div>
      {
        !isConfirmed ? (

          <div className="Driver_container">
            <div className="before_press">
              <p className="Device_information">Vehicle/Trailer Information</p>
              <p className="comontext">
                Please select one of these vehicles/trailers used in your business <br></br>
                <span className="dimtext">(Choose Other/Not Listed for more Options)</span>
              </p>
              {vehicletable.length > 0 && (
        <table className='main_table mt-1 mb-5'>
          <thead className='table_header'>
            <tr>
              <th></th>
              <th >Vehicle</th>
              <th>Comp</th>
              <th>Coll</th>
              <th>VIN#</th>
              <th >Stated Amt</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {vehicletable.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}.</td>
                <td >
                {row.year} {row.make} {row.model} 
                </td>
                <td>{row.needCoverage}</td>
                <td>{row.needCoverage}</td>
                <td>{row.Vin}</td>
                <td className="d-flex align-items-center ">
                  {row.vehicleWorth}
                  <div style={{marginLeft:"auto"}}>
                  <button className="btn" style={{padding:"0px"}} onClick={() => handleEdit(row)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M24.4424 20.6748C24.4424 23.083 22.4854 25.04 20.0771 25.04H9.54785C7.13965 25.04 5.18262 23.083 5.18262 20.6748V10.1484C5.18262 7.74023 7.13965 5.7832 9.54785 5.7832H13.3506V4.53223H9.54785C6.45117 4.53223 3.93164 7.05176 3.93164 10.1484V20.6748C3.93164 23.7715 6.45117 26.291 9.54785 26.291H20.0742C23.1709 26.291 25.6904 23.7715 25.6904 20.6748V16.8721H24.4395V20.6748H24.4424Z" fill="#263238"/>
  <path d="M26.0655 4.78711C25.3946 4.11621 24.5128 3.7793 23.631 3.7793C22.7491 3.7793 21.8702 4.11621 21.1964 4.78711L9.14072 16.8428C8.64561 17.3379 8.32334 17.9795 8.22666 18.6738L7.67002 22.5645C7.62315 22.8984 7.88389 23.1885 8.20908 23.1885C8.23545 23.1885 8.26182 23.1855 8.28818 23.1826L12.1788 22.626C12.8731 22.5264 13.5147 22.207 14.0099 21.7119L26.0655 9.65625C27.4103 8.31152 27.4103 6.13184 26.0655 4.78711ZM10.6056 17.1475L20.8097 6.94336L23.9063 10.043L13.7052 20.2471L10.6056 17.1475ZM12.003 21.3867L9.04111 21.8086L9.46299 18.8467C9.50401 18.5684 9.60361 18.2988 9.75303 18.0645L12.7823 21.0938C12.548 21.2461 12.2813 21.3486 12.003 21.3867ZM25.1808 8.76855L24.7911 9.1582L21.6944 6.05859L22.0841 5.66895C22.4972 5.25586 23.048 5.02734 23.6339 5.02734C24.2198 5.02734 24.7706 5.25586 25.1837 5.66895C26.0362 6.52441 26.0362 7.91602 25.1808 8.76855Z" fill="#263238"/>
</svg>
</button>
<button className="btn" style={{padding:"0px"}}  onClick={() => handleDelete(row._id)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M22.5 11.25C21.9375 11.25 21.5625 11.625 21.5625 12.1875V23.25C21.5625 24 21 24.375 20.4375 24.375H9.5625C8.8125 24.375 8.4375 23.8125 8.4375 23.25V12.1875C8.4375 11.625 8.0625 11.25 7.5 11.25C6.9375 11.25 6.5625 11.625 6.5625 12.1875V23.25C6.5625 24.9375 7.875 26.25 9.5625 26.25H20.25C21.9375 26.25 23.25 24.9375 23.25 23.25V12.1875C23.4375 11.625 23.0625 11.25 22.5 11.25Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M13.5 21.5625V12.1875C13.5 11.625 13.125 11.25 12.75 11.25C12.375 11.25 11.625 11.625 11.625 12.1875V21.5625C11.625 22.125 12 22.5 12.5625 22.5C13.125 22.5 13.5 22.125 13.5 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M18.375 21.5625V12.1875C18.375 11.625 17.8125 11.25 17.25 11.25C16.6875 11.25 16.5 11.625 16.5 12.1875V21.5625C16.5 22.125 16.875 22.5 17.25 22.5C17.625 22.5 18.375 22.125 18.375 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M24.375 7.5H19.6875V6.1875C19.6875 4.875 18.5625 3.75 17.25 3.75H12.75C11.4375 3.75 10.3125 4.875 10.3125 6.1875V7.5H5.625C5.0625 7.5 4.6875 7.875 4.6875 8.4375C4.6875 9 5.0625 9.375 5.625 9.375H24.375C24.9375 9.375 25.3125 9 25.3125 8.4375C25.3125 7.875 24.9375 7.5 24.375 7.5ZM12.1875 6.1875C12.1875 5.8125 12.375 5.625 12.75 5.625H17.25C17.625 5.625 17.8125 5.8125 17.8125 6.1875V7.5H12.1875V6.1875Z" fill="#263238" fill-opacity="0.77"/>
</svg>
</button>
                  </div>
                </td>
                
              </tr>
            ))}
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
                            <tr style={{borderBottom:"1px solid black"}}>
                              <td >{row.year} {row.make} {row.model} </td>
                              <td className="d-flex justify-content-end">  <button className="btn" style={{padding:"0px"}}  onClick={() => handleEdit(row)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M24.4424 20.6748C24.4424 23.083 22.4854 25.04 20.0771 25.04H9.54785C7.13965 25.04 5.18262 23.083 5.18262 20.6748V10.1484C5.18262 7.74023 7.13965 5.7832 9.54785 5.7832H13.3506V4.53223H9.54785C6.45117 4.53223 3.93164 7.05176 3.93164 10.1484V20.6748C3.93164 23.7715 6.45117 26.291 9.54785 26.291H20.0742C23.1709 26.291 25.6904 23.7715 25.6904 20.6748V16.8721H24.4395V20.6748H24.4424Z" fill="#263238"/>
  <path d="M26.0655 4.78711C25.3946 4.11621 24.5128 3.7793 23.631 3.7793C22.7491 3.7793 21.8702 4.11621 21.1964 4.78711L9.14072 16.8428C8.64561 17.3379 8.32334 17.9795 8.22666 18.6738L7.67002 22.5645C7.62315 22.8984 7.88389 23.1885 8.20908 23.1885C8.23545 23.1885 8.26182 23.1855 8.28818 23.1826L12.1788 22.626C12.8731 22.5264 13.5147 22.207 14.0099 21.7119L26.0655 9.65625C27.4103 8.31152 27.4103 6.13184 26.0655 4.78711ZM10.6056 17.1475L20.8097 6.94336L23.9063 10.043L13.7052 20.2471L10.6056 17.1475ZM12.003 21.3867L9.04111 21.8086L9.46299 18.8467C9.50401 18.5684 9.60361 18.2988 9.75303 18.0645L12.7823 21.0938C12.548 21.2461 12.2813 21.3486 12.003 21.3867ZM25.1808 8.76855L24.7911 9.1582L21.6944 6.05859L22.0841 5.66895C22.4972 5.25586 23.048 5.02734 23.6339 5.02734C24.2198 5.02734 24.7706 5.25586 25.1837 5.66895C26.0362 6.52441 26.0362 7.91602 25.1808 8.76855Z" fill="#263238"/>
</svg>   
</button>
<button className="btn" style={{padding:"0px"}}  onClick={() => handleDelete(row._id)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M22.5 11.25C21.9375 11.25 21.5625 11.625 21.5625 12.1875V23.25C21.5625 24 21 24.375 20.4375 24.375H9.5625C8.8125 24.375 8.4375 23.8125 8.4375 23.25V12.1875C8.4375 11.625 8.0625 11.25 7.5 11.25C6.9375 11.25 6.5625 11.625 6.5625 12.1875V23.25C6.5625 24.9375 7.875 26.25 9.5625 26.25H20.25C21.9375 26.25 23.25 24.9375 23.25 23.25V12.1875C23.4375 11.625 23.0625 11.25 22.5 11.25Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M13.5 21.5625V12.1875C13.5 11.625 13.125 11.25 12.75 11.25C12.375 11.25 11.625 11.625 11.625 12.1875V21.5625C11.625 22.125 12 22.5 12.5625 22.5C13.125 22.5 13.5 22.125 13.5 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M18.375 21.5625V12.1875C18.375 11.625 17.8125 11.25 17.25 11.25C16.6875 11.25 16.5 11.625 16.5 12.1875V21.5625C16.5 22.125 16.875 22.5 17.25 22.5C17.625 22.5 18.375 22.125 18.375 21.5625Z" fill="#263238" fill-opacity="0.77"/>
  <path d="M24.375 7.5H19.6875V6.1875C19.6875 4.875 18.5625 3.75 17.25 3.75H12.75C11.4375 3.75 10.3125 4.875 10.3125 6.1875V7.5H5.625C5.0625 7.5 4.6875 7.875 4.6875 8.4375C4.6875 9 5.0625 9.375 5.625 9.375H24.375C24.9375 9.375 25.3125 9 25.3125 8.4375C25.3125 7.875 24.9375 7.5 24.375 7.5ZM12.1875 6.1875C12.1875 5.8125 12.375 5.625 12.75 5.625H17.25C17.625 5.625 17.8125 5.8125 17.8125 6.1875V7.5H12.1875V6.1875Z" fill="#263238" fill-opacity="0.77"/>
</svg>
</button></td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Comp</td>
                              <td className="table_description">{row.needCoverage}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Coll</td>
                              <td className="table_description">{row.needCoverage}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Vin</td>
                              <td className="table_description">{row.Vin}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">StatedAmt</td>
                              <td className="table_description tabltd">
                                {row.vehicleWorth}</td>
                            </tr>
                          
                          </table>
                        </>
                      )
                    })
                  }
                </div>
              )}

              <button className="Driver_button justify-content-center mt-3" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
                  <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                </svg>{' '}
                {vehicletable.length > 0 ? " Add another Vehicle" : " Add a Vehicle"}
              </button>
            </div>

            <div className="btn_position">
              <button className="back_button" onClick={() => handleNavigationClick("start")}>
                {' '}
                Back &nbsp;&nbsp;
              </button>
              <button className="small-screen" onClick={() => handleNavigationClick("start")}>
                {' '}
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <button className="continous_button" onClick={gotonext}>
              Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="add_vehicle">
<form onSubmit={handleButtonClick}>
            <div className="row vehicltyp">
              <div className="col-md-3 vehicle_type">
                Vehicle Type
              </div>
              <div className="col-md-3 vehicle_typeans">
                {selectedTruck}
              </div>
            </div>
            <div className="row mt-3 vhclby">
              <div className="col-md-3 vehicle_type">
                Add Vehicle By
              </div>
              <div className="col-md-7 vehicle_typeans">

         
<StyledRadio
  name="radiobtn"
  value="VIN"
  checked={vehicalby === 'VIN'}
  onChange={handleRadio}
  className="mx-2 inputfield"
/>


                <label className="vnloanlbl" htmlFor="age2">VIN</label>

              </div>
            </div>

            <div className="textcon mt-5">
              Vehicle Identification Number(VIN)
            </div>
            <div className="row mt-2 lookupvin">
              <div className="col-md-4 vintxt">
                <input className="text_input  px-2 inputflds" value={Vin} onChange={(e) => { setVin(e.target.value) }} type="text" required/>
              </div>
              <div className="col-md-3">
                <button className="btn_vin" style={{border:"none"}} onClick={lookupvinnumber}>
                  Lookup VIN
                </button>
              </div>
            </div>


            <div className="tip_content mt-3">
              <span className="tips">Tips:</span><br></br>
              <span className="all_tip">
                Every VIN has 17 alpha/numeric characters<br></br>
                The letter I,O,and Q are never used.<br></br>
                At least 6 character are numeric.<br></br>
                Common typing mistake are B for 8,S for 5,0 for 0 1 for i or vice versa<br></br>
              </span>
            </div>
            <div className="row mt-5 align-items-center">
              <div className="col-md-5 inputfieldrow">
                Zip Code where the vehicle is located?
              </div>
              <div className="col-md-4">
                <input className="text_input px-3 inputflds" value={zipCode} onChange={(e) => { setZipCode(e.target.value) }} placeholder="20744" type="text" />
              </div>
            </div>
            <div className="row mt-5 ">
              <div className="col-md-4 inputfieldrow">
                Farthest one-way distance this vehicle typically travels(90% or more of the <br></br> time)
              </div>
              <div className="col-md-4">
              <Select
  value={motortruckOptions.find(option => option.value === distance)}
  onChange={(selectedOption) => setDistance(selectedOption.value)}
  options={motortruckOptions}
  styles={customStyles}
  required
/>


              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 inputfieldrow">
              Do you need comprehensive or collision coverage to protect this vehicle in an accident or loss?
              </div>
              <div className="col-md-7 inputflds vehicle_typeans ">

              <StyledRadio
  checked={needCoverage === 'Yes'}
  onChange={handleCoverage}
  value="Yes"
  name="radio-buttons"
  className="inputfield "
/>
<label className="loanlbl" htmlFor="age1">Yes</label>

<StyledRadio
  checked={needCoverage === 'No'}
  onChange={handleCoverage}
  value="No"
  name="radio-buttons"
  className="inputfield mx-2"
  required
/>
<label className="loanlbl" htmlFor="age2">No</label>

              </div>
            </div>



            <div className="heading_vehicle_add mt-5">
              Unit Value
            </div>

            <div className="row mt-5 align-items-center">
              <div className="col-md-4 inputfieldrow">
                If this vehicle was sold today,how much would it be worth?
              </div>
              <div className="col-md-4">
              <input
      className="text_input px-3 inputflds"
      value={vehicleWorth}
      placeholder="$45,000"
      type="text"
      onChange={handleInputChange}
      required
    />             </div>
            </div>

            <div className="btns_position">
              <button className="back_button" onClick={() => handleNavigationClick("start")}>
                {' '}
                Back &nbsp;&nbsp;
              </button>
              <button className="small-screen" onClick={() => handleNavigationClick("vehicles")}>
                {' '}
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <button className="continous_button" onClick={handleButtonClick} disabled={loader === false}>
  Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
</button>

            </div></form>
          </div>
        )
      }

      <Modals isOpen={isModalOpen} onClose={closeModal}>
        <div className="truck_wrap gap-4">
          {truckData.map((truck, index) => (
            <div key={index} className={`truck_border ${isTruckSelected(truck.title) ? 'selected' : ''}`} onClick={() => handleTruckClick(truck.title)}>
              <img src={truck.image} alt="truck" />
              <span className="card_title">{truck.title}</span>
              <div className="radio_button">
                {isTruckSelected(truck.title) ? <i className="fa-solid fa-circle-check green-icon green_check"></i> : <i className="fa-solid fa-circle green_check text-secondary"></i>}
              </div>
            </div>
          ))}

        </div>
        <div className="d-flex btn-postion mt-5">

          <button className="closebtn" onClick={closeModal}>Cancel</button>
          <button className="confirmbtn mx-3" onClick={handleConfirm}>Confirm</button>
        </div>


      </Modals>
      <Modal
        title="Confirm Deletion"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Are you sure you want to delete this vehicle?</p>
      </Modal>
      <AntModal
  title="Vin"
  open={isNewModalVisible}
  onOk={doneNewModal}
  onCancel={closeNewModal}
  width={650}
  okText="Done"
  okButtonProps={{ style: { background: '#2a4764', color: 'white' } }}
  >

 {
  loading ? (<>
  <Skeleton active />
  </>):(
    <div className="modal-contents">
      <div className="mainheading">
        {vinresponse[10]?.Value} {vinresponse[9]?.Value} {vinresponse[7]?.Value}
      </div>
      <div className="cont mt-4 "style={{ display: 'flex', gap: '10px',flexWrap:"wrap" }} >
           <div className="infoblock">
        <div className="title">
          Vin
        </div>
        <div className="value">
          {Vin}
        </div>
      </div>
       
           <div className="infoblock">
        <div className="title">
          Make
        </div>
        <div className="value">
          {vinresponse[7]?.Value}
        </div>
      </div>
           <div className="infoblock">
        <div className="title">
          Model
        </div>
        <div className="value">
        {vinresponse[9]?.Value}
        </div>
      </div>
      <div className="infoblock">
        <div className="title">
          Year
        </div>
        <div className="value">
        {vinresponse[10]?.Value}
        </div>
      </div><div className="infoblock">
        <div className="title">
          Driver Type
        </div>
        <div className="value">
        {vinresponse[51]?.Value}
        </div>
      </div><div className="infoblock">
        <div className="title">
        Manufactured in        </div>
        <div className="value">
        {vinresponse[8]?.Value}
        </div>
      </div>
      </div>
     

</div>
  )
 }

</AntModal>
    </>
  );
}

export default VehiclesPage;
