import { Link } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import sectionimg from "./images/section_title_shape.png"
import thumb4 from "./images/Laugh.png"
import thumb7 from "./images/quotes_thumb_7.jpg"
import quotes from "./images/quotes_ico_3.svg"
import shield from "./images/ShieldChevron.svg"
import truck from "./images/Truck.svg"
import thumb5 from "./images/platform_thumb_5.png"
import Aboutustestonomials from "./Aboutustestonomials"
function Aboutus (){
    return(
        <>
      <div>
 <Navbar/>
  {/* =================== HEADER AREA END ===================== */}
  {/* =================== BREADCRUMB AREA START ===================== */}
  <section className="breadcrumb__area" >
    <div className="container">
      <div className="breadcrumb__inner__blk" data-aos="fade-up" data-aos-delay={50} data-aos-duration={1000}>
        <p><Link to="/"><i class="fa-solid fa-angle-left"></i> Home/</Link>About us</p>
        <h4>About us</h4>
      </div>
    </div>
  </section>
  {/* =================== BREADCRUMB AREA END ===================== */}
  {/* =================== PLATFORM AREA START ===================== */}
  <section className="platform__area">
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-6">
          <div className="section__title text-start" style={{"max-width":"100%"}} data-aos="fade-up" data-aos-delay={50} data-aos-duration={1000}>
            <span>Trusted insurer</span>
            <h3>Our mission</h3>
            <div className="section__title__shape">
              <img src={sectionimg} alt />
            </div>
            <p>At BCE, our mission is to empower trucking businesses with tailored insurance solutions and
              expert guidance. We are committed to simplifying the complexities of the industry, ensuring
              compliance, and promoting success on the road. With a foundation built by truckers, for
              truckers, we stand by our clients every mile of the journey, providing peace of mind and
              unparalleled support.</p>
          </div>
          <div className="similar__btn__blk" data-aos="fade-up" data-aos-delay={50} data-aos-duration={1000}>
            <Link to="/quote">Get a quote</Link>
            <Link to="/contactus" className="btn_bg_transparent">Contact us</Link>
          </div>
        </div>
        <div className="col-xl-6">
          <div  >
            <img height="100%"  src={thumb4} alt />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== PLATFORM AREA END ===================== */}
  {/* =================== QUOTES AREA START ===================== */}
  <section className="quotes__area pt-0">
    <div className="container">
      <div className="section__title" data-aos="fade-up" data-aos-delay={50} data-aos-duration={1000}>
        <span>Connecting trucking challenges with needed solutions</span>
        <h3>Helping all truckers thrive</h3>
        <div className="section__title__shape">
          <img src={sectionimg} alt />
        </div>
      </div>
      <div className="quotes__second__style">
        <div className="row g-4 reverser">
          <div className="col-lg-5">
            <div className="quotes__thumb__blk" data-aos="zoom-in" data-aos-delay={50} data-aos-duration={1000}>
              <div className="quotes__thumb quotes__thumb__left__radius">
                <img src={thumb7} alt />
              </div>
              <div className="quptes__thumb__card__blk">
                <div className="quotes__thumb__card">
                  <span><img src={truck} alt /></span>
                  <p>Safety in your truck</p>
                </div>
                <div className="quotes__thumb__card">
                  <span><img src={shield} alt /></span>
                  <p>24 hour protection</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="quotes__content" data-aos="fade-up" data-aos-delay={50} data-aos-duration={1000}>
              <div className="single__quotes__content__blk">
                <span><img src={quotes} alt /></span>
                <div className="single__quotes__content">
                  <h5>Need help understanding trucking compliance?</h5>
                  <p>We don't just provide insurance; we also assist with a range of DOT compliance
                    issues.</p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span><img src={quotes} alt /></span>
                <div className="single__quotes__content">
                  <h5>Having issues find competitive rates?</h5>
                  <p>Fed up with multiple agencies not finding affordable coverage for your business?
                  </p>
                </div>
              </div>
              <div className="single__quotes__content__blk">
                <span><img src={quotes} alt /></span>
                <div className="single__quotes__content">
                  <h5>Losing loads due to slow COI’s?</h5>
                  <p>Frustrated by lost loads due to delayed COIs from your agent?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== QUOTS AREA END ===================== */}
  {/* =================== PLATFORM AREA START ===================== */}
  <section className="platform__area pt-0">
  <div className="container" style={{width:"100%"}}>
    <div className="row g-4 reverser">
      <div className="col-xl-6 ">
        <div data-aos="zoom-in" data-aos-delay={50} data-aos-duration={1000} className="platform__thumb p-0">
          <img src={thumb5} width="773px" height="462px" alt="" />
        </div>
      </div>
      <div className="col-xl-6">
        <div
          className="section__title text-start"
          style={{ maxWidth: "100%", paddingLeft: "90px" }}
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1000}
        >
          <span>Trusted insurer</span>
          <h3>We Are Built for Truckers</h3>
          <div className="section__title__shape">
            <img src={sectionimg} alt="" />
          </div>
          <p>
            At BCE, our team of experts includes former trucking company owners, dispatchers, safety, and compliance specialists, and more. With a wealth of industry knowledge, we understand the unique challenges you face. As part of the same ownership, we also run United CDL Training School, helping aspiring truck drivers obtain their CDL. Our commitment to the trucking industry runs deep, and our experience sets us apart.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  {/* =================== PLATFORM AREA END ===================== */}
  {/* =================== TESTIMONIAL AREA START ===================== */}
<Aboutustestonomials/>

  {/* =================== TESTIMONIAL AREA END ===================== */}
  {/* =================== FOOTER AREA START ===================== */}
 <Footer/>
  {/* =================== FOOTER AREA END ===================== */}
</div>

        </>
    )
}
export default Aboutus