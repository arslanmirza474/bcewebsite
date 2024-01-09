import { useEffect, useState } from "react"
import "./coverage.css"
import trucker from "./images/finall.png"
import truck2 from "./images/Rectangle 346270202.png"
import truck3 from "./images/Rectangle 346270212.png"
import truck4 from "./images/Rectangle 346270222.png"
import truck5 from "./images/Rectangle 346270232.png"
import unknown from "./images/unknown.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Select from 'react-select';
import { notification } from "antd"
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
    fontSize: '20px',
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
function CoveragesPage({ changeIcon,handleNavigationClick }){
    const [bolidly, setBolidly]=useState(true)
    const [uninsured, setUninsured]=useState("")
    const[bodilyinsurance,setBodilyinsurance]=useState("")
    const[nontrucking,setNontrucking]=useState("")
    const[personpro,setPersonpro]=useState("")
    const[motortruck,setMotortruck]=useState("")
    const[trailerinter,setTrailerinter]=useState("")
    const[general,setGeneral]=useState("")
    const[damage,setDamage]=useState("1000")
    const [vehicletable, setVehicletable] = useState([])
    const [informId, setInformId] = useState("")
const navigate = useNavigate()

    const postData = () => {
      if ( !bodilyinsurance || !personpro) {
        openNotification("error", `Please fill in the following required fields`);
        return;
      }
          const data = {
            informId,
        uninsured,
        bodilyinsurance,
        nontrucking,
        personpro,
        motortruck,
        trailerinter,
        general,
        damage,
      };
    
      // Make an axios call to post the data
      axios.post('https://serverforbce.vercel.app/api/postcoverage', data)
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          axios.post("https://serverforbce.vercel.app/api/notify-quote",{
            informId
          })
          navigate("/done")
          localStorage.removeItem("mainid")
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    };

    const openNotification = (type, message,) => {
      notification[type]({
        message,
      });
    };
const instead =()=>{
  setBolidly(!bolidly)
}

const handleComprehensiveChange = (vehicleId, selectedOption) => {
  if (selectedOption) {
    const selectedValue = selectedOption.value;
    updatecomprehensive(vehicleId, selectedValue);
  }
};

// Function to make axios call and update coverage value in the database
const updateCoverageValue = (vehicleId, value) => {
  // Make axios call to update the database
  axios.put(`https://serverforbce.vercel.app/api/putvehicle/${vehicleId}`, {
    collision: value,
  })
      .then((response) => {
          console.log("Coverage value updated successfully");
      })
      .catch((error) => {
          console.error('Error updating coverage value:', error);
      });
};
const handleCollisionChange = (vehicleId, selectedOption) => {
  if (selectedOption) {
    const selectedValue = selectedOption.value;
  updateCoverageValue(vehicleId, selectedValue);}
};
const updatecomprehensive = (vehicleId, value) => {
  // Make axios call to update the database
  axios.put(`https://serverforbce.vercel.app/api/putvehicle/${vehicleId}`, {
    comprehensive: value,
  })
      .then((response) => {
          console.log("comprehensive value updated successfully");
      })
      .catch((error) => {
          console.error('Error updating coverage value:', error);
      });
};







useEffect(() => {
  const informationId = localStorage.getItem("mainid");
  if (informationId) {
    setInformId(informationId);
  }
}, []);

useEffect(() => {
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
  
}, [informId]);


const options = [
  { value: '$300,000 CSL', label: '$300,000 CSL' },
  { value: '$750,000 CSL', label: '$750,000 CSL' },
  { value: '$1,000,000 CSL', label: '$1,000,000 CSL' },
  { value: '$2,000,000 CSL', label: '$2,000,000 CSL' },
];
const nontruck = [
  { value: '$300,000 CSL', label: '$300,000 CSL' },
  { value: '$750,000 CSL', label: '$750,000 CSL' },
  { value: '$1,000,000 CSL', label: '$1,000,000 CSL' },
  { value: '$2,000,000 CSL', label: '$2,000,000 CSL' },
];
const handletrucking= (selectedOption) => {
  setBodilyinsurance(selectedOption.value);

};
const handleChange = (selectedOption) => {
  setUninsured(selectedOption.value);

};

const insured = [
  { value: '$100k', label: '$100k' },
  { value: '$85k', label: '$85k' },
  { value: '$60k', label: '$60k' },

];

const handleinsured = (selectedOption) => {
  setBodilyinsurance(selectedOption.value);

  // Use selectedOption instead of selectedValue
  if (selectedOption.value === "$100k") {
    setDamage("1000");
  } else if (selectedOption.value === "$85k") {
    setDamage("500");
  } else if (selectedOption.value === "$60k") {
    setDamage("250");
  }
};
const protect = [
  { value: '2500', label: '2500' },
  { value: '2500 guest pip', label: '2500 guest pip' },
];
const handleprotect= (selectedOption) => {
  setPersonpro(selectedOption.value);

};



const motortruckOptions = [
  { value: 'Not Selected', label: 'Not Selected' },
  { value: '$ 50,000', label: '$ 50,000' },
  { value: '$ 100,000', label: '$ 100,000' },
  { value: '$ 150,000', label: '$ 150,000' },
  { value: '$ 200,000', label: '$ 200,000' },
  { value: '$ 300,000', label: '$ 300,000' },
];

const trailerinterOptions = [
  { value: 'Not Selected', label: 'Not Selected' },
  { value: '$ 20k', label: '$ 20k' },
  { value: '$ 30k', label: '$ 30k' },
  { value: '$ 40k', label: '$ 40k' },
  { value: '$ 50k', label: '$ 50k' },
  { value: '$ 60k', label: '$ 60k' },
  { value: '$ 70k', label: '$ 70k' },
];

const generalOptions = [
  { value: 'Not Selected', label: 'Not Selected' },
  { value: '$ 1,000,000/1,000,000', label: '$ 1,000,000/1,000,000' },
  { value: '$ 1,000,000/2,000,000', label: '$ 1,000,000/2,000,000' },
];
const Compre = [
  { value: 'Not Selected', label: 'Not Selected' },
  { value: '$ 1,000 Deductible', label: '$ 1,000 Deductible' },
  { value: '$ 2,500 Deductible', label: '$ 2,500 Deductible' },
  { value: '$ 5,000 Deductible', label: '$ 5,000 Deductible' },

];


return(
        <>
         <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">5</span><span className="outof">/5</span></span>
            <span className="Page_Name" onClick={()=>{handleNavigationClick("about")}}>About Business</span>
           
        </div>
        <div className="next-page">
            <span className="next-step"></span>
            <span className="vehicles"></span>

        </div>
       </div>
       </div>

 <div className="coverage_first">
        <div className="coverage_heading">
        Coverages applied to all vehicles
        </div>

        {
          bolidly?(
            <>
              <div className="row bluediv align-items-center">
        <div className="col-md-4">
        Bodily injury and Property Damage Liability
          </div>
          <div className="col-md-5 ">
          <Select
        options={options}
        onChange={handleChange}
        styles={customStyles}
      />


          </div>
        </div>
        <div className="mt-3">
        <div className="underlinetext" onClick={instead}>Add Non-Trucking Liability instead?</div>




        
        </div>

            </>
          ):(
            <>
              <div className="row bluediv align-items-center">
        <div className="col-md-4">
        Non-Trucking Liability 
        Bodily injury and Property Damage Liability
          </div>
          <div className="col-md-5">
          <Select
        options={nontruck}
        styles={customStyles}
        onChange={handletrucking}
      />
          

          </div>
        </div>
        <div className="mt-3">
        <div className="underlinetext" onClick={instead}>Add Bodily injury and Property Damage Liability instead?</div>

        </div>
            </>
          )
        }
      
      <div className="row bluediv2 align-items-center">
  <div className="col-md-4">
    Uninsured/underinsured Motorist Bodily injury*
  </div>
  <div className="col-md-5">
  <Select
        options={insured}
        styles={customStyles}
        onChange={handleinsured}
      />
  </div>
</div>

<div className="row bluediv3 align-items-center">
  <div className="col-md-4">
    Uninsured Motorist Property<br></br> Damage*
  </div>
  <div className="col-md-5">
    Included in UM/UIM BI CSL w/${damage} Deductible
  </div>
</div>
        <div className="row bluediv2 align-items-center">
        <div className="col-md-4">
        Personal injury Protection?
          </div>
          <div className="col-md-5">
          <Select
        options={protect}
        styles={customStyles}
        onChange={handleprotect}
      />
          

          </div>
        </div>
     </div>
     <div className="Insurance_type">
      <div className="coverage_heading">Special Coverages related to the Customer’s Business</div>

      <div className="row bluediv2 align-items-center">
        <div className="col-md-3 d-flex jus moto-truck-cargo-txt">
          Motor Truck Cargo
          <div className="circle2">
            <i className="fa-solid fa-question" style={{ color: "white" }}></i>
          </div>
        </div>
        <div className="col-md-5 smalinput">
          <Select
            value={motortruckOptions.find(option => option.value === motortruck)}
              onChange={(selectedOption) => setMotortruck(selectedOption.value)}
            options={motortruckOptions}
            styles={customStyles}
          />
        </div>
      </div>

      <div className="row mt-4 trailer-small-screen">
        <div className="col-md-3 jus d-flex minustext align-items-center">
          Trailer Interchange
          <div className="circle2">
            <i className="fa-solid fa-question" style={{ color: "white" }}></i>
          </div>
        </div>
       
          <div className="col-md-5 smalinput">
            <Select
              value={trailerinterOptions.find(option => option.value === trailerinter)}
              onChange={(selectedOption) => setTrailerinter(selectedOption.value)}
              options={trailerinterOptions}
              styles={customStyles}
            />
          </div>
       
      </div>

      <div className="row bluediv2 align-items-center">
        <div className="col-md-3 jus d-flex gnrlliabtext">
          General Liability &nbsp;&nbsp;&nbsp;
          <div className="circle2">
            <i className="fa-solid fa-question" style={{ color: "white" }}></i>
          </div>
        </div>
        <div className="col-md-7">
          <Select
            value={generalOptions.find(option => option.value === general)}
              onChange={(selectedOption) => setGeneral(selectedOption.value)}
            options={generalOptions}
            styles={customStyles}
          />
        </div>
      </div>
    </div>
     {
  vehicletable.map((vehicle) => {
    // Assuming there is a selectedTruck property in the vehicle object
    const selectedTruck = vehicle.selectedTruck;

    // Create an object to map selectedTruck values to corresponding images
    const truckImages = {
      'Truck Tractor ': trucker,
      'Box Truck': truck2,
      'Pickup Truck': truck3,
      'Flatbed Truck': truck4,
      'Cargo Van': truck5,
      'Trailer': unknown,
      'Other/Not listed': unknown,
    };

    // Get the image source based on the selectedTruck value
    const truckImageSrc = truckImages[selectedTruck];
        return(
          <>
               <div className="vehicle_coverage">
     <div className="coverage_heading">
     Coverages for the vehicles
        </div>
        <div className="row truck_detail">
            <div className="col-md-4">
                <img src={truckImageSrc} alt="your truck" style={{borderRadius:"20px"}} width="100%"/>
            </div>
            <div className="col-md-5 ">
            <span className="detailing">{vehicle.year} {vehicle.make} {vehicle.model}</span><br></br>
                <span  className="detail" > {vehicle.Vin} </span><br></br>
            </div>
        </div>
        <div className="row bluediv2 align-items-center">
                <div className="col-md-4">
                    Comprehensive?
                </div>
                <div className="col-md-4">
                    {/* <select className="customer_slect" onChange={(e) =>handleComprehensiveChange(vehicle._id, e)}>
                        <option className="optionval">$ 1,000 Deductible</option>
                        <option className="optionval">$ 2,500 Deductible</option>
                        <option className="optionval">$ 5,000 Deductible</option>
                    </select> */}
                   <Select
  onChange={(selectedOption) => handleComprehensiveChange(vehicle._id, selectedOption)}
  options={Compre}
  styles={customStyles}
/>

                </div>
            </div>
            <div className="row bluediv3 align-items-center">
                <div className="col-md-4">
                    Collision?
                </div>
                <div className="col-md-4">
 
  <Select
  onChange={(selectedOption) => handleCollisionChange(vehicle._id, selectedOption)}
  options={Compre}
  styles={customStyles}
/>
</div>
            </div>
        <div className="row bluediv4 align-items-center">
        <div className="col-md-4">
        If this vehicle was sold today,how much would it be worth (excluding any permanent attached equipment)?
          </div>
          <div className="col-md-5">
           

          <span  className="detail" > {vehicle.vehicleWorth} </span><br></br>

          </div>
          
        </div>
     </div>
          </>
        )
      })
     }

     <div className="last_btns">
     <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("about")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("about")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={postData}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
     </div>
</>

    
    )
}
export default CoveragesPage