
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import greenshield from "./images/ShieldCheck.svg"
import quotesthum from "./images/last.png"
import rightarrow from "./images/arrow_right.svg"
import maper from "./images/map_ico.svg"
import email from "./images/email_ico.svg"
import call from "./images/call_ico.svg"
import sectionline from "./images/section_title_shape.png"
import { useState } from 'react';
import axios from "axios"

function Contactus(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');


//   fetch('https://sheetdb.io/api/v1/haf87t9vvttcy', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         data: [
//             {
//                 'Name': "INCREMENT",
//                 'Email': "Mark",
//                 'Phone Number': 18
//             }
//         ]
//     })
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));






  const handleButtonClick = async () => {
    const formData = {
      data: [
        {
          id:"INCREMENT",
          Name: name,
          Email: email,
          Phone: phone,
          Message: message,
        },
      ],
    };

    try {
      await axios.post(
        'https://sheetdb.io/api/v1/ndfj5zbtoj6mu',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Reset form data after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error appending data to SheetDB:', error);
      // Handle error
    }
  };
  

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
          Contact us
        </p>
        <h4>Contact us</h4>
      </div>
    </div>
  </section>
  {/* =================== BREADCRUMB AREA END ===================== */}
  {/* =================== CONTACT AREA START ===================== */}
  <section className="contact__area">
    <div className="container">
      <div
        className="contact__inner__blk"
       
      >
        <div className="row g-4">
          <div className="col-xl-5">
            <div
              className="contact__content"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <h4>Get in touch with us</h4>
              <div className="contact__info">
                <h4>Find us at</h4>
                <a href="#">
                  <span>
                    <img src={maper}alt="" />
                  </span>{" "}
                  66 Waverley Dr. Ste 630, Frederick, MD 21702
                </a>
              </div>
              <div className="contact__info">
                <h4>Reach out to us at</h4>
                <a href="#">
                  <span>
                    <img src={email} alt="" />
                  </span>{" "}
                  Operations@bceins.com
                </a>
                <a href="#">
                  <span>
                    <img src={call} alt="" />
                  </span>{" "}
                  301-591-6550
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <div
              className="hero__form__wrapper"
              data-aos="zoom-in"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <form action="#">
                <div className="hero__form__blk">
                  <div className="hero__form__title">
                    <h4>Get a quote right now</h4>
                    <p>
                      Sign up and our team will contact you to provide your
                      quote
                    </p>
                  </div>
                  <div className="hero__form__step">
                    <div className="hero__single__form__step matheus_input">
                      <input type="text" placeholder="Your name" 
             value={name}
             onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="hero__single__form__step">
                      <input type="email" placeholder="E-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="hero__single__form__step">
                      <input type="text" placeholder="Phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="hero__single__form__step" >
                      <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)} type="text" className="mt-0" placeholder="Message" style={{height:"108px"}} />
                    </div>
                    <div className="form__btn">
                      <button onClick={handleButtonClick} type="button">I want to be a customer</button>
                      <p>
                        By submitting your data, you authorize us to contact
                        you, To find out more, see our{" "}
                        <a href="#">Privacy policy</a>
                      </p>
                    </div>
                    <div className="hero__data__safe">
                      <p>
                        <span>
                          <img src={greenshield} alt="" />
                        </span>{" "}
                        Your data is safe with us
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== CONTACT AREA END ===================== */}
  {/* =================== QUOTES AREA START ===================== */}
  <section className="quotes__area pt-0">
    <div className="container">
      <div
        className="section__title"
        data-aos="fade-up"
        data-aos-delay={50}
        data-aos-duration={1000}
      >
        <span>Got questions? We have answers!</span>
        <h3>Frequently asked questions</h3>
        <div className="section__title__shape">
          <img src={sectionline} alt="" />
        </div>
      </div>
      <div className="quotes__second__style">
        <div className="row g-4">
          <div className="col-lg-5">
            <div
              className="aske__question__area"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="single__ask__question">
                <Link to="/auto-mobile-insurance">
                  What is auto liability insurance{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
              <div className="single__ask__question">
                <Link to="/physical-damage-insurance">
                  What is physical damage insurance{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
              <div className="single__ask__question">
                <Link to="/general-liability-insurance">
                  What is general liability insurance{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
              <div className="single__ask__question">
                <Link to="/motor-cargo-insurance">
                  What is motor truck cargo insurance{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
              <div className="single__ask__question">
                <Link to="/contactus">
                  What is trailer interchange insurance{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
              <div className="single__ask__question">
                <Link to="/aboutus">
                  Why should i shop insurance with BCE{" "}
                  <img src={rightarrow} alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7 none__phone">
            <div
              className=" mt-5"
             
            >
              <div className="quotes__thumb">
                <img width="100%" src={quotesthum} alt="" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== QUOTS AREA END ===================== */}
  {/* =================== MAP AREA START ===================== */}
  <section className="map__area">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.079591733263!2d-77.46183662562787!3d39.42232461556367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c9db142eefd27f%3A0x93fc0d4bfdd7bdca!2sBolanos%20Commercial%20Enterprise!5e0!3m2!1sen!2s!4v1701756993652!5m2!1sen!2s"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </section>
  {/* =================== MAP AREA END ===================== */}
</>
<Footer/>
        </>
    )
}
export default Contactus