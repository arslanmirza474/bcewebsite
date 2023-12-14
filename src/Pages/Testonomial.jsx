import profile from "./images/review_profile.png"
import ico from "./images/quote_ico.svg"
import { useEffect } from "react";
import sectionimg from "./images/section_title_shape.png"
import review1 from "./images/review1.png"
import review2 from "./images/review2.png"
import review3 from "./images/review3.png"
import review4 from "./images/review4.png"
import review5 from "./images/review5.png"
import review6 from "./images/review6.jpg"
import review7 from "./images/review7.png"
import review8 from "./images/review8.png"
import review9 from "./images/review9.png"
import review10 from "./images/review10.png"
import review11 from "./images/review11.png"
import review12 from "./images/review12.png"
import review13 from "./images/review13.png"
import review14 from "./images/review14.png"
import review15 from "./images/review15.png"
import review16 from "./images/review16.png"

function Testonomial (){
  useEffect(() => {
    const owl = window.jQuery(".review__inner__blk");
  
    owl.owlCarousel({
      loop: true,
      autoplay: false,
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
          autoplay: false,
          merge: 2, // Merge two items into one slide
          stagePadding: 10, // Adjust this value based on your design
          animateIn: 'fadeInDown',
          animateOut: 'fadeOutUp',
        },
        768: {
          items: 2,
          autoplay: false,
          merge: 2, // Merge two items into one slide
        },
      },
      touchDrag: false, // Disable touch dragging
      mouseDrag: false, // Disable mouse dragging
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
                  <img src={review14} alt="" />
                </span>{" "}
                alessandro daluz
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
                  <img src={review4} alt="" />
                </span>{" "}
                Waldenio Jr
              </h4>
              <p>
              Best quote found. team with excellent communication, dedicated, fast and efficient.
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review5} alt="" />
                </span>{" "}
                Musa Transportation
              </h4>
              <p>
              Great insurance agency. I’ve been working with Sergio and Melvin for a long time and they take care of everything quickly.
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review6} alt="" />
                </span>{" "}
                Wesley Owens
              </h4>
              <p>
              Bolanos staff went above and beyond to assist me with the help and proper insurance that I need to cover my business
I’m totally satisfied with their service and coverage
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review7} alt="" />
                </span>{" "}
                Keyon Crafton
              </h4>
              <p>
              They handled all I needed done in a timely fashion.
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review8} alt="" />
                </span>{" "}
                BXFinest241st
              </h4>
              <p>
              This company has been a breath of fresh air. Whatever and whenever I need them they are available and good at what they do.
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review9} alt="" />
                </span>{" "}
                Kemmiyyah Fanor
              </h4>
              <p>
              If could give more then 5 stars i would, i spend weeks and months shopping around im  glad i found Bolanos Commercial Enterprise they get me right back on the road thank you
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review10} alt="" />
                </span>{" "}
                MARILIA ABRAO
              </h4>
              <p>
              Melvin's excellent service.
very helpful, attentive and patient
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review11} alt="" />
                </span>{" "}
                Lília Simoni
              </h4>
              <p>
              An excellent company, especially the employee Melvin, always very helpful and kind
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review12} alt="" />
                </span>{" "}
                Luiz Dasilva
              </h4>
              <p>
              guy works so damn well I loved the work they are well worked and responsible
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review13} alt="" />
                </span>{" "}
                Stephanie Moreira
              </h4>
              <p>
              A very trustworthy company with knowledgeable and understanding agents!

              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review14} alt="" />
                </span>{" "}
                Amir Mucktar
              </h4>
              <p>
              Great insurance service with great price
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review15} alt="" />
                </span>{" "}
                Ronison Santana
              </h4>
              <p>
              The best!!!
              </p>
            </div>
            <div className="single__review__card">
              <div className="quote__ico">
                <img src={ico} alt="" />
              </div>
              <h4>
                <span>
                  <img src={review16} alt="" />
                </span>{" "}
                Marcelo Brites
              </h4>
              <p>
              Perfect a great insurance agent
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