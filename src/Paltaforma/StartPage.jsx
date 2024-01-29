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
    },
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