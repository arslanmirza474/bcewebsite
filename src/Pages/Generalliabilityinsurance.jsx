import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import sectionimg from "./images/section_title_shape.png"
import thumb6 from "./images/platform_thumb_6.png"
import thumb5 from "./images/quotes_thumb_5.png"
import shield from "./images/ShieldChevron.svg"
import truck from "./images/Truck.svg"
import check from "./images/quotes_ico_3.svg"
function Generalliabilityinsurance (){
    return(
        <>
     <Navbar/>
  {/* =================== BREADCRUMB AREA START ===================== */}
  <section
    className="breadcrumb__area"
   
  >
    <div className="container">
      <div
        className="breadcrumb__inner__blk"
        data-aos="fade-up"
        data-aos-delay={50}
        data-aos-duration={1000}
      >
        <p>
          <Link to="/">
          <i class="fa-solid fa-angle-left"/>  Home/
          </Link>
          General liability insurance
        </p>
        <h4>General liability insurance</h4>
      </div>
    </div>
  </section>
  {/* =================== BREADCRUMB AREA END ===================== */}
  {/* =================== PLATFORM AREA START ===================== */}
  <section className="platform__area">
    <div className="container">
      <div className="row g-4">
        <div
          className="col-xl-6"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1000}
        >
          <div
            className="section__title text-start"
            style={{ maxWidth: "100%" }}
          >
            <span>We help you at any time</span>
            <h3>What is general liability insurance?</h3>
            <div className="section__title__shape">
              <img src={sectionimg} alt="" />
            </div>
            <p>
              This insurance shields businesses from financial losses resulting
              from lawsuits or claims related to property damage, bodily injury,
              or other harm caused by their operations. It covers expenses such
              as legal fees, settlements, and judgments.
            </p>
          </div>
          <div className="similar__btn__blk">
            <Link to="/quote ">Get a quote</Link>
            <Link to="/contactus" className="btn_bg_transparent">
              Contact us
            </Link>
          </div>
        </div>
        <div className="col-xl-6">
          <div
            className="platform__thumb"
            data-aos="zoom-in"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <img src={thumb6} alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== PLATFORM AREA END ===================== */}
  {/* =================== QUOTES AREA START ===================== */}
  <section className="quotes__area pt-0">
    <div className="container">
      <div
        className="section__title"
        data-aos="fade-up"
        data-aos-delay={50}
        data-aos-duration={1000}
      >
        <span>Do the same as thousands of customers</span>
        <h3>3 Reasons for getting GL insurance</h3>
        <div className="section__title__shape">
          <img src={sectionimg} alt="" />
        </div>
      </div>
      <div className="quotes__second__style">
        <div className="row g-4 reverser">
          <div className="col-lg-5">
            <div
              className="quotes__thumb__blk"
              data-aos="zoom-in"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="quotes__thumb quotes__thumb__left__radius">
                <img src={thumb5} alt="" />
              </div>
              <div className="quptes__thumb__card__blk">
                <div className="quotes__thumb__card">
                  <span>
                    <img src={truck} alt="" />
                  </span>
                  <p>Safety in your truck</p>
                </div>
                <div className="quotes__thumb__card">
                  <span>
                    <img src={shield} alt="" />
                  </span>
                  <p>24 hour protection</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div
              className="quotes__content"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="single__quotes__content__blk">
                <span>
                  <img src={check} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>
                    Protects against financial loss if the trucker is at fault
                    of an accident
                  </h5>
                  <p>
                    General liability insurance can assist in covering property
                    damage or medical expenses if a trucker is deemed at fault
                    in an accident.
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                <img src={check} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Required by some brokers and shippers</h5>
                  <p>
                    Depending on the broker or shipper's requirements,
                    commercial truckers may need to have general liability
                    insurance as a condition of their employment.
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                <img src={check} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Provides peace of mind</h5>
                  <p>
                    General liability insurance provides commercial truckers
                    with peace of mind, knowing they are financially protected
                    in the event of an accident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== QUOTS AREA END ===================== */}
<Footer/>

        </>
    )
}
export default Generalliabilityinsurance