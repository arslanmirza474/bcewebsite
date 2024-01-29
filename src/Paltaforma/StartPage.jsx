import './StartPage.css'
import "./Start.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Skeleton, DatePicker } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { Modal,Input,notification } from 'antd';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';

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
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '9px',
    height: '51px',
    border: '1px solid rgba(0, 0, 0, 0.42)',
    boxShadow: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : 'none',
    color:"black",
    fontWeight:"450"
  }),
  menuList: (provided) => ({
    ...provided,
    overflowY: 'auto',
    maxHeight: '150px',
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





function StartPage({ changeIcon, handleNavigationClick }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [bussinesstype, setBussinesstype] = useState(null);
    const [fullname, setFullname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [lastname, setLastname] = useState("")
    const [suffix, setSuffix] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [dateofBirth, setDateofBirth] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [areaCode, setAreaCode] = useState('');
    const [middlePart, setMiddlePart] = useState('');
    const [lastPart, setLastPart] = useState('');
    const [loading, setLoading] = useState(false);
    const [appartment, setAppartment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const[usdotnum,setUsdotnum]=useState("")
    const[informId, setInformId]=useState(null)
    const[response, setResponse]=useState("")
    useEffect(() => {
      const informationId = localStorage.getItem("mainid");
      if (informationId && informId !== informationId) {
        setInformId(informationId);
      }
    }, [informId]);
  
    useEffect(() => {
      if (informId !== null) {
        fetchInformationById();
      }
    }, [informId]);
  
    const fetchInformationById = async () => {
      try {
        const res = await axios.get(`https://serverforbce.vercel.app/api/getinformationbyid/${informId}`);
        const data = res.data.data;
  
        // Update state variables with fetched data
        setResponse(data);
        setSelectedOption(data.selectedOption);
        setBussinesstype(data.bussinesstype);
        setFullname(data.fullname);
        setMiddlename(data.middlename);
        setLastname(data.lastname);
        setSuffix(data.suffix);
        setAddress(data.address);
        setZip(data.zip);
        setCity(data.city);
        setDateofBirth(data.dateofBirth);
  
        // Extract and set phone number parts
        if (data.phonenumber) {
          const phoneNumberParts = data.phonenumber.split('-');
          setAreaCode(phoneNumberParts[0]);
          setMiddlePart(phoneNumberParts[1]);
          setLastPart(phoneNumberParts[2]);
        }
  
        setAppartment(data.appartment);
        setUsdotnum(data.usdotnum);
      } catch (error) {
        console.error('Error fetching information by ID:', error);
      }
    };
  




    const handleModalCancel = () => {
             setModalVisible(false);
             setSelectedOption("")
             setUsdotnum("")
      };
      const handleModalOk = async (e) => {
        if(usdotnum != ""){
            setModalVisible(false);
            openNotification('success', 'USDOT is added Successfully');
       }else{
           openNotification('error', 'USDOT Input must be Filled');

       }
      };


      const openNotification = (type, message, description = '') => {
        notification[type]({
          message,
          description,
        });
      };
    const searchOptions = {
        componentRestrictions: { country: 'us' }, 
    };
    const handleSelect = async (value) => {
      try {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
    
        // Access city, state, and zip code from the first result
        const addressComponents = results[0].address_components;
    
        // Log address components for debugging
        console.log('Address Components:', addressComponents);
    
        // Try finding city, state, and zip code with alternative types
        const cityComponent = addressComponents.find(
          (component) => component.types.includes('locality')
        );
        const streetnum = addressComponents.find(
          (component) => component.types.includes("street_number")
        );
        const route = addressComponents.find(
          (component) => component.types.includes("route")
        );
    
        // Log streetnum and route for debugging
        console.log('Street Number Component:', streetnum);
        console.log('Route Component:', route);
    
        const stateComponent = addressComponents.find(
          (component) => component.types.includes('administrative_area_level_1')
        );
    
        const countryComponent = addressComponents.find(
          (component) => component.types.includes('country')
        );
    
        const zipCodeComponent = addressComponents.find(
          (component) =>
            component.types.includes('postal_code') ||
            component.types.includes('postal_code_suffix') ||
            component.types.includes('postal_code_prefix')
        );
    
        const streetAddress = results[0].formatted_address;
    
        const city = cityComponent ? cityComponent.long_name : '';
        const state = stateComponent ? stateComponent.long_name : '';
        const country = countryComponent ? countryComponent.long_name : '';
        const zipCode = zipCodeComponent ? zipCodeComponent.long_name : '';
    
       // Check if streetnum and route are objects with long_name property before setting address
if (streetnum && streetnum.long_name && route && route.long_name) {
  setAddress(`${streetnum.long_name} ${route.long_name}`);
} else {
  console.error('Street Number or Route is undefined or missing long_name property.');
}

    
        setCity(`${city}, ${state}`);
        setZip(zipCode);
    
      } catch (error) {
        console.error('Error selecting address:', error);
        // Handle the error (e.g., show a user-friendly message)
      }
    };
    
    
    
    
      
      
      
      
      let middlePartInput, lastPartInput;

      const handleInputChange = (e, nextInputRef) => {
        const inputValue = e.target.value;
        const maxLength = parseInt(e.target.maxLength, 11);
    
        if (inputValue.length <= maxLength) {
          if (nextInputRef && inputValue.length === maxLength) {
            nextInputRef.focus();
          }
    
          switch (e.target.name) {
            case 'areaCode':
              setAreaCode(inputValue);
              break;
            case 'middlePart':
              setMiddlePart(inputValue);
              break;
            case 'lastPart':
              setLastPart(inputValue);
              break;
            default:
              break;
          }
        }
      };
 
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Yes') {
            setModalVisible(true);
          } else {
            setModalVisible(false);
          }
    };
 
    const handleButtonClick = (e) => {
      
      e.preventDefault();
      if (areaCode.length !== 3 || middlePart.length !== 3 || lastPart.length !== 4) {
        openNotification("error", "Fill all the Blank");
        return;
    }
      setLoading(true);
      const requiredFields = [
          { name: 'selectedOption', label: 'USDOT#' },
          { name: 'bussinesstype', label: 'Business Type' },
          { name: 'fullname', label: 'First Name' },
          { name: 'lastname', label: 'Last Name' },
          { name: 'address', label: 'Address' },
          { name: 'zip', label: 'Zip Code' },
          { name: 'city', label: 'City' },
          { name: 'dateofBirth', label: 'Date of Birth' }
      ];
  
      const userData = {
          selectedOption,
          bussinesstype,
          fullname,
          middlename,
          lastname,
          suffix,
          address,
          zip,
          city,
          dateofBirth,
          phonenumber: `${areaCode}-${middlePart}-${lastPart}`,
          appartment,
          usdotnum
      };
  
      const missingFields = requiredFields.filter(field => !userData[field.name]);
  
      if (missingFields.length === 0) {
          if (informId != null) {
              axios.put(`https://serverforbce.vercel.app/api/putinformation/${informId}`, userData)
                  .then((res) => {
                      if (res.status === 200 && res.data.status === true) {
                          changeIcon("fa-regular fa-circle-check green-icon");
                          handleNavigationClick("vehicles");
                      } else {
                          console.error("Unexpected server response:", res);
                          alert("Error while processing the request. Please try again.");
                      }
                  })
                  .catch((error) => {
                      console.error("Error during request:", error);
                      alert("Error during request. Please try again.");
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          } else {
              axios.post("https://serverforbce.vercel.app/api/postinformation", userData)
                  .then((res) => {
                      if (res.status === 200 && res.data.status === true) {
                          localStorage.setItem("mainid", res.data.created._id);
                          localStorage.setItem("zipCode",zip)
                          changeIcon("fa-regular fa-circle-check green-icon");
                          handleNavigationClick("vehicles");
                      } else {
                          console.error("Unexpected server response:", res);
                          alert("Error while processing the request. Please try again.");
                      }
                  })
                  .catch((error) => {
                      console.error("Error during request:", error);
                      alert("Error during request. Please try again.");
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          }
      } else {
          // Display error alert with missing field names
          const missingFieldNames = missingFields.map(field => field.label).join(', ');
          openNotification("error", `Please fill in the following required fields: ${missingFieldNames}`);
          setLoading(false); // Ensure loading is set to false in case of an error
      }
  };
  
  
  

    

    
  const options = [
    { value: 'Auto hauler', label: 'Auto hauler' },
    { value: 'Passengers for hire', label: 'Passengers for hire' },
    { value: 'General freight hauler', label: 'General freight hauler' },
    { value: 'Towing', label: 'Towing' },
    { value: 'Salvage', label: 'Salvage' },
    { value: 'Sand and gravel', label: 'Sand and gravel' },
    { value: 'Sand', label: 'Sand' },
    { value: 'Asphalt hauler', label: 'Asphalt hauler' },
    { value: 'Fracking', label: 'Fracking' },
    { value: 'Contractors', label: 'Contractors' },
    { value: 'Building materials', label: 'Building materials' },
    { value: 'Household goods', label: 'Household goods' },
    {
      "value": "ADHC (Adult Day Health Center)",
      "label": "ADHC (Adult Day Health Center)"
    },
    {
      "value": "Agricultural Hauling (For A Fee)",
      "label": "Agricultural Hauling (For A Fee)"
    },
    {
      "value": "Amish Taxi",
      "label": "Amish Taxi"
    },
    {
      "value": "Animal Hospital",
      "label": "Animal Hospital"
    },
    {
      "value": "Animal Shelter",
      "label": "Animal Shelter"
    },
    {
      "value": "Antique Dealer/Shop",
      "label": "Antique Dealer/Shop"
    },
    {
      "value": "Apparel Wholesaler",
      "label": "Apparel Wholesaler"
    },
    {
      "value": "Architect",
      "label": "Architect"
    },
    {
      "value": "Architectural Services",
      "label": "Architectural Services"
    },
    {
      "value": "Asphalt Hauling",
      "label": "Asphalt Hauling"
    },
    {
      "value": "Asphalt Laying/Repair",
      "label": "Asphalt Laying/Repair"
    },
    {
      "value": "Athlete",
      "label": "Athlete"
    },
    {
      "value": "Athletic Organization",
      "label": "Athletic Organization"
    },
    {
      "value": "Auction Hauler",
      "label": "Auction Hauler"
    },
    {
      "value": "Auction House",
      "label": "Auction House"
    },
    {
      "value": "Author",
      "label": "Author"
    },
    {
      "value": "Auto Body Shop",
      "label": "Auto Body Shop"
    },
    {
      "value": "Auto Hauler",
      "label": "Auto Hauler"
    },
    {
      "value": "Auto Hauler (For Hire Trucking)",
      "label": "Auto Hauler (For Hire Trucking)"
    },
    {
      "value": "Auto Paint Shop",
      "label": "Auto Paint Shop"
    },
    {
      "value": "Auto Repair (Mechanical)",
      "label": "Auto Repair (Mechanical)"
    },
    {
      "value": "Auto Salvage Hauler",
      "label": "Auto Salvage Hauler"
    },
    {
      "value": "Aviation School",
      "label": "Aviation School"
    },
    {
      "value": "Backhoe Services",
      "label": "Backhoe Services"
    },
    {
      "value": "Bagel Shop",
      "label": "Bagel Shop"
    },
    {
      "value": "Banquet Hall",
      "label": "Banquet Hall"
    },
    {
      "value": "Barber School",
      "label": "Barber School"
    },
    {
      "value": "Barber Shop",
      "label": "Barber Shop"
    },
    {
      "value": "Bartending School",
      "label": "Bartending School"
    },
    {
      "value": "Bathroom Remodeling",
      "label": "Bathroom Remodeling"
    },
    {
      "value": "Beauty School",
      "label": "Beauty School"
    },
    {
      "value": "Bicycle Shop",
      "label": "Bicycle Shop"
    },
    {
      "value": "Billiard Hall",
      "label": "Billiard Hall"
    },
    {
      "value": "Boarding House/School",
      "label": "Boarding House/School"
    },
    {
      "value": "Boat Charter",
      "label": "Boat Charter"
    },
    {
      "value": "Body Shop (Auto)",
      "label": "Body Shop (Auto)"
    },
    {
      "value": "Book Publisher",
      "label": "Book Publisher"
    },
    {
      "value": "Brake Repair Shop",
      "label": "Brake Repair Shop"
    },
    {
      "value": "Bridal Shop",
      "label": "Bridal Shop"
    },
    {
      "value": "Building Materials Supply (Wholesale)",
      "label": "Building Materials Supply (Wholesale)"
    },
    {
      "value": "Bulk Water Hauler",
      "label": "Bulk Water Hauler"
    },
    {
      "value": "Business School",
      "label": "Business School"
    },
    {
      "value": "Butcher",
      "label": "Butcher"
    },
    {
      "value": "Butcher Shop",
      "label": "Butcher Shop"
    },
    {
      "value": "Calligrapher",
      "label": "Calligrapher"
    },
    {
      "value": "Car Hauler",
      "label": "Car Hauler"
    },
    {
      "value": "Car Polishing",
      "label": "Car Polishing"
    },
    {
      "value": "Car Wash",
      "label": "Car Wash"
    },
    {
      "value": "Care Center (Child)",
      "label": "Care Center (Child)"
    },
    {
      "value": "Casino Transportation (For Hire)",
      "label": "Casino Transportation (For Hire)"
    },
    {
      "value": "Cement Finishing/Repair",
      "label": "Cement Finishing/Repair"
    },
    {
      "value": "Chair & Table Rental",
      "label": "Chair & Table Rental"
    },
    {
      "value": "Charitable Organization",
      "label": "Charitable Organization"
    },
    {
      "value": "Charter Bus",
      "label": "Charter Bus"
    },
    {
      "value": "Check Cashing Services",
      "label": "Check Cashing Services"
    },
    {
      "value": "Chemical Manufacturer",
      "label": "Chemical Manufacturer"
    },
    {
      "value": "Chemist",
      "label": "Chemist"
    },
    {
      "value": "Chicken Catcher",
      "label": "Chicken Catcher"
    },
    {
      "value": "Child Adoption Agency",
      "label": "Child Adoption Agency"
    },
    {
      "value": "Child Care Center",
      "label": "Child Care Center"
    },
    {
      "value": "Child Psychologist",
      "label": "Child Psychologist"
    },
    {
      "value": "Children’s Camp",
      "label": "Children’s Camp"
    },
    {
      "value": "Children’s Clothing Store",
      "label": "Children’s Clothing Store"
    },
    {
      "value": "Chimney Builder & Repair",
      "label": "Chimney Builder & Repair"
    },
    {
      "value": "Chimney Sweep",
      "label": "Chimney Sweep"
    },
    {
      "value": "Chinese Restaurant",
      "label": "Chinese Restaurant"
    },
    {
      "value": "Chiropractor",
      "label": "Chiropractor"
    },
    {
      "value": "Choir",
      "label": "Choir"
    },
    {
      "value": "Church",
      "label": "Church"
    },
    {
      "value": "Clothing Manufacturer",
      "label": "Clothing Manufacturer"
    },
    {
      "value": "Clothing Store",
      "label": "Clothing Store"
    },
    {
      "value": "Clothing Wholesaler",
      "label": "Clothing Wholesaler"
    },
    {
      "value": "Coach",
      "label": "Coach"
    },
    {
      "value": "Coal Hauling",
      "label": "Coal Hauling"
    },
    {
      "value": "Coffee Shop",
      "label": "Coffee Shop"
    },
    {
      "value": "Collision Repair Shop",
      "label": "Collision Repair Shop"
    },
    {
      "value": "Commercial Photographer",
      "label": "Commercial Photographer"
    },
    {
      "value": "Concrete Finishing/Repair",
      "label": "Concrete Finishing/Repair"
    },
    {
      "value": "Consignment Shop",
      "label": "Consignment Shop"
    },
    {
      "value": "Construction (Road/Highways/Utilities)",
      "label": "Construction (Road/Highways/Utilities)"
    },
    {
      "value": "Container Hauling",
      "label": "Container Hauling"
    },
    {
      "value": "Cooking School",
      "label": "Cooking School"
    },
    {
      "value": "Copy Machine Repair",
      "label": "Copy Machine Repair"
    },
    {
      "value": "Costume Shop",
      "label": "Costume Shop"
    },
    {
      "value": "Court House",
      "label": "Court House"
    },
    {
      "value": "Custom Harvester",
      "label": "Custom Harvester"
    },
    {
      "value": "Dairy Products Hauling (For A Fee)",
      "label": "Dairy Products Hauling (For A Fee)"
    },
    {
      "value": "Dealer (Other Than Auto/Truck)",
      "label": "Dealer (Other Than Auto/Truck)"
    },
    {
      "value": "Delivery Service (Ltl, Freight)",
      "label": "Delivery Service (Ltl, Freight)"
    },
    {
      "value": "Desktop Publishing",
      "label": "Desktop Publishing"
    },
    {
      "value": "Developer (Roads/Highways)",
      "label": "Developer (Roads/Highways)"
    },
    {
      "value": "Dinner Theater",
      "label": "Dinner Theater"
    },
    {
      "value": "Dirt Hauling (For A Fee)",
      "label": "Dirt Hauling (For A Fee)"
    },
    {
      "value": "Dog Obedience School",
      "label": "Dog Obedience School"
    },
    {
      "value": "Donut Shop",
      "label": "Donut Shop"
    },
    {
      "value": "Drive Through Store",
      "label": "Drive Through Store"
    },
    {
      "value": "Drive-In Theater",
      "label": "Drive-In Theater"
    },
    {
      "value": "Driving School",
      "label": "Driving School"
    },
    {
      "value": "Elevated Highway",
      "label": "Elevated Highway"
    },
    {
      "value": "Escort Vehicle",
      "label": "Escort Vehicle"
    },
    {
      "value": "Farm Equipment Wholesaler",
      "label": "Farm Equipment Wholesaler"
    },
    {
      "value": "Farm Produce/Production Hauling (For A Fee)",
      "label": "Farm Produce/Production Hauling (For A Fee)"
    },
    {
      "value": "Fashion Designer/Consultant",
      "label": "Fashion Designer/Consultant"
    },
    {
      "value": "Fire Extinguisher Inspector",
      "label": "Fire Extinguisher Inspector"
    },
    {
      "value": "Fire Extinguisher Sales",
      "label": "Fire Extinguisher Sales"
    },
    {
      "value": "Fish Market",
      "label": "Fish Market"
    },
    {
      "value": "Fishery",
      "label": "Fishery"
    },{
      "value": "Fishing Charter",
      "label": "Fishing Charter"
    },
    {
      "value": "Flight School",
      "label": "Flight School"
    },
    {
      "value": "Floor Cleaning/Polishing",
      "label": "Floor Cleaning/Polishing"
    },
    {
      "value": "Floor Installation/Refinishing",
      "label": "Floor Installation/Refinishing"
    },
    {
      "value": "Flower Wholesaler",
      "label": "Flower Wholesaler"
    },
    {
      "value": "For Hire Trucking",
      "label": "For Hire Trucking"
    },
    {
      "value": "Fracking Sand Hauling",
      "label": "Fracking Sand Hauling"
    },
    {
      "value": "Fracking Water (Fresh Or Production) Hauling",
      "label": "Fracking Water (Fresh Or Production) Hauling"
    },
    {
      "value": "Freight Forwarder",
      "label": "Freight Forwarder"
    },
    {
      "value": "Frozen Foods Hauling",
      "label": "Frozen Foods Hauling"
    },
    {
      "value": "Frozen Foods Wholesaler",
      "label": "Frozen Foods Wholesaler"
    },
    {
      "value": "Funeral Home",
      "label": "Funeral Home"
    },
    {
      "value": "Furniture Cleaning (Upholstered)",
      "label": "Furniture Cleaning (Upholstered)"
    },
    {
      "value": "Furniture Wholesaler",
      "label": "Furniture Wholesaler"
    },
    {
      "value": "Garbage & Trash Hauling/Removal",
      "label": "Garbage & Trash Hauling/Removal"
    },
    {
      "value": "Garden Equipment Wholesaler",
      "label": "Garden Equipment Wholesaler"
    },
    {
      "value": "General Contractor (Roads/Highways)",
      "label": "General Contractor (Roads/Highways)"
    },
    {
      "value": "General Freight Hauler",
      "label": "General Freight Hauler"
    },
    {
      "value": "Gift Shop",
      "label": "Gift Shop"
    },
    {
      "value": "Gourmet Shop",
      "label": "Gourmet Shop"
    },
    {
      "value": "Graphic Designer",
      "label": "Graphic Designer"
    },
    {
      "value": "Gravel Hauling (For A Fee)",
      "label": "Gravel Hauling (For A Fee)"
    },
    {
      "value": "Greenhouse",
      "label": "Greenhouse"
    },
    {
      "value": "Grocery Wholesaler",
      "label": "Grocery Wholesaler"
    },
    {
      "value": "Gunsmith",
      "label": "Gunsmith"
    },
    {
      "value": "Hair Dresser",
      "label": "Hair Dresser"
    },
    {
      "value": "Hair Removal (Permanent)",
      "label": "Hair Removal (Permanent)"
    },
    {
      "value": "Hair Removal (Waxing)",
      "label": "Hair Removal (Waxing)"
    },
    {
      "value": "Hair Replacement",
      "label": "Hair Replacement"
    },
    {
      "value": "Hair Salon",
      "label": "Hair Salon"
    },
    {
      "value": "Hair Stylist/Design",
      "label": "Hair Stylist/Design"
    },
    {
      "value": "Halls (Party/Reception)",
      "label": "Halls (Party/Reception)"
    },
    {
      "value": "Handyman",
      "label": "Handyman"
    },
    {
      "value": "Hardware Store",
      "label": "Hardware Store"
    },
    {
      "value": "Hardwood Floor Installation/Refinishing",
      "label": "Hardwood Floor Installation/Refinishing"
    },
    {
      "value": "Harvesting, Crop",
      "label": "Harvesting, Crop"
    },
    {
      "value": "Hauling",
      "label": "Hauling"
    },
    {
      "value": "Hayride Tour",
      "label": "Hayride Tour"
    },
    {
      "value": "Hazardous Materials Hauling",
      "label": "Hazardous Materials Hauling"
    },
    {
      "value": "Head Start Center",
      "label": "Head Start Center"
    },
    {
      "value": "Health Club",
      "label": "Health Club"
    },
    {
      "value": "Health Food Store",
      "label": "Health Food Store"
    },
    {
      "value": "Health Practitioner",
      "label": "Health Practitioner"
    },
    {
      "value": "Heating & Air Contractor",
      "label": "Heating & Air Contractor"
    },
    {
      "value": "Heating & Air Services",
      "label": "Heating & Air Services"
    },
    {
      "value": "Heavy Construction",
      "label": "Heavy Construction"
    },
    {
      "value": "Heavy Equipment Mechanic",
      "label": "Heavy Equipment Mechanic"
    },
    {
      "value": "Highway Construction",
      "label": "Highway Construction"
    },
    {
      "value": "Hobby Shop",
      "label": "Hobby Shop"
    },
    {
      "value": "Holding Company",
      "label": "Holding Company"
    },
    {
      "value": "Home & Garden Store",
      "label": "Home & Garden Store"
    },
    {
      "value": "Home (Elderly/Nursing)",
      "label": "Home (Elderly/Nursing)"
    },
    {
      "value": "Home Appliance Rental",
      "label": "Home Appliance Rental"
    },
    {
      "value": "Home Builder",
      "label": "Home Builder"
    },
    {
      "value": "Home Furnishing Store",
      "label": "Home Furnishing Store"
    },
    {
      "value": "Home Health Care",
      "label": "Home Health Care"
    },
    {
      "value": "Home Improvement Contractor",
      "label": "Home Improvement Contractor"
    },
    {
      "value": "Home Improvement Store",
      "label": "Home Improvement Store"
    },
    {
      "value": "Home Inspection Services",
      "label": "Home Inspection Services"
    },
    {
      "value": "Home Renovations",
      "label": "Home Renovations"
    },
    {
      "value": "Home Security Installation",
      "label": "Home Security Installation"
    },
    {
      "value": "Home/Office Water Delivery",
      "label": "Home/Office Water Delivery"
    },
    {
      "value": "Horse Training",
      "label": "Horse Training"
    },
    {
      "value": "Horseback Riding Stable",
      "label": "Horseback Riding Stable"
    },
    {
      "value": "Horticulturalist",
      "label": "Horticulturalist"
    },
    {
      "value": "Hospice",
      "label": "Hospice"
    },
    {
      "value": "Hospital (Animal)",
      "label": "Hospital (Animal)"
    },
    {
      "value": "Hospital (Medical & Mental Health)",
      "label": "Hospital (Medical & Mental Health)"
    },
    {
      "value": "Hot Air Balloon Ride",
      "label": "Hot Air Balloon Ride"
    },
    {
      "value": "Hot Dog Stand",
      "label": "Hot Dog Stand"
    },
    {
      "value": "Hot Tub Dealer",
      "label": "Hot Tub Dealer"
    },
    {
      "value": "Hot Tub Rental",
      "label": "Hot Tub Rental"
    },
    {
      "value": "Hotel (No Shuttle Service Provided)",
      "label": "Hotel (No Shuttle Service Provided)"
    },
    {
      "value": "Hotel Shuttle (At No Charge)",
      "label": "Hotel Shuttle (At No Charge)"
    },
    {
      "value": "Hotshot - Auto Haulers",
      "label": "Hotshot - Auto Haulers"
    },
    {
      "value": "House Cleaning",
      "label": "House Cleaning"
    },
    {
      "value": "House Leveling",
      "label": "House Leveling"
    },
    {
      "value": "House Painting",
      "label": "House Painting"
    },
    {
      "value": "Household Goods Manufacturing",
      "label": "Household Goods Manufacturing"
    },
    {
      "value": "Household Goods Mover",
      "label": "Household Goods Mover"
    },
    {
      "value": "Household Goods Rental & Leasing",
      "label": "Household Goods Rental & Leasing"
    },
    {
      "value": "Housekeeper",
      "label": "Housekeeper"
    },
    {
      "value": "Housing Contractor/Developer",
      "label": "Housing Contractor/Developer"
    },
    {
      "value": "Housing Program",
      "label": "Housing Program"
    },
    {
      "value": "Humane Society",
      "label": "Humane Society"
    },
    {
      "value": "Hunter",
      "label": "Hunter"
    },
    {
      "value": "HVAC Technician",
      "label": "HVAC Technician"
    },
    {
      "value": "Hypnotist (Entertainment)",
      "label": "Hypnotist (Entertainment)"
    },
    {
      "value": "Hypnotist (Medical)",
      "label": "Hypnotist (Medical)"
    },
    {
      "value": "Ice Cream Hauling",
      "label": "Ice Cream Hauling"
    },
    {
      "value": "Ice Cream Sales (From Vehicle)",
      "label": "Ice Cream Sales (From Vehicle)"
    }, {
      "value": "Zoo/Zoological Garden",
      "label": "Zoo/Zoological Garden"
    },
    {
      "value": "Youth Center",
      "label": "Youth Center"
    },
    {
      "value": "Yoga Instructor",
      "label": "Yoga Instructor"
    },
    {
      "value": "Yard Equipment Rental & Leasing Campany",
      "label": "Yard Equipment Rental & Leasing Campany"
    },
    {
      "value": "Yacht Charter",
      "label": "Yacht Charter"
    },
    {
      "value": "X-Ray Lab",
      "label": "X-Ray Lab"
    },
    {
      "value": "Writer",
      "label": "Writer"
    },
    {
      "value": "Wrecker Service",
      "label": "Wrecker Service"
    },
    {
      "value": "Wood Worker",
      "label": "Wood Worker"
    },
    {
      "value": "Wood chip hauling",
      "label": "Wood chip hauling"
    },
    {
      "value": "Winery",
      "label": "Winery"
    },
    {
      "value": "Window Tinting",
      "label": "Window Tinting"
    },
    {
      "value": "Window Repair (Auto)",
      "label": "Window Repair (Auto)"
    },
    {
      "value": "Window Installation/Repair (Not Auto)",
      "label": "Window Installation/Repair (Not Auto)"
    },
    {
      "value": "Window Cleaner",
      "label": "Window Cleaner"
    },
    {
      "value": "Wide Load Hauler",
      "label": "Wide Load Hauler"
    },
    {
      "value": "Wholesale Trade",
      "label": "Wholesale Trade"
    },
    {
      "value": "Wholesale Router Drivers",
      "label": "Wholesale Router Drivers"
    },
    {
      "value": "White Water Rafting Tour",
      "label": "White Water Rafting Tour"
    },
    {
      "value": "Well Drilling (Water)",
      "label": "Well Drilling (Water)"
    },
    {
      "value": "Welfare Office",
      "label": "Welfare Office"
    },
    {
      "value": "Welder",
      "label": "Welder"
    },
    {
      "value": "Wedding Planner",
      "label": "Wedding Planner"
    },
    {
      "value": "Waterproofing",
      "label": "Waterproofing"
    },
    {
      "value": "Water Well Drilling",
      "label": "Water Well Drilling"
    },
    {
      "value": "Water Park",
      "label": "Water Park"
    },
    {
      "value": "Water Line Installation (Public)",
      "label": "Water Line Installation (Public)"
    },
    {
      "value": "Water Hauling For Frakning",
      "label": "Water Hauling For Frakning"
    },
    {
      "value": "Watch Repair",
      "label": "Watch Repair"
    },
    {
      "value": "Washing Machine Repair",
      "label": "Washing Machine Repair"
    },
    {
      "value": "Wall paper Hanger",
      "label": "Wall paper Hanger"
    },
    {
      "value": "Volunteer Organization",
      "label": "Volunteer Organization"
    },
    {
      "value": "Volunteer Fireman",
      "label": "Volunteer Fireman"
    },
    {
      "value": "Vocational School",
      "label": "Vocational School"
    },
    {
      "value": "Vitamin Store",
      "label": "Vitamin Store"
    },
    {
      "value": "Visitor Nurse",
      "label": "Visitor Nurse"
    },
    {
      "value": "Vintage Clothing Store",
      "label": "Vintage Clothing Store"
    },
    {
      "value": "Vineyard",
      "label": "Vineyard"
    },
    {
      "value": "Video Taping Service",
      "label": "Video Taping Service"
    },
    {
      "value": "Video Rental/Sales",
      "label": "Video Rental/Sales"
    },
    {
      "value": "Video Game Store",
      "label": "Video Game Store"
    },
    {
      "value": "Veterinarian",
      "label": "Veterinarian"
    },
    {
      "value": "Ventilation Services",
      "label": "Ventilation Services"
    },
    {
      "value": "Vendor",
      "label": "Vendor"
    },
    {
      "value": "Vending Machine Supplier/Operator",
      "label": "Vending Machine Supplier/Operator"
    },
    {
      "value": "Vehicle Hauler",
      "label": "Vehicle Hauler"
    },
    {
      "value": "Vegetable Stand",
      "label": "Vegetable Stand"
    },
    {
      "value": "Utility Installation(public)",
      "label": "Utility Installation(public)"
    },
    {
      "value": "Used Merchandise Store",
      "label": "Used Merchandise Store"
    },
    {
      "value": "Used Car Dealer",
      "label": "Used Car Dealer"
    },
    {
      "value": "Used Book Store",
      "label": "Used Book Store"
    },
    {
      "value": "Urgent Care(No Passenfer Transport)",
      "label": "Urgent Care(No Passenfer Transport)"
    },
    {
      "value": "Urban Development",
      "label": "Urban Development"
    },
    {
      "value": "Upholstery Repair",
      "label": "Upholstery Repair"
    },
    {
      "value": "Upholstery Cleaning",
      "label": "Upholstery Cleaning"
    },
    {
      "value": "University",
      "label": "University"
    },
    {
      "value": "Uniform Supply Services",
      "label": "Uniform Supply Services"
    },
    {
      "value": "Ultrasound Technician",
      "label": "Ultrasound Technician"
    },
    {
      "value": "Ultrasound Services",
      "label": "Ultrasound Services"
    },
    {
      "value": "Uber",
      "label": "Uber"
    },
    {
      "value": "Tuxedo Rental",
      "label": "Tuxedo Rental"
    },
    {
      "value": "Tutor",
      "label": "Tutor"
    },
    {
      "value": "Tupperware Sales",
      "label": "Tupperware Sales"
    },
    {
      "value": "Tunnel Construction",
      "label": "Tunnel Construction"
    },
    {
      "value": "Tune Up Services",
      "label": "Tune Up Services"
    },
    {
      "value": "Tuck POinting Contractor",
      "label": "Tuck POinting Contractor"
    },
    {
      "value": "Trust Company",
      "label": "Trust Company"
    },
    {
      "value": "Oilfield Materials Trucking",
      "label": "Oilfield Materials Trucking"
    },
    {
      "value": "Fracking Water(Fresh Or Production) Trucking",
      "label": "Fracking Water(Fresh Or Production) Trucking"
    },
    {
      "value": "Fracking Sand Trucking",
      "label": "Fracking Sand Trucking"
    },
    {
      "value": "Trucker",
      "label": "Trucker"
    },
    {
      "value": "Trucker",
      "label": "Trucker"
    },
    {
      "value": "Truck Dealer/Sale",
      "label": "Truck Dealer/Sale"
    },
    {
      "value": "Tropical Fish Store",
      "label": "Tropical Fish Store"
    },
    {
      "value": "Trophy Shop",
      "label": "Trophy Shop"
    },
    {
      "value": "Tree Service",
      "label": "Tree Service"
    },
    {
      "value": "Travel Agency/Agent",
      "label": "Travel Agency/Agent"
    },
    {
      "value": "Trash Removal",
      "label": "Trash Removal"
    },
    {
      "value": "Trapper",
      "label": "Trapper"
    },
    {
      "value": "Transportation For Elderly Person(For Hire)",
      "label": "Transportation For Elderly Person(For Hire)"
    },
    {
      "value": "Transportation (Cargo)",
      "label": "Transportation (Cargo)"
    },
    {
      "value": "Transport Passenger(At No Charge)",
      "label": "Transport Passenger(At No Charge)"
    },
    {
      "value": "Transmission Repair Shop",
      "label": "Transmission Repair Shop"
    },
    {
      "value": "Translator",
      "label": "Translator"
    },
    {
      "value": "Trailer Park",
      "label": "Trailer Park"
    },
    {
      "value": "Toy Store",
      "label": "Toy Store"
    },
    {
      "value": "Toy Manufacturing",
      "label": "Toy Manufacturing"
    },
    {
      "value": "Towing",
      "label": "Towing"
    },
    {
      "value": "Tool Rental &Leasing Company",
      "label": "Tool Rental &Leasing Company"
    },
    {
      "value": "Tool Maker",
      "label": "Tool Maker"
    },
    {
      "value": "Tobacco Store",
      "label": "Tobacco Store"
    },
    {
      "value": "Tobacco Manufacturing",
      "label": "Tobacco Manufacturing"
    },
    {
      "value": "Title Company",
      "label": "Title Company"
    },
    {
      "value": "Title Agent",
      "label": "Title Agent"
    },
    {
      "value": "Tire Wholesaler",
      "label": "Tire Wholesaler"
    },
    {
      "value": "Tire Saler (Retail)",
      "label": "Tire Saler (Retail)"
    },
    {
      "value": "Tire Repair And Re-Treading",
      "label": "Tire Repair And Re-Treading"
    },
    {
      "value": "Tire Manufacturing",
      "label": "Tire Manufacturing"
    },
    {
      "value": "Tinting Services-Auto",
      "label": "Tinting Services-Auto"
    },
    {
      "value": "Timber Cruisers",
      "label": "Timber Cruisers"
    },
    {
      "value": "Tile Installation/Repair",
      "label": "Tile Installation/Repair"
    },
    {
      "value": "Ticket Sales",
      "label": "Ticket Sales"
    },
    {
      "value": "Thrift Store",
      "label": "Thrift Store"
    },
    {
      "value": "Theme Park",
      "label": "Theme Park"
    },
    {
      "value": "Theater",
      "label": "Theater"
    },
    {
      "value": "Textile Mill",
      "label": "Textile Mill"
    },
    {
      "value": "Termite Control",
      "label": "Termite Control"
    },
    {
      "value": "Tent Repair",
      "label": "Tent Repair"
    },
    {
      "value": "Tent Rental",
      "label": "Tent Rental"
    },
    {
      "value": "Tennis Court",
      "label": "Tennis Court"
    },
    {
      "value": "Temple",
      "label": "Temple"
    },
    {
      "value": "Temp Agency Services",
      "label": "Temp Agency Services"
    },
    {
      "value": "Television Station",
      "label": "Television Station"
    },
    {
      "value": "Telephone Line Installation (Public)",
      "label": "Telephone Line Installation (Public)"
    },
    {
      "value": "Telephone Answering Service",
      "label": "Telephone Answering Service"
    },
    {
      "value": "Telemarketing Company",
      "label": "Telemarketing Company"
    },
    {
      "value": "Teacher",
      "label": "Teacher"
    },
    {
      "value": "Taxidermist",
      "label": "Taxidermist"
    },
    {
      "value": "Taxi Service",
      "label": "Taxi Service"
    },
    {
      "value": "Taxi(Ruler)",
      "label": "Taxi(Ruler)"
    },
    {
      "value": "Taxi (Amish)",
      "label": "Taxi (Amish)"
    },
    {
      "value": "Taxi(Airport)",
      "label": "Taxi(Airport)"
    },
    {
      "value": "Taxi - Non-Emergency Medical Transportation",
      "label": "Taxi - Non-Emergency Medical Transportation"
    },
    {
      "value": "Tax Preparer",
      "label": "Tax Preparer"
    },
    {
      "value": "Tavern",
      "label": "Tavern"
    },
    {
      "value": "Tattoo Artist",
      "label": "Tattoo Artist"
    },
    {
      "value": "Tanning Salon",
      "label": "Tanning Salon"
    },
    {
      "value": "Talent Agent",
      "label": "Talent Agent"
    },
    {
      "value": "Tailor",
      "label": "Tailor"
    },
    {
      "value": "Table & Chair Rental",
      "label": "Table & Chair Rental"
    },
    {
      "value": "System Analyst",
      "label": "System Analyst"
    },
    {
      "value": "Synagogue",
      "label": "Synagogue"
    },
    {
      "value": "Swimming Pool Cleaning",
      "label": "Swimming Pool Cleaning"
    },
    {
      "value": "Swimming Instruction",
      "label": "Swimming Instruction"
    },
    {
      "value": "Sweeping Service",
      "label": "Sweeping Service"
    },
    {
      "value": "Surveying Services",
      "label": "Surveying Services"
    },
    {
      "value": "Support Group",
      "label": "Support Group"
    },
    {
      "value": "Supermarket",
      "label": "Supermarket"
    },
    {
      "value": "Sub Truck",
      "label": "Sub Truck"
    },
    {
      "value": "Sub Shop",
      "label": "Sub Shop"
    },
    {
      "value": "Stylist (Hair)",
      "label": "Stylist (Hair)"
    },
    {
      "value": "Street Sweeper",
      "label": "Street Sweeper"
    },
    {
      "value": "Street Construction",
      "label": "Street Construction"
    },
    {
      "value": "Store",
      "label": "Store"
    },
    {
      "value": "Store Facility",
      "label": "Store Facility"
    },
    {
      "value": "Stone Work",
      "label": "Stone Work"
    },
    {
      "value": "Stock Broker",
      "label": "Stock Broker"
    },
    {
      "value": "Stenographer",
      "label": "Stenographer"
    },
    {
      "value": "Steel Hauling",
      "label": "Steel Hauling"
    },
    {
      "value": "Steam Cleaning",
      "label": "Steam Cleaning"
    },
    {
      "value": "Stage Performer",
      "label": "Stage Performer"
    },
    {
      "value": "Stadium Stable (Hourse)",
      "label": "Stadium Stable (Hourse)"
    },
    {
      "value": "Sprinkler Installtion",
      "label": "Sprinkler Installtion"
    },
    {
      "value": "Sport Wedding",
      "label": "Sport Wedding"
    },
    {
      "value": "Sport Medicine",
      "label": "Sport Medicine"
    },
    {
      "value": "Sport Bar",
      "label": "Sport Bar"
    },
    {
      "value": "Sport Arena",
      "label": "Sport Arena"
    },
    {
      "value": "Sports Goods Store",
      "label": "Sports Goods Store"
    },
    {
      "value": "Speech Pathologist",
      "label": "Speech Pathologist"
    },
    {
      "value": "Specialty Food Store",
      "label": "Specialty Food Store"
    },
    {
      "value": "Spa Souvenir Shop",
      "label": "Spa Souvenir Shop"
    },
    {
      "value": "Soil Preparation Services",
      "label": "Soil Preparation Services"
    },
    {
      "value": "Social Worker",
      "label": "Social Worker"
    },
    {
      "value": "Social Services",
      "label": "Social Services"
    },
    {
      "value": "Snowplowing",
      "label": "Snowplowing"
    },
    {
      "value": "Snowmobile Dealer",
      "label": "Snowmobile Dealer"
    },
    {
      "value": "Snow Removal",
      "label": "Snow Removal"
    },
    {
      "value": "Slab Work (Concrete/Asphalt)",
      "label": "Slab Work (Concrete/Asphalt)"
    },
    {
      "value": "Ski Resort",
      "label": "Ski Resort"
    },
    {
      "value": "Ski Instructor",
      "label": "Ski Instructor"
    },
    {
      "value": "Skating Rink",
      "label": "Skating Rink"
    },
    {
      "value": "Skateboard Park",
      "label": "Skateboard Park"
    },
    {
      "value": "Singing Telegram",
      "label": "Singing Telegram"
    },
    {
      "value": "Singer",
      "label": "Singer"
    },
    {
      "value": "Sign Company",
      "label": "Sign Company"
    },
    {
      "value": "Sightseeing Tours",
      "label": "Sightseeing Tours"
    },
    {
      "value": "Siding Installation/Repair",
      "label": "Siding Installation/Repair"
    },
    {
      "value": "Sidewalk Installation (Public)",
      "label": "Sidewalk Installation (Public)"
    },
    {
      "value": "Sidewalk Installation (Private)",
      "label": "Sidewalk Installation (Private)"
    },
    {
      "value": "Shrine",
      "label": "Shrine"
    },
    {
      "value": "Shredding Services",
      "label": "Shredding Services"
    },
    {
      "value": "Shopping Center/Mall",
      "label": "Shopping Center/Mall"
    },
    {
      "value": "Shoe Store",
      "label": "Shoe Store"
    },
    {
      "value": "Shoe Repair",
      "label": "Shoe Repair"
    },
    {
      "value": "Shipping Services",
      "label": "Shipping Services"
    },
    {
      "value": "Shelter",
      "label": "Shelter"
    },
    {
      "value": "Sheet Metal Contractor Repairman",
      "label": "Sheet Metal Contractor Repairman"
    },
    {
      "value": "Sewer Line Installation(Public)",
      "label": "Sewer Line Installation(Public)"
    },
    {
      "value": "Sewer Cleaner",
      "label": "Sewer Cleaner"
    },
    {
      "value": "Service Station",
      "label": "Service Station"
    },
    {
      "value": "Septic Waste Removal",
      "label": "Septic Waste Removal"
    },
    {
      "value": "Septic",
      "label": "Septic"
    },
    {
      "value": "Waste Removal",
      "label": "Waste Removal"
    },
    {
      "value": "Septic Tank Installation",
      "label": "Septic Tank Installation"
    },
    {
      "value": "Senor Citizen Transportation",
      "label": "Senor Citizen Transportation"
    },
    {
      "value": "Senior Center",
      "label": "Senior Center"
    },
    {
      "value": "Security System Installation",
      "label": "Security System Installation"
    },
    {
      "value": "Security Services",
      "label": "Security Services"
    },
    {
      "value": "Security Guard",
      "label": "Security Guard"
    },
    {
      "value": "Security Broker/Dealer",
      "label": "Security Broker/Dealer"
    },
    {
      "value": "Secretarial Services",
      "label": "Secretarial Services"
    },
    {
      "value": "Seamstress",
      "label": "Seamstress"
    },
    {
      "value": "Sculptor",
      "label": "Sculptor"
    },
    {
      "value": "Scrap Metal/Scrap Auto Hauler",
      "label": "Scrap Metal/Scrap Auto Hauler"
    },
    {
      "value": "Scouts School Sawmill",
      "label": "Scouts School Sawmill"
    },
    {
      "value": "Saving Institution",
      "label": "Saving Institution"
    },
    {
      "value": "Savings & Loan",
      "label": "Savings & Loan"
    },
    {
      "value": "Satellite Dish Installation",
      "label": "Satellite Dish Installation"
    },
    {
      "value": "Sanitation Services",
      "label": "Sanitation Services"
    },
    {
      "value": "Sandwich Shop",
      "label": "Sandwich Shop"
    },
    {
      "value": "Sandblasting",
      "label": "Sandblasting"
    },
    {
      "value": "Sand Hauler (For A Fee)",
      "label": "Sand Hauler (For A Fee)"
    },
    {
      "value": "Sand & Gravel (For A Fee)",
      "label": "Sand & Gravel (For A Fee)"
    },
    {
      "value": "Salvaged Auto Hauler",
      "label": "Salvaged Auto Hauler"
    },
    {
      "value": "Salvage Work",
      "label": "Salvage Work"
    },
    {
      "value": "Saloon Bar",
      "label": "Saloon Bar"
    },
    {
      "value": "Salon Beauty",
      "label": "Salon Beauty"
    },
    {
      "value": "Sale Representatives",
      "label": "Sale Representatives"
    },
    {
      "value": "Saddlery",
      "label": "Saddlery"
    },
    {
      "value": "Rv Sales",
      "label": "Rv Sales"
    },
    {
      "value": "Rv Parks",
      "label": "Rv Parks"
    },
    {
      "value": "Rustproofing",
      "label": "Rustproofing"
    },
    {
      "value": "Rural Taxi",
      "label": "Rural Taxi"
    },
    {
      "value": "Rug Cleaner",
      "label": "Rug Cleaner"
    },
    {
      "value": "Rubbish Collection",
      "label": "Rubbish Collection"
    },
    {
      "value": "Router Drivers",
      "label": "Router Drivers"
    },
    {
      "value": "Routabout",
      "label": "Routabout"
    },
    {
      "value": "Roofing Contractor",
      "label": "Roofing Contractor"
    },
    {
      "value": "Roofer",
      "label": "Roofer"
    },
    {
      "value": "Rock Quarry",
      "label": "Rock Quarry"
    },
    {
      "value": "Rock Hauling (For A Fee)",
      "label": "Rock Hauling (For A Fee)"
    },
    {
      "value": "Rock Band",
      "label": "Rock Band"
    },
    {
      "value": "Roadside Food Stand Road Construction",
      "label": "Roadside Food Stand Road Construction"
    },
    {
      "value": "Riding Stable",
      "label": "Riding Stable"
    },
    {
      "value": "Ride Share",
      "label": "Ride Share"
    },
    {
      "value": "Retirement",
      "label": "Retirement"
    },
    {
      "value": "Community",
      "label": "Community"
    },
    {
      "value": "Restoration (Building)",
      "label": "Restoration (Building)"
    },
    {
      "value": "Restoration (Art)",
      "label": "Restoration (Art)"
    },
    {
      "value": "Restaurant With Delivery",
      "label": "Restaurant With Delivery"
    },
    {
      "value": "Restaurant",
      "label": "Restaurant"
    },
    {
      "value": "Residential Contractor/Developer",
      "label": "Residential Contractor/Developer"
    },
    {
      "value": "Residential Construction",
      "label": "Residential Construction"
    },
    {
      "value": "Residential Care",
      "label": "Residential Care"
    },
    {
      "value": "Research Organization",
      "label": "Research Organization"
    },
    {
      "value": "Repossession Work (Auto)",
      "label": "Repossession Work (Auto)"
    },
    {
      "value": "Repair Services (Heating & Air)",
      "label": "Repair Services (Heating & Air)"
    },
    {
      "value": "Repair Services (Auto Mechanical)",
      "label": "Repair Services (Auto Mechanical)"
    },
    {
      "value": "Repair Services (Auto Body)",
      "label": "Repair Services (Auto Body)"
    },
    {
      "value": "Repair Services(Asphalt Concrete)",
      "label": "Repair Services(Asphalt Concrete)"
    },
    {
      "value": "Repair Services",
      "label": "Repair Services"
    },
    {
      "value": "Rental Property Management",
      "label": "Rental Property Management"
    },
    {
      "value": "Rental Office",
      "label": "Rental Office"
    },
    {
      "value": "Rental Video",
      "label": "Rental Video"
    },
    {
      "value": "Rental & Leasing (Housing/Apartment)",
      "label": "Rental & Leasing (Housing/Apartment)"
    },
    {
      "value": "Rental & Leasing (Equipment)",
      "label": "Rental & Leasing (Equipment)"
    },
    {
      "value": "Renovations Home",
      "label": "Renovations Home"
    },
    {
      "value": "Removal Garbage",
      "label": "Removal Garbage"
    },
    {
      "value": "Removal Debris",
      "label": "Removal Debris"
    },
    {
      "value": "Removal Animal",
      "label": "Removal Animal"
    },
    {
      "value": "Remodeling",
      "label": "Remodeling"
    },
    {
      "value": "Religious Organization",
      "label": "Religious Organization"
    },
    {
      "value": "Rehabilitation Center",
      "label": "Rehabilitation Center"
    },
    {
      "value": "Refrigerated Goods Hauling/Trucking",
      "label": "Refrigerated Goods Hauling/Trucking"
    },
    {
      "value": "Refinery Grain",
      "label": "Refinery Grain"
    },
    {
      "value": "Recycling Services",
      "label": "Recycling Services"
    },
    {
      "value": "Recreation Center",
      "label": "Recreation Center"
    },
    {
      "value": "Recording Studio",
      "label": "Recording Studio"
    },
    {
      "value": "Record Store",
      "label": "Record Store"
    },
    {
      "value": "Realtor",
      "label": "Realtor"
    },
    {
      "value": "Real Estate Agency",
      "label": "Real Estate Agency"
    },
    {
      "value": "Ranger (Forest)",
      "label": "Ranger (Forest)"
    },
    {
      "value": "Ranching",
      "label": "Ranching"
    },
    {
      "value": "Radio Station",
      "label": "Radio Station"
    },
    {
      "value": "Radiator Services",
      "label": "Radiator Services"
    },
    {
      "value": "Racquetball Club",
      "label": "Racquetball Club"
    },
    {
      "value": "Race Track",
      "label": "Race Track"
    },
    {
      "value": "Race Car",
      "label": "Race Car"
    },
    {
      "value": "Driver",
      "label": "Driver"
    },
    {
      "value": "Quarry Hauling",
      "label": "Quarry Hauling"
    },
    {
      "value": "Quarry",
      "label": "Quarry"
    },
    {
      "value": "Pumper (Oil)",
      "label": "Pumper (Oil)"
    },
    {
      "value": "Pulpwood Hauling",
      "label": "Pulpwood Hauling"
    },
    {
      "value": "Pulo Mill",
      "label": "Pulo Mill"
    },
    {
      "value": "Publisher",
      "label": "Publisher"
    },
    {
      "value": "Public Utility Installation",
      "label": "Public Utility Installation"
    },
    {
      "value": "Public Relations",
      "label": "Public Relations"
    },
    {
      "value": "Public Accounting",
      "label": "Public Accounting"
    },
    {
      "value": "Pub",
      "label": "Pub"
    },
    {
      "value": "Psychologist",
      "label": "Psychologist"
    },
    {
      "value": "Psychic",
      "label": "Psychic"
    },
    {
      "value": "Psychiatrists",
      "label": "Psychiatrists"
    },
    {
      "value": "Psychiatric Hospital",
      "label": "Psychiatric Hospital"
    },
    {
      "value": "Property Management",
      "label": "Property Management"
    },
    {
      "value": "Property Maintenance",
      "label": "Property Maintenance"
    },
    {
      "value": "Professional Organization",
      "label": "Professional Organization"
    },
    {
      "value": "Produce Farmer",
      "label": "Produce Farmer"
    },
    {
      "value": "Private Investigator",
      "label": "Private Investigator"
    },
    {
      "value": "Prisoner Transportation",
      "label": "Prisoner Transportation"
    },
    {
      "value": "Printing Company Pressure Washing",
      "label": "Printing Company Pressure Washing"
    },
    {
      "value": "Preschool",
      "label": "Preschool"
    },
    {
      "value": "Prepared Food Truck",
      "label": "Prepared Food Truck"
    },
    {
      "value": "Power Liner Installation (Public)",
      "label": "Power Liner Installation (Public)"
    },
    {
      "value": "Poultry Hauling",
      "label": "Poultry Hauling"
    },
    {
      "value": "Poultry Farmer",
      "label": "Poultry Farmer"
    },
    {
      "value": "Pottery Store /Studio",
      "label": "Pottery Store /Studio"
    },
    {
      "value": "Postman",
      "label": "Postman"
    },
    {
      "value": "Portrait Studios",
      "label": "Portrait Studios"
    },
    {
      "value": "Popcorn Stand",
      "label": "Popcorn Stand"
    },
    {
      "value": "Pop-A-Lock",
      "label": "Pop-A-Lock"
    },
    {
      "value": "Rool Water Delivery",
      "label": "Rool Water Delivery"
    },
    {
      "value": "Pool Hall",
      "label": "Pool Hall"
    },
    {
      "value": "Pool Cleaner",
      "label": "Pool Cleaner"
    },
    {
      "value": "Polygraph Services",
      "label": "Polygraph Services"
    },
    {
      "value": "Politics",
      "label": "Politics"
    },
    {
      "value": "Plumbing",
      "label": "Plumbing"
    },
    {
      "value": "Plowing (Snow)",
      "label": "Plowing (Snow)"
    },
    {
      "value": "Playground Equipment Sales",
      "label": "Playground Equipment Sales"
    },
    {
      "value": "Playground",
      "label": "Playground"
    },
    {
      "value": "Plating",
      "label": "Plating"
    },
    {
      "value": "Plastic Manufacturing",
      "label": "Plastic Manufacturing"
    },
    {
      "value": "Plastering Work",
      "label": "Plastering Work"
    },
    {
      "value": "Planer Event",
      "label": "Planer Event"
    },
    {
      "value": "Planetarium",
      "label": "Planetarium"
    },
    {
      "value": "Pizza Delivery",
      "label": "Pizza Delivery"
    },
    {
      "value": "Pipeline Installation (Public)",
      "label": "Pipeline Installation (Public)"
    },
    {
      "value": "Pipe Filter",
      "label": "Pipe Filter"
    },
    {
      "value": "Pilot",
      "label": "Pilot"
    },
    {
      "value": "Picture Framing",
      "label": "Picture Framing"
    },
    {
      "value": "Piano Tuning",
      "label": "Piano Tuning"
    },
    {
      "value": "Piano Sales",
      "label": "Piano Sales"
    },
    {
      "value": "Piano Mover",
      "label": "Piano Mover"
    },
    {
      "value": "Pi",
      "label": "Pi"
    },
    {
      "value": "Physician",
      "label": "Physician"
    },
    {
      "value": "Physical Therapist",
      "label": "Physical Therapist"
    },
    {
      "value": "Photo Grapher",
      "label": "Photo Grapher"
    },
    {
      "value": "Photocopy Services",
      "label": "Photocopy Services"
    },
    {
      "value": "Photo Studio",
      "label": "Photo Studio"
    },
    {
      "value": "Photo Finishing",
      "label": "Photo Finishing"
    },
    {
      "value": "Pharmacy/Pharmaceutical Sales",
      "label": "Pharmacy/Pharmaceutical Sales"
    },
    {
      "value": "Pharmaceutical Manufacturer",
      "label": "Pharmaceutical Manufacturer"
    },
    {
      "value": "Pet/Pet Supply Store",
      "label": "Pet/Pet Supply Store"
    },
    {
      "value": "Pet Groomer",
      "label": "Pet Groomer"
    },
    {
      "value": "Pet Cemetery",
      "label": "Pet Cemetery"
    },
    {
      "value": "Per Control",
      "label": "Per Control"
    },
    {
      "value": "Personnel Services",
      "label": "Personnel Services"
    },
    {
      "value": "Personal Trainer",
      "label": "Personal Trainer"
    },
    {
      "value": "Performance Artist",
      "label": "Performance Artist"
    },
    {
      "value": "Pedicurist",
      "label": "Pedicurist"
    },
    {
      "value": "Payroll Preparation",
      "label": "Payroll Preparation"
    },
    {
      "value": "Pawn Shops",
      "label": "Pawn Shops"
    },
    {
      "value": "Paving Contractor",
      "label": "Paving Contractor"
    },
    {
      "value": "Patrolmen",
      "label": "Patrolmen"
    },
    {
      "value": "Patio & Deck Builder",
      "label": "Patio & Deck Builder"
    },
    {
      "value": "Patent Attorney",
      "label": "Patent Attorney"
    },
    {
      "value": "Passenger Transportation(For A Fee)",
      "label": "Passenger Transportation(For A Fee)"
    },
    {
      "value": "Part Supply Store",
      "label": "Part Supply Store"
    },
    {
      "value": "Party Planning Services",
      "label": "Party Planning Services"
    },
    {
      "value": "Part Center",
      "label": "Part Center"
    },
    {
      "value": "Party Bus",
      "label": "Party Bus"
    },
    {
      "value": "Parts Wholesaler",
      "label": "Parts Wholesaler"
    },
    {
      "value": "Parole Office/Officer",
      "label": "Parole Office/Officer"
    },
    {
      "value": "Parking Lot Striping",
      "label": "Parking Lot Striping"
    },
    {
      "value": "Parking Garage/Lot",
      "label": "Parking Garage/Lot"
    },
    {
      "value": "Park (Water)",
      "label": "Park (Water)"
    },
    {
      "value": "Park (Amusement)",
      "label": "Park (Amusement)"
    },
    {
      "value": "Park(Theme)",
      "label": "Park(Theme)"
    },
    {
      "value": "Paratransit",
      "label": "Paratransit"
    },
    {
      "value": "Paper Shredding",
      "label": "Paper Shredding"
    },
    {
      "value": "Paper Mill",
      "label": "Paper Mill"
    },
    {
      "value": "Pallet Distributor",
      "label": "Pallet Distributor"
    },
    {
      "value": "Painting Contactor",
      "label": "Painting Contactor"
    },
    {
      "value": "Painter (House)",
      "label": "Painter (House)"
    },
    {
      "value": "Painter (Artist)",
      "label": "Painter (Artist)"
    },
    {
      "value": "Paintball Services",
      "label": "Paintball Services"
    },
    {
      "value": "Paint Wholesaler",
      "label": "Paint Wholesaler"
    },
    {
      "value": "Paint Store",
      "label": "Paint Store"
    },
    {
      "value": "Paint Shop Automotive",
      "label": "Paint Shop Automotive"
    },
    {
      "value": "Pain Management",
      "label": "Pain Management"
    },
    {
      "value": "Packing Services",
      "label": "Packing Services"
    },
    {
      "value": "Packaging Services",
      "label": "Packaging Services"
    },
    {
      "value": "Package Delivery",
      "label": "Package Delivery"
    },
    {
      "value": "Owner Operator",
      "label": "Owner Operator"
    },
    {
      "value": "Oversized Load Hauling/Trucking",
      "label": "Oversized Load Hauling/Trucking"
    },
    {
      "value": "Over The Road Trucker",
      "label": "Over The Road Trucker"
    },
    {
      "value": "Outreach Program",
      "label": "Outreach Program"
    },
    {
      "value": "Out Of Store Contractor",
      "label": "Out Of Store Contractor"
    },
    {
      "value": "Oriental Rug Dealer",
      "label": "Oriental Rug Dealer"
    },
    {
      "value": "Organic Food Store",
      "label": "Organic Food Store"
    },
    {
      "value": "Organ Transportation",
      "label": "Organ Transportation"
    },
    {
      "value": "Orchard",
      "label": "Orchard"
    },
    {
      "value": "Optometrist",
      "label": "Optometrist"
    },
    {
      "value": "Oilfield Materials Hauling",
      "label": "Oilfield Materials Hauling"
    },
    {
      "value": "Oilfield Equipment Hauler",
      "label": "Oilfield Equipment Hauler"
    },
    {
      "value": "Oil Field/Well Service",
      "label": "Oil Field/Well Service"
    },
    {
      "value": "Oil Change Service Center",
      "label": "Oil Change Service Center"
    },
    {
      "value": "Office Equipment/Supply Wholesaler",
      "label": "Office Equipment/Supply Wholesaler"
    },
    {
      "value": "Office Equipment/Supply Retail",
      "label": "Office Equipment/Supply Retail"
    },
    {
      "value": "Office Cleaning",
      "label": "Office Cleaning"
    },
    {
      "value": "Office Building",
      "label": "Office Building"
    },
    {
      "value": "Occupational Therapist",
      "label": "Occupational Therapist"
    },
    {
      "value": "Occupational Health Services",
      "label": "Occupational Health Services"
    },
    {
      "value": "Obstetrician",
      "label": "Obstetrician"
    },
    {
      "value": "Observatory",
      "label": "Observatory"
    },
    {
      "value": "Obedience School (Animal)",
      "label": "Obedience School (Animal)"
    },
    {
      "value": "Ob Gyn",
      "label": "Ob Gyn"
    },
    {
      "value": "Nursing Home",
      "label": "Nursing Home"
    },
    {
      "value": "Nursing School",
      "label": "Nursing School"
    },
    {
      "value": "Nursery (Flower/Garden)",
      "label": "Nursery (Flower/Garden)"
    },
    {
      "value": "Nursery (Child/Infant)",
      "label": "Nursery (Child/Infant)"
    },
    {
      "value": "Nurse (Visiting)",
      "label": "Nurse (Visiting)"
    },
    {
      "value": "Novelty Store",
      "label": "Novelty Store"
    },
    {
      "value": "Nurse (Except Visiting Nurses)",
      "label": "Nurse (Except Visiting Nurses)"
    },
    {
      "value": "Notary Public",
      "label": "Notary Public"
    },
    {
      "value": "Non-Emergency Medical Transportation",
      "label": "Non-Emergency Medical Transportation"
    },
    {
      "value": "Non0residential Contractor/Developer",
      "label": "Non0residential Contractor/Developer"
    },
    {
      "value": "Non-Profit Organization",
      "label": "Non-Profit Organization"
    },
    {
      "value": "None Business",
      "label": "None Business"
    },
    {
      "value": "No Business(No Income Received)",
      "label": "No Business(No Income Received)"
    },
    {
      "value": "Night Watchmen/Patrol",
      "label": "Night Watchmen/Patrol"
    },
    {
      "value": "Night Club",
      "label": "Night Club"
    },
    {
      "value": "Newspaper Delivery",
      "label": "Newspaper Delivery"
    },
    {
      "value": "News Stand",
      "label": "News Stand"
    },
    {
      "value": "Newspaper Company",
      "label": "Newspaper Company"
    },
    {
      "value": "Nature Center",
      "label": "Nature Center"
    },
    {
      "value": "Nanny",
      "label": "Nanny"
    },
    {
      "value": "Nail Technician",
      "label": "Nail Technician"
    },
    {
      "value": "Nail Salon",
      "label": "Nail Salon"
    },
    {
      "value": "Musician",
      "label": "Musician"
    },
    {
      "value": "Musical Group Music Store",
      "label": "Musical Group Music Store"
    },
    {
      "value": "Musical Instruction",
      "label": "Musical Instruction"
    },
    {
      "value": "Museum",
      "label": "Museum"
    },
    {
      "value": "Muffler Repair/Shop",
      "label": "Muffler Repair/Shop"
    },
    {
      "value": "Mud Jacking Contractor",
      "label": "Mud Jacking Contractor"
    },
    {
      "value": "Mowing Lawn",
      "label": "Mowing Lawn"
    },
    {
      "value": "Movie Theater",
      "label": "Movie Theater"
    },
    {
      "value": "Movers/Moving Operations",
      "label": "Movers/Moving Operations"
    },
    {
      "value": "Motorcycle Dealership",
      "label": "Motorcycle Dealership"
    },
    {
      "value": "Motor Carrier",
      "label": "Motor Carrier"
    },
    {
      "value": "Motion Picture Production/Company",
      "label": "Motion Picture Production/Company"
    },
    {
      "value": "Motel Shuttle(At No Charge)",
      "label": "Motel Shuttle(At No Charge)"
    },
    {
      "value": "Motel (No Shuttle Provided)",
      "label": "Motel (No Shuttle Provided)"
    },
    {
      "value": "Mosque",
      "label": "Mosque"
    },
    {
      "value": "Mortgage Companies",
      "label": "Mortgage Companies"
    },
    {
      "value": "Mortgage Broker",
      "label": "Mortgage Broker"
    },
    {
      "value": "Money Transfer Services",
      "label": "Money Transfer Services"
    },
    {
      "value": "Monastery",
      "label": "Monastery"
    },
    {
      "value": "Modeling Agency",
      "label": "Modeling Agency"
    },
    {
      "value": "Model",
      "label": "Model"
    },
    {
      "value": "Mobile Mechanic",
      "label": "Mobile Mechanic"
    },
    {
      "value": "Mobile Home Toter",
      "label": "Mobile Home Toter"
    },
    {
      "value": "Mobile Home Sales",
      "label": "Mobile Home Sales"
    },
    {
      "value": "Mobile Home Park",
      "label": "Mobile Home Park"
    },
    {
      "value": "Mobile Home Manufacturing",
      "label": "Mobile Home Manufacturing"
    },
    {
      "value": "Mobile Home Builder Or Repair",
      "label": "Mobile Home Builder Or Repair"
    },
    {
      "value": "Mobile Food Truck",
      "label": "Mobile Food Truck"
    },
    {
      "value": "Mobile Detailers",
      "label": "Mobile Detailers"
    },
    {
      "value": "Mobile Billboard Owner",
      "label": "Mobile Billboard Owner"
    },
    {
      "value": "Missionary",
      "label": "Missionary"
    },
    {
      "value": "Minister",
      "label": "Minister"
    },
    {
      "value": "Mining",
      "label": "Mining"
    },
    {
      "value": "Miniature Golf Course",
      "label": "Miniature Golf Course"
    },
    {
      "value": "Mini-Mart",
      "label": "Mini-Mart"
    },
    {
      "value": "Mill Work (Wood)",
      "label": "Mill Work (Wood)"
    },
    {
      "value": "Mill Work (Food/Paper/Material)",
      "label": "Mill Work (Food/Paper/Material)"
    },
    {
      "value": "Midwife",
      "label": "Midwife"
    },
    {
      "value": "Metal Work",
      "label": "Metal Work"
    },
    {
      "value": "Mental Health Services",
      "label": "Mental Health Services"
    },
    {
      "value": "Medical Equipment Wholesaler",
      "label": "Medical Equipment Wholesaler"
    },
    {
      "value": "Medical Transportation",
      "label": "Medical Transportation"
    },
    {
      "value": "Medical Courier",
      "label": "Medical Courier"
    },
    {
      "value": "Media Consultant",
      "label": "Media Consultant"
    },
    {
      "value": "Medical (Building/Office/Labs)",
      "label": "Medical (Building/Office/Labs)"
    },
    {
      "value": "Mechanical Engineer",
      "label": "Mechanical Engineer"
    },
    {
      "value": "Mechanic",
      "label": "Mechanic"
    },
    {
      "value": "Meat Packing Plant",
      "label": "Meat Packing Plant"
    },
    {
      "value": "Meet Market",
      "label": "Meet Market"
    },
    {
      "value": "Meals On Wheels",
      "label": "Meals On Wheels"
    },
    {
      "value": "Mattress",
      "label": "Mattress"
    },
    {
      "value": "Retailer Retailer",
      "label": "Retailer Retailer"
    },
    {
      "value": "Masseur/Masseuse",
      "label": "Masseur/Masseuse"
    },
    {
      "value": "Massage Therapist/Massotherapist",
      "label": "Massage Therapist/Massotherapist"
    },
    {
      "value": "Mason",
      "label": "Mason"
    },
    {
      "value": "Mary Kay",
      "label": "Mary Kay"
    },
    {
      "value": "Martial Art Instructor",
      "label": "Martial Art Instructor"
    },
    {
      "value": "Marriage Counselor",
      "label": "Marriage Counselor"
    },
    {
      "value": "Marketing Representative",
      "label": "Marketing Representative"
    },
    {
      "value": "Marketing Consultant",
      "label": "Marketing Consultant"
    },
    {
      "value": "Marketing Analyst",
      "label": "Marketing Analyst"
    },
    {
      "value": "Market (Food)",
      "label": "Market (Food)"
    },
    {
      "value": "Marine Supply Wholesaler",
      "label": "Marine Supply Wholesaler"
    },
    {
      "value": "Marine Supply (Retail)",
      "label": "Marine Supply (Retail)"
    },
    {
      "value": "Marina",
      "label": "Marina"
    },
    {
      "value": "Marble Work",
      "label": "Marble Work"
    },
    {
      "value": "Manufacturer",
      "label": "Manufacturer"
    },
    {
      "value": "Manicurist",
      "label": "Manicurist"
    },
    {
      "value": "Managerial Firms/Services",
      "label": "Managerial Firms/Services"
    },
    {
      "value": "Management Consulting",
      "label": "Management Consulting"
    },
    {
      "value": "Mall",
      "label": "Mall"
    },
    {
      "value": "Make-Up-Artist",
      "label": "Make-Up-Artist"
    },
    {
      "value": "Maintenance Person",
      "label": "Maintenance Person"
    },
    {
      "value": "Mailing Service",
      "label": "Mailing Service"
    },
    {
      "value": "Mail Carrier",
      "label": "Mail Carrier"
    },
    {
      "value": "Maid",
      "label": "Maid"
    },
    {
      "value": "Magician",
      "label": "Magician"
    },
    {
      "value": "Magazine Delivery",
      "label": "Magazine Delivery"
    },
    {
      "value": "Magazine Company",
      "label": "Magazine Company"
    },
    {
      "value": "Machinery Rental & Leasing",
      "label": "Machinery Rental & Leasing"
    },
    {
      "value": "Machinery & Heavy Equipment Hauling",
      "label": "Machinery & Heavy Equipment Hauling"
    },
    {
      "value": "Lyft",
      "label": "Lyft"
    },
    {
      "value": "Lunch Truck/Wagon",
      "label": "Lunch Truck/Wagon"
    },
    {
      "value": "Lumberjack",
      "label": "Lumberjack"
    },
    {
      "value": "Lumber Yard",
      "label": "Lumber Yard"
    },
    {
      "value": "Lumber Supply Store",
      "label": "Lumber Supply Store"
    },
    {
      "value": "Lube Oil Service Center",
      "label": "Lube Oil Service Center"
    },
    {
      "value": "Lounge",
      "label": "Lounge"
    },
    {
      "value": "Long Haul Trucking",
      "label": "Long Haul Trucking"
    },
    {
      "value": "Logging Trucker",
      "label": "Logging Trucker"
    },
    {
      "value": "Log Transport",
      "label": "Log Transport"
    },
    {
      "value": "Locksmith/Key Duplication Shop",
      "label": "Locksmith/Key Duplication Shop"
    },
    {
      "value": "Local Cartage/Trucking",
      "label": "Local Cartage/Trucking"
    },
    {
      "value": "Loan Company",
      "label": "Loan Company"
    },
    {
      "value": "Livestock Wholesaler",
      "label": "Livestock Wholesaler"
    },
    {
      "value": "Live Hauling (For A Fee)",
      "label": "Live Hauling (For A Fee)"
    },
    {
      "value": "Livestock Farming Production",
      "label": "Livestock Farming Production"
    },
    {
      "value": "Livery (For Hire)",
      "label": "Livery (For Hire)"
    },
    {
      "value": "Liquor Store",
      "label": "Liquor Store"
    },
    {
      "value": "Liquidation Store",
      "label": "Liquidation Store"
    },
    {
      "value": "Linen Supply",
      "label": "Linen Supply"
    },
    {
      "value": "Limousine",
      "label": "Limousine"
    },
    {
      "value": "Limo (Airport)",
      "label": "Limo (Airport)"
    },
    {
      "value": "Lighting Technician/Consultant",
      "label": "Lighting Technician/Consultant"
    },
    {
      "value": "Lie Dector Services",
      "label": "Lie Dector Services"
    },
    {
      "value": "Libarary",
      "label": "Libarary"
    },
    {
      "value": "Leveling",
      "label": "Leveling"
    },
    {
      "value": "Letter Delivery",
      "label": "Letter Delivery"
    },
    {
      "value": "Less Than Truckload Carrier (For Hire)",
      "label": "Less Than Truckload Carrier (For Hire)"
    },
    {
      "value": "Lending Institution",
      "label": "Lending Institution"
    },
    {
      "value": "Legal Consultant",
      "label": "Legal Consultant"
    },
    {
      "value": "Lecturer",
      "label": "Lecturer"
    },
    {
      "value": "Leasing And Rental Firm Companies",
      "label": "Leasing And Rental Firm Companies"
    },
    {
      "value": "Leasing Agent(Home)",
      "label": "Leasing Agent(Home)"
    },
    {
      "value": "Leased- On Trucker",
      "label": "Leased- On Trucker"
    },
    {
      "value": "Learning Center",
      "label": "Learning Center"
    },
    {
      "value": "Lawyer",
      "label": "Lawyer"
    },
    {
      "value": "Lawn Care",
      "label": "Lawn Care"
    },
    {
      "value": "Laundry Services",
      "label": "Laundry Services"
    },
    {
      "value": "Laundromat",
      "label": "Laundromat"
    },
    {
      "value": "Laser Vision Center",
      "label": "Laser Vision Center"
    },
    {
      "value": "Landscaping Snowplowing And Firewood",
      "label": "Landscaping Snowplowing And Firewood"
    },
    {
      "value": "Landscaping Lawn Garden & Tree",
      "label": "Landscaping Lawn Garden & Tree"
    },
    {
      "value": "Landscaping Land Clearing/Gardening",
      "label": "Landscaping Land Clearing/Gardening"
    },
    {
      "value": "Lamination Services",
      "label": "Lamination Services"
    },
    {
      "value": "Laboratory(None Medical)",
      "label": "Laboratory(None Medical)"
    },
    {
      "value": "Labor Organization/Union",
      "label": "Labor Organization/Union"
    },
    {
      "value": "Kitchen Remodeling",
      "label": "Kitchen Remodeling"
    },
    {
      "value": "Kids Camp",
      "label": "Kids Camp"
    },
    {
      "value": "Kiddie Park",
      "label": "Kiddie Park"
    },
    {
      "value": "Kennel",
      "label": "Kennel"
    },
    {
      "value": "Karaoke Services/Dj",
      "label": "Karaoke Services/Dj"
    },
    {
      "value": "Junkyard",
      "label": "Junkyard"
    },
    {
      "value": "Juggler Job Trainer Services",
      "label": "Juggler Job Trainer Services"
    },
    {
      "value": "Jewelry Store/Jeweler",
      "label": "Jewelry Store/Jeweler"
    },
    {
      "value": "Jewelry Repair",
      "label": "Jewelry Repair"
    },
    {
      "value": "Jewelry Appraiser",
      "label": "Jewelry Appraiser"
    },
    {
      "value": "Janitor",
      "label": "Janitor"
    },
    {
      "value": "Investment Firm",
      "label": "Investment Firm"
    },
    {
      "value": "Investment Advisor/Banker",
      "label": "Investment Advisor/Banker"
    },
    {
      "value": "Investigator",
      "label": "Investigator"
    },
    {
      "value": "Inventory Services",
      "label": "Inventory Services"
    },
    {
      "value": "Inventor",
      "label": "Inventor"
    },
    {
      "value": "Interstate Trucker",
      "label": "Interstate Trucker"
    },
    {
      "value": "Interpreter",
      "label": "Interpreter"
    },
    {
      "value": "Internet Consultant/Designer/Publisher",
      "label": "Internet Consultant/Designer/Publisher"
    },
    {
      "value": "Intermodal Trucking",
      "label": "Intermodal Trucking"
    },
    {
      "value": "Interior Decode Sales (Pampered Chef Etc)",
      "label": "Interior Decode Sales (Pampered Chef Etc)"
    },
    {
      "value": "Insurance Services/Company",
      "label": "Insurance Services/Company"
    },
    {
      "value": "Insurance Agent/Broker",
      "label": "Insurance Agent/Broker"
    },
    {
      "value": "Insulation Installation/Repair",
      "label": "Insulation Installation/Repair"
    },
    {
      "value": "Instructor(Piano)",
      "label": "Instructor(Piano)"
    },
    {
      "value": "Instructor",
      "label": "Instructor"
    },
    {
      "value": "Inspector(Home)",
      "label": "Inspector(Home)"
    },
    {
      "value": "Insect Control",
      "label": "Insect Control"
    },
    {
      "value": "Information Retrieval Service",
      "label": "Information Retrieval Service"
    },
    {
      "value": "Industrial Launderer",
      "label": "Industrial Launderer"
    },
    {
      "value": "Industrial Contractor/Developer",
      "label": "Industrial Contractor/Developer"
    },
    {
      "value": "Independent Trucker",
      "label": "Independent Trucker"
    },
    {
      "value": "Income Tax Services",
      "label": "Income Tax Services"
    },
    {
      "value": "Impound Lot",
      "label": "Impound Lot"
    },
    {
      "value": "Imported Food Store",
      "label": "Imported Food Store"
    },
    {
      "value": "Ice Skating Rink",
      "label": "Ice Skating Rink"
    },
    {
      "value": "Ice Manufacturing",
      "label": "Ice Manufacturing"
    },
    {
      "value": "Ice Cream Vendor",
      "label": "Ice Cream Vendor"
    },
    {
      "value": "Ice Cream Stand/Store/Parlor",
      "label": "Ice Cream Stand/Store/Parlor"
    },
    {
      "value": "Ice Cream Sales( From Vehicle)",
      "label": "Ice Cream Sales( From Vehicle)"
    },
    {
      "value": "",
      "label": ""
    }
  ];

      const handleSelected = (selectedOption) => {
        setBussinesstype(selectedOption.value);
      };

    return (
        <>
            <div className="small-screen-header">
                <div className="Start_Nav d-flex">
                    <div className="Page_Position gap-2 d-flex  align-items-center">

                        <span className="circle_position"><span className="first_name">1</span><span className="outof">/5</span></span>
                        <span className="Page_Name">Start</span>

                    </div>
                    <div className="next-page">
                        <span className="next-step">Next step</span>
                        <span className="vehicles" onClick={() => { handleNavigationClick("vehicles") }}>Vehicles</span>

                    </div>
                </div>
            </div>
            
            <section className='start-hero-section'>
                <p className="usdotheading">Do you have a USDOT#? </p>
                <p className="usdotcontent">The number is registered to the your business and displayed on the side of the vehicle. Any business  type could have a USDOT registration.</p>
                <div className='radiobtn-part'>
      <form  className='radiobtns'>
        <div className='radiob' style={{ width: '34%' }}>
          <StyledRadio
            name='radiobtn'
            value='Yes'
            checked={selectedOption === 'Yes'}
            onChange={handleRadioChange}
            required
          />
          <label htmlFor='example1' className='radiobtn-label mx-2'>
            Yes
          </label>
        </div>
        <div className='radiob'>
          <StyledRadio
            name='radiobtn'
            value='No'
            checked={selectedOption === 'No'}
            onChange={handleRadioChange}
            
          />
          <label htmlFor='example2' className='radiobtn-label mx-2'>
            No
          </label>
        </div>
        <div className='radiob'>
          <StyledRadio
            name='radiobtn'
            value='Not Yet'
            checked={selectedOption === 'Not Yet'}
            onChange={handleRadioChange}
          />
          <label htmlFor='example3' className='radiobtn-label mx-2'>
            Not Yet - but the customer has applied/will apply for a USDOT number within 60 days.
          </label>
        </div>
      </form>
    </div>

            </section>
            <section className='business-type-section'>
            <form onSubmit={handleButtonClick}>
                <p className="business-type-heading">Most Common Business Types:</p>
                <div className='business-type row'>
                    <div className='col-md-5'>
                    <Select
      options={options}
      onChange={handleSelected}
      value={options.find((option) => option.value === bussinesstype)}
      styles={customStyles}
      required
    />
            </div>
                </div>

                <p className="business-owner-info">Home address/personal information of the business owner</p>
                <div className='owner-info-form'>
                    <div className="name-part">
                        <p className="name-txt">Business owner name</p>
                        <div className="name-fields">
                            <div className="inner-part">
                                <input class="form-control form-control-lg full-name" type="text" placeholder="First Name" aria-label=".form-control-lg example" value={fullname} onChange={(e) => { setFullname(e.target.value) }} required />
                                <input class="form-control form-control-lg mi" type="text" placeholder="MI" aria-label=".form-control-lg example" value={middlename} onChange={(e) => { setMiddlename(e.target.value) }} />
                            </div>
                            <div className="inner-part">
                                <input class="form-control form-control-lg last-name" type="text" placeholder="Last Name" aria-label=".form-control-lg example" value={lastname} onChange={(e) => { setLastname(e.target.value) }} required/>
                                <input class="form-control form-control-lg sufix" type="text" placeholder="Suffix" aria-label=".form-control-lg example" value={suffix} onChange={(e) => { setSuffix(e.target.value) }} required />
                            </div>
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Street Address</p>
                        <div className="address-autocomplete">
                            <PlacesAutocomplete
                                value={address}
                                onChange={(value) => setAddress(value)}
                                onSelect={handleSelect}
                                searchOptions={searchOptions}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Home address',
                                                className: 'form-control form-control-lg full-field',
                                            })}
                                        />
                                        <div className="suggestions-container">
                                            {loading && <div> <Skeleton active /></div>}
                                            {suggestions.map((suggestion) => (
                                                <div className='suggestion' key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </div>


                    <div className='name-part'>
                        <p className="name-txt">Apt/Suite/Other:(Optional)</p>
                        <div className="name-fields">
                            <input value={appartment} onChange={(e) => { setAppartment(e.target.value) }} class="form-control form-control-lg full-field" />
                        </div>
                    </div>



                    <div className="name-part">
                        <p className="name-txt">Zip Code:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" value={zip} aria-label=".form-control-lg example" readOnly />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">City:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" value={city}  readOnly/>
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Date of Birth:</p>
                        <div className="name-fields">
                        <input
  className="form-control form-control-lg full-field"
  type="date"
  aria-label=".form-control-lg example"
  value={dateofBirth}
  onChange={(e) => { setDateofBirth(e.target.value) }}
  style={{
    color: dateofBirth !== '' ? 'black' : 'grey',
  }} 
   required
/>



                        </div>
                    </div>
                    <div className="name-part">
      <p className="name-txt">Phone Number</p>
      <div className="name-fields">
        <div className="row numberrow">
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field numberfields"
              type="number"
              maxLength="3"
              required
              onChange={(e) => handleInputChange(e, middlePartInput)}
              value={areaCode}
              name="areaCode"
             
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field numberfields"
              type="number"
              maxLength="3"
              onChange={(e) => handleInputChange(e, lastPartInput)}
              value={middlePart}
              name="middlePart"
              required
              ref={(input) => {
                middlePartInput = input;
              }}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field numberfields"
              type="number"
              maxLength="4"
              onChange={(e) => handleInputChange(e)}
              value={lastPart}
              name="lastPart"
              required
              ref={(input) => {
                lastPartInput = input;
              }}
            />
          </div>
        </div>
      </div>
   
    </div>

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
                    <button className="continous_button" type="submit" onClick={handleButtonClick}>
                        <Spin spinning={loading}>

                            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i></Spin>
                    </button>
                </div>
                </form>  </section>
            <Modal
        title="USDOT number"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { background: '#2a4764', color: 'white' } }}

      >
          
        {/* Ant Design Input for USDOT number */}
        <Input
          value={usdotnum}
          onChange={(e) => setUsdotnum(e.target.value)}
          placeholder="Enter USDOT number"
          
        />
      </Modal>
        </>
    )
}
export default StartPage