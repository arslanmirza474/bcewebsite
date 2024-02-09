import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import sectionimg from "./images/section_title_shape.png"
import thumb3 from "./images/collector.png"
import thumb4 from "./images/quotes_thumb_4.png"
import star from "./images/quotes_ico_3.svg"
import truck from "./images/Truck.svg"
import check from "./images/quotes_ico_3.svg"
function Automobileinsurance (){
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
          </Link>
          Auto liability insurance
        </p>
        <h4>Auto liability insurance</h4>
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
            <h3>What is auto liability insurance?</h3>
            <div className="section__title__shape">
              <img src={sectionimg} alt="" />
            </div>
            <p>
              Auto liability coverage is vital and required by law. It protects
              against accident-related injury or damage. Most freight brokers
              require at least $1,000,000 in coverage, ensuring compliance and
              peace of mind on the road.
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
            <img src={thumb3} alt="" />
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
        <h3>3 Reasons for getting auto liability insurance</h3>
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
                <img src={thumb4} alt="" />
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
                    <img src={check} alt="" />
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
                  <img src={star} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>
                    Protects against financial loss in the event of an accident
                  </h5>
                  <p>
                    Auto liability insurance covers property damage, medical
                    bills, and legal fees when a trucker is at fault in an
                    accident, providing financial protection and peace of mind.
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                  <img src={star} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Required by law</h5>
                  <p>
                    Commercial truckers are legally obliged to maintain auto
                    liability insurance. If you possess an MC Authority, the law
                    mandates a minimum if $750,000 Auto Liability Coverage
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span>
                  <img src={star} alt="" />
                </span>
                <div className="single__quotes__content">
                  <h5>Protects against lawsuits</h5>
                  <p>
                    Auto liability insurance assists truckers facing lawsuits
                    after accidents, covering legal fees and awarded damages,
                    offering financial protection and peace of mind.
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

        </>
    )
}
export default Automobileinsurance