import profile from "./images/review_profile.png"
import ico from "./images/quote_ico.svg"
import { useEffect } from "react";
function Testonomial (){
  useEffect(() => {
    window.jQuery(".review__inner__blk").owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      margin: 20,
      animateIn: 'fadeInDown',
      animateOut: 'fadeOutUp',
      nav: true,
      navText: ['<i class="fas fa-chevron-left testimonial-left"></i>', '<i class="fas fa-chevron-right testimonial-right"></i>'],
      responsive: {
        0: {
          items: 1, // Show 1 item on small screens
        },
        768: {
          items: 2, // Show 2 items on larger screens
        },
      },
    });
  }, []);
      
    return(
        <>
         <style>
        {`
          @media (max-width: 1200px) {
          .testimonial__area  .owl-nav {
              position: absolute;
              top: 90%;
              transform: translateY(-50%);
              left: 35%;  // Adjust the left spacing as needed
              right: auto;
            }
         
          }
        `}
      </style>
          <section className="testimonial__area">
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-4">
          <div
            className="testimonial__left__content__ara"
            data-aos="fade-up"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <div className="section__title text-start">
              <span>See who is walking this path with us</span>
              <h3>Google reviews</h3>
              <div className="section__title__shape">
                <img src="images/section_title_shape.png" alt="" />
              </div>
              <p>
                Watch the video and understand why thousands of people are
                already using our services and are protected
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="review__inner__blk owl-carousel">
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={profile} alt="" />
                </span>{" "}
                Alessandro Daluiz
              </h4>
              <p className="text-dark">
                I highly recommend this agency, they’re extremely knowledgeable
                regarding all our truck insurance needs! We have all our
                accounts with them, and we couldn’t be happier!
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={profile} alt="" />
                </span>{" "}
                Alessandro Daluiz
              </h4>
              <p>
                I highly recommend this agency, they’re extremely knowledgeable
                regarding all our truck insurance needs! We have all our
                accounts with them, and we couldn’t be happier!
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={profile} alt="" />
                </span>{" "}
                Alessandro Daluiz
              </h4>
              <p>
                I highly recommend this agency, they’re extremely knowledgeable
                regarding all our truck insurance needs! We have all our
                accounts with them, and we couldn’t be happier!
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={profile} alt="" />
                </span>{" "}
                Alessandro Daluiz
              </h4>
              <p>
                I highly recommend this agency, they’re extremely knowledgeable
                regarding all our truck insurance needs! We have all our
                accounts with them, and we couldn’t be happier!
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={profile} alt="" />
                </span>{" "}
                Alessandro Daluiz
              </h4>
              <p>
                I highly recommend this agency, they’re extremely knowledgeable
                regarding all our truck insurance needs! We have all our
                accounts with them, and we couldn’t be happier!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        
        </>
    )
}
export default Testonomial