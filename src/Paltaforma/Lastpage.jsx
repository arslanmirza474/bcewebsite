
import './forma.css';
import headerlogo from '../Pages/images/LOGO BOLANOS 2024 PDF.svg';
import done from "./images/Group 6674.png"
function Lastpage(){
    return(
        <>
            <div className="main_header_section">
        <div className="Header_text">
          <img src={headerlogo} alt="headerlogo" className="header_logo" />
          <span className="onboarding">Onboarding</span>
        </div>
      </div>
      <div className="header_body_section">
        <div className='container'>
            <div className='done-main'>
            <img src={done} alt='done'/>
            <p className="doneheading">Congratulations on a successful budget!</p>
            <p className="donecontent">Our team will contact you within 24 hours with all the details of the quote.</p>
            </div>
        </div>
      </div>
        </>
    )
}
export default Lastpage