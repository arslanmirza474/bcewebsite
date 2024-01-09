import React, { useState } from 'react';
import mobilelogo from "./images/LOGO BOLANOS 2024 PDF.svg"
import clossmenu from "./images/close_menu.svg"
import logo from "./images/LOGO BOLANOS 2024 PDF.svg"
import menubar from "./images/menu_bar.svg"
import { Link } from 'react-router-dom';
function Navbar(){
  
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setMenuOpen(!isMenuOpen);
    };
    return(
        <>
         
         <div className={`offcanvas__menu ${isMenuOpen ? 'open' : ''}`}>
    <div className="mobile_logo">
      <a href="#">
        <img className='headerlogo' style={{width:"136px", height:"71px"}} src={mobilelogo} alt="" />
      </a>
    </div>
    <div className="header__right__blk">
      <div className="main__menu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                to="#"
              >
                Products &amp; Services <i class="fa-solid fa-angle-down"></i>
              </Link>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse dropdown__menu"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <ul>
                  <li>
                    <Link to="/auto-mobile-insurance">Auto liability insurance</Link>
                  </li>
                  <li>
                    <Link to="/general-liability-insurance">General liability insurance</Link>
                  </li>
                  <li>
                    <Link to="/motor-cargo-insurance">Motor truck cargo insurance</Link>
                  </li>
                  <li>
                    <Link to="/physical-damage-insurance">Physical demage insurance</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="/contactus">FAQ &amp; Resources</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__btn">
        <Link to="/login" className="common__btn" >
          Login
        </Link>
        <a href="#" className="common__btn dark_bg_btn">
          Get a quote
        </a>
      </div>
    </div>
    <div className="close__menu">
      <img src={clossmenu} alt="" onClick={handleMenuToggle} />
    </div>
  </div>
  {/* =================== HEADER AREA START ===================== */}
  <header className="header__area">
    <div className="container">
      <div className="header__inner__blk">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} className='svg-element' style={{width:"136px", height:"71px",marginRight:"-37px"}} alt="" />
          </Link>
        </div>
        <div className="header__right__blk">
          <div className="main__menu">
            <nav>
              <ul>
                <li>
                  <Link  to="/">Home</Link>
                </li>
                <li>
                  <Link to="">
                    Products &amp; Services  <i class="fa-solid fa-angle-down"></i>
                  </Link>
                  <div className="dropdown__menu">
                    <ul>
                      <li>
                        <Link to="/auto-mobile-insurance">
                          Auto liability insurance
                        </Link>
                      </li>
                      <li>
                        <Link to="/general-liability-insurance">
                          General liability insurance
                        </Link>
                      </li>
                      <li>
                        <Link to="/motor-cargo-insurance">
                          Motor truck cargo insurance
                        </Link>
                      </li>
                      <li>
                        <Link to="/physical-damage-insurance">Physical damage insurance</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/contactus">FAQ &amp; Resources</Link>
                </li>
                <li>
                <Link to="/aboutus">About Us</Link>
                </li>
                {/* <li>
                  <Link to="/signup">Sign up</Link>
                </li> */}
              </ul>
            </nav>
          </div>
          <div className="header__btn">
            {/* <Link to="/login" className="common__btn dark_bg_btn">
              Login
            </Link> */}
            <Link to="/get-a-quote" className="common__btn">
              Get a quote
            </Link>
          </div>
        </div>
        <div className="open__menu">
          <img src={menubar} alt=""  onClick={handleMenuToggle} />
        </div>
      </div>
    </div>
  </header>
  {/* =================== HEADER AREA END ===================== */}
        </>
    )
}
export default Navbar