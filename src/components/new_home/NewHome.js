import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import domain from "../../util/domain";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserContext from "../../context/UserContext";
import "./NewHome.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons"
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

import logo from "./images/mock_logo2.jpeg"
import portitem1 from "./images/portitem1.jpeg"
import portitem2 from "./images/portitem2.jpeg"
import portitem3 from "./images/portitem3.jpeg"

function NewHome(){

    const [isActive, setActive] = useState("false")
    const handleToggle = () => {
        setActive(!isActive);
      };

      const [data, setData] = useState({
        name: "",
        email: "",
        services: "",
        subject: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            if (window.confirm("Do you want to send your application?")){
                await axios.post("http://localhost:5000/contact", {
                    name: data.name,
                    email: data.email,
                    services: data.services,
                    subject : data.subject
                })
                setData({
                    name: "",
                    email: "",
                    services: "",
                    subject: ""
                })
                window.location.reload();
            }
        }catch (error){
            console.log(error)
        }
    }

    function handle (e) {
        const newData={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

      useEffect(() => {
        AOS.init({
            easing: "ease",
            duration: 1800,
            once: true
        });
      }, []);




    return(
        <div className="body1">

<header>
        {/* <div className={isActive ? "menu-toggler" : "menu-toggler open"} onClick={handleToggle}>
            <div className="bar half start"></div>
            <div className="bar"></div>
            <div className="bar half end"></div>
        </div>
        <nav className={isActive ? "top-nav" : "top-nav open"}>
            <ul className="nav-list">
                <li>
                    <a href="index.html" className="nav-link">Home</a>
                </li>
                <li>
                    <a href="./IVTech/courses" className="nav-link" onClick={handleToggle}>About</a>
                </li>
                <li>
                    <a href="#services" className="nav-link" onClick={handleToggle}>Services</a>
                </li>
                <li>
                    <a href="#portofolio" className="nav-link" onClick={handleToggle}>Portofolio</a>
                </li>
                <li>
                    <a href="#experience" className="nav-link" onClick={handleToggle}>Experience</a>
                </li>
                <li>
                    <a href="#contact" className="nav-link" onClick={handleToggle}>Contact</a>
                </li>
            </ul>
        </nav> */}
        <div className="landing-text">
            <h1>IVTech</h1>
            <h6>Engineering & Technology Club</h6>
        </div>
    </header>

    <section className = "about" id="about">
        <div className="container">
            <div className="profile-img" data-aos="fade-right" data-aos-delay="300">
                <img src={logo} alt=""/>
            </div>
            <div className="about-details" data-aos="fade-left" data-aos-delay="600">
                <div className="about-heading">
                    <h1>About</h1>
                    <h6>Us</h6>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="social-media">
                <ul className="nav-list">
                    <li>
                        <a href="#" className="icon-link">
                            {/* <i className="fab fa-facebook-square"></i> */}
                            <FontAwesomeIcon className="fbicon fab fa-facebook-square" icon={faFacebookSquare} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="icon-link">
                        <FontAwesomeIcon className="twicon fab fa-twitter-square" icon={faTwitterSquare} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="icon-link">
                        <FontAwesomeIcon className="igicon fab fa-instagram-square" icon={faInstagramSquare} />
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </section>


    <section className="services" id="services">
        <div className="container">
            <div className="section-heading">
                <h1>Services</h1>
                <h6>What can we do for you</h6>
            </div>
            <div className="my-skills">
                <div className="skill" data-aos="fade-in" data-aos-delay="300">
                    <div className="icon-container">
                        {/* <i className="fas fa-layer-group"></i> */}
                        <FontAwesomeIcon className="skill-icon" icon={faLayerGroup}/>
                    </div>
                    <h1>Tech Training</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="my-skills">
                <div className="skill" data-aos="fade-in" data-aos-delay="600">
                    <div className="icon-container">
                    <FontAwesomeIcon className="skill-icon" icon={faCode}/>
                    </div>
                    <h1>Software Development</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="my-skills">
                <div className="skill" data-aos="fade-in" data-aos-delay="900">
                    <div className="icon-container">
                    <FontAwesomeIcon className="skill-icon" icon={faChartBar}/>
                    </div>
                    <h1>Career Opportunities</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    </section>

     <section className="portofolio" id="portofolio">
        <div className="container">
            <div className="section-heading">
                <h1>Portofolio</h1>
                <h6>View some of our members recent work</h6>
            </div>
            <div className="portofolio-item">
                <div className="portofolio-img has-margin-right" data-aos="fade-right" data-aos-delay="300">
                    <img src={portitem1} alt=""/>
                </div>
                <div className="portofolio-description" data-aos="fade-left" data-aos-delay="600">
                    <h6>Web Development</h6>
                    <h1>Blog Website</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" className="cta">View Details</a>
                </div>
            </div>
            <div className="portofolio-item">
                <div className="portofolio-description has-margin-right" data-aos="fade-right" data-aos-delay="900">
                    <h6>Web Design</h6>
                    <h1>Product Layout</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" className="cta">View Details</a>
                </div>
                <div className="portofolio-img" data-aos="fade-left" data-aos-delay="1200">
                    <img src={portitem2} alt=""/>
                </div>
            </div>
            <div className="portofolio-item">
                <div className="portofolio-img has-margin-right" data-aos="fade-right" data-aos-delay="1500">
                    <img src={portitem3} alt=""/>
                </div>
                <div className="portofolio-description" data-aos="fade-left" data-aos-delay="1800">
                    <h6>Web Design</h6>
                    <h1>Product Sketch</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" className="cta">View Details</a>
                </div>
            </div>
        </div>
    </section>


    <section className="experience" id="experience">
        <div className="container">
            <div className="section-heading">
                <h1>Our Story</h1>
                <h6>How it all started</h6>
            </div>
            <div className="timeline" data-aos="fade-down" data-aos-delay="300">
                <ul>
                    <li className="date" data-date="2020 - Present">
                        <h1>First</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </li>
                    <li className="date" data-date="2019 - 2020">
                        <h1>Second</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </li>
                    <li className="date" data-date="2017 - 2019">
                        <h1>Third</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </li>
                </ul>
            </div>
        </div>
    </section>


    <section class="contact" id="contact">
        <div class="container">
            <div class="section-heading">
                <h1>Contact</h1>
                <h6>Let's work together</h6>
            </div>
            <form action="" data-aos="fade-up" data-aos-delay="300" onSubmit = {(e) => onSubmit(e)}>
                <label for="name">Name:</label>
                <input onChange={(e) => handle(e)} type="text" id="name" name="name" placeholder="Enter your name..." required/>
                <label for="email">Email:</label>
                <input onChange={(e) => handle(e)} type="text" id="email" name="email" placeholder="Enter your email..." required/>
                <label for="services">Services:</label>
                <label for="email">Services:</label>
                <input onChange={(e) => handle(e)} type="text" id="services" name="services" placeholder="Enter the type of service..." required/>
                <label for="subject">Subject:</label>
                <textarea onChange={(e) => handle(e)} name="subject" id="subject" cols="10" rows="10"></textarea>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    </section>

    <footer className="copyright">
        <div className="up" id="up" onClick={() => {window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })}}>
            {/* <i className="fas fa-chevron-up"></i> */}
            <FontAwesomeIcon className="up-arrow-icon" icon={faAngleUp}/>
        </div>
        <p>&copy; 2021 IVTech</p>
    </footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    {/* <script src="./main.js"></script> */}
    </div>

    )
}

export default NewHome;