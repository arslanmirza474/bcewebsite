import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './detail.css'; // Import a CSS file for styling
import { Tag ,Button} from 'antd';


const backButtonStyle = {
  marginRight: '8px', // Adjust margin as needed
  background: '#1890ff', // Primary color
  color: 'white', // Text color
  border: '1px solid #1890ff', // Border color
  borderRadius: '4px', // Border radius
  fontWeight: 'bold', // Font weight
  marginRight:"20px"
};
const DetailPage = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [detailData, setDetailData] = useState({});
  const [vehicledata, setVehicledata] = useState([]);
  const [driverdata, setDriverdata] = useState([]);
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true); 
 const [message, setMessage]=useState([])
const [coverage,setCoverage]=useState([])
  useEffect(() => {
    fetchData();
    fetchdriver()
    fetchcoverage()
  }, [id]);
  const fetchcoverage =()=>{
    axios.get(`https://serverforbce.vercel.app/api/getcoveragebyid/${id}`)
    .then(res=>{
      setCoverage(res.data.data)
    }
    )
  }
  const fetchdriver =()=>{
    if (id) {
      axios.get(`https://serverforbce.vercel.app/api/getdriverbyinforid/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setDriverdata(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
          // Handle the error, e.g., display an error message to the user
        });
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://serverforbce.vercel.app/api/getinformationbyid/${id}`);
      setDetailData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };
  useEffect(() => {
    if (id) {
      axios.get(`https://serverforbce.vercel.app/api/getvehicalbyinforid/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setVehicledata(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      axios.get(`https://serverforbce.vercel.app/api/getbussinessbyinfo/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setBusiness(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      axios.get(`https://serverforbce.vercel.app/api/getmeesagebyinformid/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setMessage(res.data.data);
            console.log(message)
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
        });
    }
  }, [id]);
  const navigate =useNavigate()
  const dashboardpage =()=>{
    navigate("/dashboard")
  }
  return (
    <>
 <Button className='mx-3 mt-3' type="default" style={backButtonStyle} onClick={dashboardpage}>
 <i class="fa-solid fa-arrow-left"></i>
    </Button>   <div className='container'>
  <h1> <Tag color="red">1</Tag>Contact Status</h1>
  <div className='row' style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
    {
      message.length === 0 ? (
        <div className='col-md-12 mt-3'>
          <Tag color="red">Not contacted yet</Tag>
        </div>
      ) : (
        message.map((msg, index) => (
          <React.Fragment key={index}>
            <div className='col-md-1 mt-3'>
              <Tag color="green">{index + 1}</Tag>
            </div>
            <div className='col-md-5 mt-3'>
              {msg.Message}
            </div>
          </React.Fragment>
        ))
      )
    }
  </div>
</div>

    <div className='container'>
      <h1><Tag color="red">2</Tag>Start</h1>
      <div className='container' style={{backgroundColor:"white",borderRadius:"20px"}}>

         <div className='row' >
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Business Type:</strong>
        </div>
        <div>{detailData?.bussinesstype}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Full Name:</strong>
        </div>
        <div>{detailData?.fullname}</div>
      </div>
        </div>
      </div>
     

      <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Do you have a USDOT#? :</strong>
        </div>
        <div>{detailData?.selectedOption}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Middle Name:</strong>
        </div>
        <div>{detailData?.middlename}</div>
      </div>
        </div>
      </div> 
       <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Last Name:</strong>
        </div>
        <div>{detailData?.lastname}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Suffix:</strong>
        </div>
        <div>{detailData?.suffix}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Address:</strong>
        </div>
        <div>{detailData?.address}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Zip:</strong>
        </div>
        <div>{detailData?.zip}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>City:</strong>
        </div>
        <div>{detailData?.city}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Date of Birth:</strong>
        </div>
        <div>{detailData?.dateofBirth}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Phone Number:</strong>
        </div>
        <div>{detailData?.phonenumber}</div>
      </div>
        </div>

      </div>
      </div>
     

    </div>
    <div className='container ' style={{borderRadius:"10px"}}>
    <h1><Tag color="red">3</Tag>Vehicle</h1>

        {
            vehicledata.map((vehicle)=>{
                return(
                     < div className='container mt-3' style={{backgroundColor:"white",borderRadius:"10px"}}>
                 <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>selectedTruck :</strong>
                </div>
                <div>{vehicle.selectedTruck}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Zip:</strong>
                </div>
                <div>{vehicle.zipCode}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>distance :</strong>
                </div>
                <div>{vehicle.distance}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Coll:</strong>
                </div>
                <div>{vehicle.needCoverage}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>vehicleWorth :</strong>
                </div>
                <div>{vehicle.vehicleWorth}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Vehical by:</strong>
                </div>
                <div>{vehicle.vehicalby}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Vin :</strong>
                </div>
                <div>{vehicle.Vin}</div>
              </div>
                </div>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Comprehensive :</strong>
                </div>
                <div>{vehicle.comprehensive}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
               
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Collision :</strong>
                </div>
                <div>{vehicle.collision}</div>
              </div>
                </div>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Year :</strong>
                </div>
                <div>{vehicle.year}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
               
               <div className='col-md-6'>
                    <div className='detail-item'>
               <div>
                 <strong>Make :</strong>
               </div>
               <div>{vehicle.make}</div>
             </div>
               </div>
               <div className='col-md-6'>
                    <div className='detail-item'>
               <div>
                 <strong>Model :</strong>
               </div>
               <div>{vehicle.model}</div>
             </div>
               </div>
             </div> 
                </div>
               
                )
               
              
            })
        }
    </div>


    <div className='container ' style={{borderRadius:"10px"}}>
    <h1><Tag color="red">4</Tag>Driver</h1>

        {
            driverdata.map((vehicle)=>{
                return(
                     < div className='container mt-3' style={{backgroundColor:"white",borderRadius:"10px"}}>
                 <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>First Name :</strong>
                </div>
                <div>{vehicle.fullName}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Middle Name:</strong>
                </div>
                <div>{vehicle.middleInitial}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Last Name :</strong>
                </div>
                <div>{vehicle.lastName}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Date Of birth:</strong>
                </div>
                <div>{vehicle.dob}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Lisence State :</strong>
                </div>
                <div>{vehicle.licenseState}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Lisence Number:</strong>
                </div>
                <div>{vehicle.licenseNumber}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>CDL :</strong>
                </div>
                <div>{vehicle.selectedValue}</div>
              </div>
                </div>

              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Years :</strong>
                </div>
                <div>{vehicle.expyear}</div>
              </div>
                </div>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Months :</strong>
                </div>
                <div>{vehicle.expmonth}</div>
              </div>
                </div>

              </div>
                </div>
               
                )
               
              
            })
        }





    </div>

    <div className='container'>
      <h1><Tag color="red">5</Tag>About Bussiness</h1>
      <div className='container' style={{backgroundColor:"white",borderRadius:"20px"}}>

         <div className='row' >
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Business Email Address:</strong>
        </div>
        <div>{business[0]?.customerEmail}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Is the Business Currently insured?</strong>
        </div>
        <div>{business[0]?.currentlyInsured}</div>
      </div>
        </div>
      </div>
     

      <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Have you had continuous coverage?</strong>
        </div>
        <div>
            
            
            {business[0]?.continuousCoverage}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Currently Bodily injury Liability Limit</strong>
        </div>
        <div>{business[0]?.bodilyInjuryLimit}</div>
      </div>
        </div>
      </div> 
       <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Current Policy Expiration Date:</strong>
        </div>
        <div>{business[0]?.policyExpirationDate}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Do you have an MC# or do you plan cross state lines?</strong>
        </div>
        <div>{business[0]?.hasMCNumber}</div>
      </div>
        </div>
      </div>  
   
      </div>
     

    </div>
    <div className='container ' style={{borderRadius:"10px"}}>
    <h1><Tag color="red">6</Tag>Covrage</h1>

        {
            coverage.map((vehicle)=>{
                return(
                     < div className='container mt-3' style={{backgroundColor:"white",borderRadius:"10px"}}>
                 <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong> Bodily injury and Property Damage Liability :</strong>
                </div>
                <div>{vehicle.uninsured}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Uninsured/underinsured Motorist Bodily injury*:</strong>
                </div>
                <div>{vehicle.bodilyinsurance}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong> Non-Trucking Liability:</strong>
                </div>
                <div>{vehicle.nontrucking}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Personal injury Protection:</strong>
                </div>
                <div>{vehicle.personpro}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Motor Truck Cargo:</strong>
                </div>
                <div>{vehicle.motortruck}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Trailer Interchange:</strong>
                </div>
                <div>{vehicle.trailerinter}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>General Liability:</strong>
                </div>
                <div>{vehicle.general}</div>
              </div>
                </div>

              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong> UM/UIM BI CSL w/Deductible :</strong>
                </div>
                <div>{vehicle.damage}</div>
              </div>
                </div>
              </div>
                </div>
               
                )
               
              
            })
        }





    </div>
    <Button className='mx-3 mb-3 float-end' type="default" style={backButtonStyle} onClick={dashboardpage}>
 <i class="fa-solid fa-arrow-left"></i>
    </Button>  
    </>
    
  );
};

export default DetailPage;
