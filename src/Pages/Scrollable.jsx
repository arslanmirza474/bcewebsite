import React, { useEffect } from 'react';
import quotesicon from "./images/quotes_ico_1.svg"
import quotesicon2 from "./images/quotes_ico_2.svg"
import quotesicon3 from "./images/quotes_ico_3.svg"
import truck from "./images/Truck.svg"
import sheild from "./images/ShieldChevron.svg"
import main from "./images/quotes_thumb_8.png"
import quotes from "./images/quotes_thumb_1.png"
import call from "./images/PhoneCall.svg"
import jeep from "./images/Jeep.svg"
import dollar from "./images/CurrencyDollar.svg"
import sectionimg from "./images/section_title_shape.png"

function Scrollable (){
    
  useEffect(() => {
    const owl = window.jQuery(".quotes__slide__wrapper");
  
    owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: false,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      nav: true,
      navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
      onChanged: (event) => {
        const isUpArrow = event.page.index === 0; // Set your condition here
  
        const navText = isUpArrow
          ? ['<i class="fas fa-chevron-up"></i>', '<i class="fas fa-chevron-left"></i>']
          : ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'];
  
        owl.find('.owl-nav button.owl-prev').html(navText[0]);
        owl.find('.owl-nav button.owl-next').html(navText[1]);
      },
      touchDrag: false, // Disable touch dragging
      mouseDrag: false, // Disable mouse dragging
    });
  }, []);
  



  
    

    return(

        <>
        <style>
        {`
          @media (max-width: 2000px) {

          }
          @media (max-width: 1200px) {
            .owl-nav {
              position: absolute;
              top: 0%;
              transform: translateY(-50%);
              left: 50px;  // Adjust the left spacing as needed
              right: auto;
            }
            .owl-prev, .owl-next {
              margin-right: 5px;  // Adjust the right margin as needed
            }
            .owl-next {
              margin-left: 5px;  // Adjust the left margin as needed
            }
          }
        `}
      </style>
          <section className="quotes__area">
    <div className="container">
      <div
        className="section__title"
        data-aos="fade-up"
        data-aos-delay={50}
        data-aos-duration={1000}
      >
        <span>The best insurance companies are with us</span>
        <h3>Get Instant Quotes Online Today!</h3>
        <div className="section__title__shape">
          <img src={sectionimg} alt="" />
        </div>
        <p>
          Get in touch with an expert who can guide you through the intricacies
          of trucking insurance and leverage a contemporary platform to increase
          the efficiency of your business.
        </p>
      </div>
      <div className="quotes__slide__wrapper owl-carousel">
        <div
          className="quotes__single__slide"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1000}
        >
          <div className="row g-4">
            <div className="col-xl-7">
              <div className="quotes__content">
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={quotesicon} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>Instante certificates of insurance</h5>
                    <p>
                      We offer instant certificates of insurance for all your
                      products and services. This means you can get the
                      insurance coverage you need quickly and easily, without
                      having to wait days or weeks to receive your certificate.
                    </p>
                  </div>
                </div>
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={quotesicon2} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>
                      Shop with multiple insurance companies and 24/7 policy
                      management
                    </h5>
                    <p>
                      We offer you the ability to purchase insurance with
                      multiple insurance companies. This means you can compare
                      offers from different insurers to find the best coverage
                      and price for your needs.
                    </p>
                  </div>
                </div>
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={quotesicon3} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>DOT Compliance assistance</h5>
                    <p>
                      We offer DOT compliance assistance to help businesses
                      comply with DOT regulations. Our team of experts can help
                      you in the best way possible
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="quotes__thumb__blk">
                <div className="quotes__thumb">
                  <img src={quotes} alt="" />
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
                      <img src={sheild} alt="" />
                    </span>
                    <p>24 hour protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="quotes__single__slide"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1000}
        >
          <div className="row g-4">
            <div className="col-xl-7">
              <div className="quotes__content">
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={call} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>Connect with a live agent</h5>
                    <p>
                    We offer the option to connect with a live agent 24/7.Our agents are experienced and qualified and are ready to help you with any questions or problems you may have.
                    </p>
                  </div>
                </div>
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={jeep} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>
                    Trucking industry especialists
                    </h5>
                    <p>
                    We have a team of experts with extensive experience in the sector, who are prepared to offer the best solutions to their customers' needs.
                    </p>
                  </div>
                </div>
                <div className="single__quotes__content__blk">
                  <span>
                    <img src={dollar} alt="" />
                  </span>
                  <div className="single__quotes__content">
                    <h5>Competitive rates</h5>
                    <p>
                    We offer competitive rates for all your products and services. Our commitment is to provide the best protection for our customers without compromising quality or value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="quotes__thumb__blk">
                <div className="quotes__thumb">
                  <img src={main} alt="" />
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
                      <img src={sheild} alt="" />
                    </span>
                    <p>24 hour protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        </>
    )
}
export default Scrollable