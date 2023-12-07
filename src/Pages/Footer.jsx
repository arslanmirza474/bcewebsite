import locations from "./images/MapPinLine.svg"
import envolope from "./images/EnvelopeOpen.svg"
import phone from "./images/Phone.svg"
import facebook from "./images/FacebookLogo.svg"
import insta from "./images/InstagramLogo.svg"
import youtube from "./images/youtube.png"
import mianlogo from "./images/LOGO BOLANOS 2024 PDF.svg"
import { Link } from "react-router-dom"
import React from "react"

class Footer extends React.Component {
  handleEmailClick = () => {
    console.log('Email link clicked');
    window.location.href = 'mailto:Operations@bceins.com';
  }
  
  handlePhoneClick = () => {
    console.log('Phone link clicked');
    window.location.href = 'tel:+13015916550';
  }
  render() {
    return(
        <>
          <section
    className="footer__area"
   
  >
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-3">
          <div className="footer__logo">
            <a href="#">
              <img className="svg-element" src={mianlogo} style={{width:"136px", height:"71px"}} alt="" />
            </a>
            <p>Where we drive your insurance needs forward!</p>
          </div>
        </div>
        <div className="col-xl-9">
          <div className="footer__right__blk">
            <div className="footer__list">
              <span>Home</span>
              <ul>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="footer__list">
              <span>About Us</span>
              <ul>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="footer__list">
              <span>Contact</span>
              <div className="footer__contact">
                <a href="#">
                  <span>
                    <img src={locations} alt="" />
                  </span>{" "}
                  66 Waverley Dr. Ste 630, Frederick, MD 21702
                </a>
               
                <Link onClick={this.handleEmailClick}>
  <span>
    <img src={envolope} alt="" />
  </span>{" "}
  Operations@bceins.com
</Link>
<Link  onClick={this.handlePhoneClick}>
  <span>
    <img src={phone} alt="" />
  </span>{" "}
  301-591-6550
</Link>

              </div>
            </div>
            <div className="footer__btn">
              <a href="#" className="common__btn">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom__area">
        <div className="single__footer__bottom__step">
          <a href="#">
            <span>
              <img src={insta} alt="" />
            </span>{" "}
            /bolanoscommercial
          </a>
          <a href="#">
            <span>
              <img src={facebook} alt="" />
            </span>{" "}
            /bolanoscommercial
          </a>
          <a href="#">
            <span>
              <img src={youtube} alt="" />
            </span>{" "}
            /bolanoscommercial
          </a>
        </div>
      </div>
      <div className="footer__copyright__area">
        <p>© 2023 All Rights Reserved. Bolanos Commercial Enterprise, LLC</p>
      </div>
    </div>
  </section>
        </>
    )
}}
export default Footer