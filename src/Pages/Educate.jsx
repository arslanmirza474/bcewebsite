import { useEffect } from "react";
import circle from "./images/CircleWavyCheck.svg"
import medal from "./images/Medal_black.svg"
import arrowright from "./images/ArrowRight_black.svg"
import sectionimg from "./images/section_title_shape.png"
import Link from "react-router-dom"
function Educate (){
  useEffect(() => {
    const owlOptions = {
      loop: false, // Set loop to false initially
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      margin: 20,
    };

    // Check screen width and set items accordingly
    if (window.innerWidth >= 768) {
      owlOptions.items = 3;
      owlOptions.loop = false;

      window.jQuery(".manage__inner__blk").owlCarousel(owlOptions);

      // Refresh Owl Carousel on window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
          owlOptions.items = 1;
          owlOptions.loop = true; // Set loop to true for small screens
          window.jQuery(".manage__inner__blk").trigger("destroy.owl.carousel").owlCarousel(owlOptions);
        } else {
          owlOptions.items = 3;
          owlOptions.loop = false; // Set loop to false for large screens
          window.jQuery(".manage__inner__blk").trigger("destroy.owl.carousel").owlCarousel(owlOptions);
        }
      });
    } else {
      owlOptions.items = 1;
      owlOptions.loop = true; // Set loop to true for small screens
      window.jQuery(".manage__inner__blk").owlCarousel(owlOptions);
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
      
    return(
        <>
         <section className="manage__area">
    <div className="container">
      <div
        className="section__title"
        data-aos="fade-up"
        data-aos-delay={50}
        data-aos-duration={1000}
      >
        <span>Bolanos Commercial Enterprise Platform</span>
        <h3>Quote. Purchase. Manage.</h3>
        <div className="section__title__shape">
          <img src={sectionimg} alt="" />
        </div>
        <p>
          The BCE Trucking platform enhances your speed and efficiency when it
          comes to managing your trucking insurance. It stands out as the sole
          digital trucking insurance platform that allows you to compare quotes,
          buy policies, and stay connected with your agent, all within a single,
          convenient location.
        </p>
      </div>
      <div className="manage__inner__blk owl-carousel">
        <div className="manage__single__card__blk">
          <h2>1</h2>
          <span>Educate</span>
          <p>
            Access valuable educational resources shared by industry veterans
            who are former trucking company owners.
          </p>
          <div className="manage__card__list">
            <ul>
              <li>
                <span>
                  <img src={circle} alt="" />
                </span>{" "}
                Implement top safety measures
              </li>
              <li>
                <span>
                  <img src={circle} alt="" />
                </span>{" "}
                Ensuring DOT compliance
              </li>
              <li>
                <span>
                  <img src={circle} alt="" />
                </span>{" "}
                Collaborating with freight borkers
              </li>
            </ul>
          </div>
        </div>
        <div className="manage__single__card__blk">
          <h2>2</h2>
          <span>Quote</span>
          <p>
            Have it on hand the best quotes shared by industry veterans who are
            former trucking company owners.
          </p>
          <div className="manage__card__list">
            <ul>
              <li>
                <span>
                  <img src={circle} alt="" />
                </span>{" "}
                Get a quote within 5 minutes
              </li>
              <li>
                <span>
                  <img src={circle}  alt="" />
                </span>{" "}
                Explore options with numerous carriers
              </li>
              <li>
                <span>
                  <img src={circle}  alt="" />
                </span>{" "}
                Buy only what’s essential for your needs
              </li>
            </ul>
          </div>
        </div>
        <div className="manage__single__card__blk">
          <h2>3</h2>
          <span>Purchase</span>
          <p>
            Acquire insurance that offers top-notch coverage at the most
            competitive rate, and you can always reach out to our knowledgeable
            agents
          </p>
          <div className="manage__card__list">
            <ul>
              <li>
                <span>
                  <img src={circle}  alt="" />
                </span>{" "}
                Purchase coverage using our flexible payment choices
              </li>
              <li>
                <span>
                  <img src={circle}  alt="" />
                </span>{" "}
                Obtain competitive rates tailored to your situation
              </li>
              <li>
                <span>
                  <img src={circle}  alt="" />
                </span>{" "}
                Secure coverage that permits you to collaborate with any
                broketr.
              </li>
            </ul>
          </div>
        </div>
        
      </div>





      <div className="medal__content medal__content__black">
        <h4>
          <span>
            <img src={medal} alt="" />
          </span>{" "}
          <small>
            Have the best insurance in your hands right now,{" "}
            <Link to="/get-a-quote">
              Get your quote <img src={arrowright} alt="" />
            </Link>
          </small>
        </h4>
      </div>
    </div>
  </section>
        </>
    )
}
export default Educate