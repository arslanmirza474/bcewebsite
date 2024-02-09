
import { Link } from "react-router-dom"
import shield from "./images/ShieldChevron.svg"
import truck from "./images/Truck.svg"
import sectionimg from "./images/section_title_shape.png"
import Navbar from "./Navbar"
import Footer from "./Footer"
import quote6 from "./images/quotes_ico_6.svg"
import quote4 from "./images/quotes_ico_4.svg"
import thumb2 from "./images/smiling.jpg"
import quote5 from "./images/quotes_ico_5.svg"
import thumb1 from "./images/bluetruck.png"


function Physicaldemage(){
    return(
        <>
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
          <i class="fa-solid fa-angle-left"/> Home/
          </Link>{" "}
          Physical damage insurance
        </p>
        <h4>Physical damage insurance</h4>
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
            <h3>What Is Physical Damage Insurance?</h3>
            <div className="section__title__shape">
              <img src={sectionimg} alt="" />
            </div>
            <p>
            Physical Damage Insurance shields commercial trucking companies from financial loss caused by physical damage to their vehicles. Providing coverage for damage resulting from both at-fault and non-at-fault accidents.
            </p>
          </div>
          <div className="similar__btn__blk">
            <Link to="/quote">Get a quote</Link>
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
            <img src={thumb1} alt="" />
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
        <h3>Secure Motor Truck Cargo Insurance quickly and effortlessly.</h3>
        <div className="section__title__shape">
          <img src={sectionimg} alt="" />
        </div>
        <p>
          Get in touch with an expert who can guide you through the intricacies
          of trucking insurance and leverage a contemporary platform to increase
          the efficiency of your business.
        </p>
      </div>
      <div className="quotes__second__style">
        <div className="row g-4 reversertwo">
          <div className="col-lg-7 order-lg-2">
            <div
              className="quotes__content"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="single__quotes__content__blk">
                <span>
                  <img src={quote4}alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Complete in minutes, all online</h5>
                  <p>
                    Acquire coverage within minutes, not days, through our
                    online platform.
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                  <img src={quote5} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Trucking industry especialists</h5>
                  <p>
                    Access coverage 24/7, day or night. With instant access to
                    certificates of insurance once the policy is purchased.{" "}
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                  <img src={quote6} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Competitive rates</h5>
                  <p>
                    We offer competitive rates for all your products and
                    services. Our commitment is to provide the best protection
                    for our customers without compromising quality or value.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-1">
            <div
              className="quotes__thumb__blk"
              data-aos="zoom-in"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="quotes__thumb quotes__thumb__left__radius">
                <img src={thumb2} alt="" />
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
        </div>
      </div>
    </div>
  </section>
  {/* =================== QUOTS AREA END ===================== */}
</>
<Footer/>
        
        </>
    )
}
export default Physicaldemage