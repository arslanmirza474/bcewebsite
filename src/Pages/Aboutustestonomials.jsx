import sectionimg from "./images/section_title_shape.png"
import partner1 from "./images/leader__ship__thumb_1.jpg"
import partner2 from "./images/leader__ship__thumb_2.jpg"

import partner3 from "./images/leader__ship__thumb_3.jpg"
import { useEffect } from "react";



function Aboutustestonomials (){
    useEffect(() => {
        window.jQuery(".leadership__blk").owlCarousel({
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          margin: 20,
          animateIn: 'fadeInDown',
          animateOut: 'fadeOutUp',
          nav: true,
          navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
      
          responsive: {
            0: {
              items: 1, // Show 1 item on small screens
            },
            768: {
              items: 3, // Show 2 items on larger screens
            },
          },
        });
      }, []);
    return(
        <>

<section className="testimonial__area">
    <div className="container">
      <div className="row g-4">
        <div className="col-xxl-4">
          <div className="testimonial__left__content__ara">
            <div className="section__title text-xxl-start">
              <span>Experienced team</span>
              <h3>The leadership team behind BOLANOS</h3>
              <div className="section__title__shape">
                <img src={sectionimg} alt />
              </div>
              <p>Get to know the people who make Bolanos happen</p>
            </div>
          </div>
        </div>
        <div className="col-xxl-8">
          <div className="leadership__blk owl-carousel">
            <div className="leadership__thumb__blk">
              <img src={partner1} alt />
              <div className="leadership__text">
                <h4>Hugo Saad</h4>
                <p>CEO</p>
              </div>
            </div>
            <div className="leadership__thumb__blk">
              <img src={partner2} alt />
              <div className="leadership__text">
                <h4>Angu Tamba</h4>
                <p>Manager</p>
              </div>
            </div>
            <div className="leadership__thumb__blk">
              <img src={partner3} alt />
              <div className="leadership__text">
                <h4>oka Tomoaki</h4>
                <p>Manager</p>
              </div>
            </div>
            <div className="leadership__thumb__blk">
              <img src={partner1}alt />
              <div className="leadership__text">
                <h4>Hugo Saad</h4>
                <p>CEO</p>
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
export default Aboutustestonomials