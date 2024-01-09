
import { useEffect, useState } from "react";
import "./business.css"
import axios from "axios";
import {notification } from 'antd';
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
function AboutBusinessPage({ changeIcon,handleNavigationClick }){

  const [customerEmail, setCustomerEmail] = useState('');
  const [currentlyInsured, setCurrentlyInsured] = useState(null);
  const [continuousCoverage, setContinuousCoverage] = useState(null);
  const [bodilyInjuryLimit, setBodilyInjuryLimit] = useState('');
  const [policyExpirationDate, setPolicyExpirationDate] = useState('');
  const [hasMCNumber, setHasMCNumber] = useState(null);
  const [informId, setInformId] = useState("")
 const[back, setBack]=useState(null)
  useEffect(() => {
    const informationId = localStorage.getItem("mainid");
    if (informationId) {
      setInformId(informationId);
      fetchalldata()
    }
  }, [informId]);
  useEffect(() => {
    fetchalldata()
    }, [informId]);

 const fetchalldata =async()=>{
   if (informId) {
     await axios.get(`https://serverforbce.vercel.app/api/getbussinessbyinfo/${informId}`)
        .then(res => {
          if (res.data.status === true) {
            const businessData = res.data.data;
            console.log(businessData)
              setBack(businessData[0]._id);
              setCustomerEmail(businessData[0].customerEmail);
              setCurrentlyInsured(businessData[0].currentlyInsured);
              setContinuousCoverage(businessData[0].continuousCoverage);
              setBodilyInjuryLimit(businessData[0].bodilyInjuryLimit);
              setPolicyExpirationDate(businessData[0].policyExpirationDate);
              setHasMCNumber(businessData[0].hasMCNumber);
          }
         
        })
        .catch(error => {
          console.error("Error fetching business data:", error);
        });
    }
 }
   console.log(policyExpirationDate)
 const verifyemail = async (e) => {
  const form = e.target.form;

  // Manually check form validity
  if (!form.checkValidity()) {
    // If form is invalid, show an error message or handle it accordingly
    openNotification("error", "Please fill in all required fields.");
    return;
  }

  e.preventDefault();
  console.log('Before axios.post');
  await axios.post(`https://serverforbce.vercel.app/api/verifyemail/${customerEmail}`)
    .then(res => {
      console.log('After axios.post');
      if (res.data.data.status != "invalid") {
        handleButtonClick()
      }else{
        openNotification('error', 'Please Enter Valid Email');
 
      }
    })
    .catch(error => {
      console.error('Error in verifyemail:', error);
    });
};

  
  
  const handleButtonClick = async() => {
 
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 



    if (
      customerEmail &&
      emailRegex.test(customerEmail) && // Check if customerEmail is a valid email
      currentlyInsured !== null &&
      // continuousCoverage &&
      // bodilyInjuryLimit &&
      // policyExpirationDate &&
      hasMCNumber !== null
    ) {
      const businessData = {
        customerEmail,
        currentlyInsured,
        continuousCoverage,
        bodilyInjuryLimit,
        policyExpirationDate,
        hasMCNumber,
      };

      if (back) {
        // If back data exists, update the existing business data
        axios.put(`https://serverforbce.vercel.app/api/updatebusiness/${back}`, businessData)
          .then(res => {
            if (res.data.status === true) {
              openNotification('success', 'Data updated successfully');
              changeIcon('fa-regular fa-circle-check green-icon');
              handleNavigationClick('coverages');
            }
          })
          .catch(error => {
            console.error("Error during request:", error);
            alert("Error during request. Please try again.");
          });
      } else {
        // If back data doesn't exist, add new business data
        axios.post("https://serverforbce.vercel.app/api/postbusiness", {
          informId,
          ...businessData,
        })
          .then(res => {
            if (res.data.status === true) {
              openNotification('success', 'Data added successfully');
              changeIcon('fa-regular fa-circle-check green-icon');
              handleNavigationClick('coverages');
            }
          })  .catch(error => {
            console.error("Error during request:", error);
            alert("Error during request. Please try again.");
          });
  }
    
        
     
    } else {
      openNotification('error', 'Please enter a valid email address and complete all required fields.');
    }
  };
  
  

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
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
    setBodilyInjuryLimit(formatNumberWithCommas(inputValue));
  };
  console.log(currentlyInsured)
    return(
        <>
         <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">4</span><span className="outof">/5</span></span>
            <span className="Page_Name">About Business</span>
           
        </div>
        <div className="next-page">
            <span className="next-step">Next step</span>
            <span className="vehicles"onClick={()=>{handleNavigationClick("coverages")}}>Coverages</span>

        </div>
       </div>
       </div>
       <div className="businesspage">
        <form onSubmit={verifyemail}>
        <span className="business_heading">About The  Business</span>
        <div className="row align-items-center abt-bsns">
          <div className="col-md-4 customer_email forlbl">
          Business Email Address
          </div>
          <div className="col-md-5 formail">
            <input
              className="customer_email_input"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="business_heading2">
        Insurance History
        </div>
        <div className="customer_email">
        Is the Business Currently insured?<br></br>
        <div className="row">
            <div className="col-md-5 dimtester forlbl">
            (Personal Auto policies in the owner’s name also qualify for prior insurance)            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="radiobutns inputflds">
                <label className="radio-label">
                   <StyledRadio
   checked={currentlyInsured === true}
   onChange={() => setCurrentlyInsured(true)}
   value={currentlyInsured}
   name="currentlyInsured"
  className="col-md-1 radio-input"
  required
/>

                  Yes
                </label>
                <label className="radio-label">
                <StyledRadio
   checked={currentlyInsured === false}
   onChange={() => setCurrentlyInsured(false)}
  value={currentlyInsured}
  name="currentlyInsured"
  className="col-md-1 radio-input"
/>
                  No
                </label>
            


              </div>
            </div>
          </div>

        </div>
        {currentlyInsured ? (
        <>
          {/* Continuous Coverage Section */}
          <div className="row customercoverage">
            <div className="col-md-5 forlbl">
              Has the customer had continuous coverage? <br></br> <span className="dimtester">(At least 1 year)</span>
            </div>
            <div className="col-md-5 d-flex align-items-center inputflds">
              <div className="radiobutns">
                {/* "Yes" option */}
                <label className="radio-label">
                  <StyledRadio
                    type="radio"
                    name="continuousCoverage"
                    className="col-md-1 radio-input"
                    value="Yes"
                    onChange={() => setContinuousCoverage(true)}
                    checked={continuousCoverage === true}
                  />
                  Yes
                </label>
                {/* "No" option */}
                <label className="radio-label mx-1">
                  
                  
               <StyledRadio
 onChange={() => setContinuousCoverage(false)}
 checked={continuousCoverage === false}
  value="Yes"
  name="continuousCoverage"
  className="col-md-1 radio-input"
/>
                  No
                </label>
                
                
              </div>
            </div>
          </div>

          {/* Bodily Injury Liability Limit Section */}
          <div className="row cstmremail">
            <div className="col-md-4 forlbl">
              <div className="customer_email">Currently Bodily injury Liability Limit</div>
            </div>
            <div className="col-md-5">
              <input
                  value={bodilyInjuryLimit}
                className="customer_email_input inputflds"
                onChange={handleInputChange}
                placeholder="$1,000,000 combined single limit"
              />
                 
            </div>
          </div>

          {/* Current Policy Expiration Date Section */}
          <div className="row cstmremail">
            <div className="col-md-4">
              <div className="customer_email forlbl">Current Policy Expiration Date:</div>
            </div>
            <div className="col-md-5">
              <input
                type="date"
                className="customer_email_input inputflds"
                onChange={(e) => setPolicyExpirationDate(e.target.value)}
                value={policyExpirationDate}
                style={{
                  color: policyExpirationDate !== '' ? 'black' : 'grey',
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}        
        <div className="business_heading2">
        Filing Proof of insurances
        </div>
        <div className="row mt-2">
            <div className="col-md-5 forlbl">
              <span className="interfont">
               Do you have an MC# or do you plan cross <br/> state lines?
              </span>
           

            </div>
            <div className="col-md-5 d-flex align-items-center">
            <div className="radiobutns inputflds">
            <label className="radio-label">
           
               <StyledRadio
   onChange={() => setHasMCNumber(true)}
   checked={hasMCNumber === true}
   value={hasMCNumber}
   name="radi"
  className="col-md-1 radio-input"
  required
/>
              Yes
            </label>
            <label className="radio-label mx-1">
          
              <StyledRadio
    checked={hasMCNumber === false}
   onChange={() => setHasMCNumber(false)}
  value={hasMCNumber}
  name="radi"
  className="col-md-1 radio-input"
/>
              No
            </label>
          </div>
   
             </div>
           
        </div>
        <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("drivers")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("drivers")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" type="submit" onClick={verifyemail}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          </form></div>
        </>
    )
}
export default AboutBusinessPage