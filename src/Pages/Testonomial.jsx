import profile from "./images/review_profile.png"
import ico from "./images/quote_ico.svg"
import { useEffect } from "react";
import sectionimg from "./images/section_title_shape.png"
import review1 from "./images/review1.png"
import review2 from "./images/review2.png"
import review3 from "./images/review3.png"
function Testonomial (){
  useEffect(() => {
    window.jQuery(".review__inner__blk").owlCarousel({
      loop: true,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      margin: 20,
      animateIn: 'fadeInDown',
      animateOut: 'fadeOutUp',
      nav: true,
      navText: [
        '<i class="fas fa-chevron-left testimonial-left"></i>',
        '<i class="fas fa-chevron-right testimonial-right"></i>',
      ],
      responsive: {
        0: {
          items: 1.1,
          slideBy: 1,
          merge: 2, // Merge two items into one slide
          stagePadding: 10, // Adjust this value based on your design
          animateIn: 'fadeInDown',
          animateOut: 'fadeOutUp',
        },
        768: {
          items: 2,
          merge: 2, // Merge two items into one slide
          autoplaySpeed: 5000, // Default speed for larger screens
        },
      },
    });
  }, []);
  
  
  
  
  
      
    return(
        <>
        <style>
  {`
    @media (max-width: 1200px) {
      .testimonial__area .owl-nav {
        position: absolute;
        top: 90%;
        transform: translateY(-50%);
        left: 35%;  // Adjust the left spacing as needed
        right: auto;
      }

      .testimonial__area .owl-prev {
        margin-right: 0px;  // Adjust the gap for the left arrow
      }

      .testimonial__area .owl-next {
        margin-left: 0px;  // Adjust the gap for the right arrow
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
                <img src={sectionimg} alt="" />
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
                  <img src={review1} alt="" />
                </span>{" "}
                Vinny Moreira
              </h4>
              <p>
              Best experience I've had with an insurance agency. They have excellent service, and a method of caring for their customers in the after sales.
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review2} alt="" />
                </span>{" "}
                jay jay
              </h4>
              <p>
              Professional team and great experience always answer the phone and solve the issue and excellent service from Melvin and his team .
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review3} alt="" />
                </span>{" "}
                Augusto faustino
              </h4>
              <p>
              Highly recommend, very good people to work with, the staff at this business are professional, knowledgeable and always willing to go the extra mile to ensure customer satisfaction.
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