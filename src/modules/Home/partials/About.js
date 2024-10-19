import React, { useEffect } from 'react';
import img1 from "../../../assets/image/bg1.jpg";
import gif from "../../../assets/image/gif.gif"
import gif1 from "../../../assets/image/gif1.gif"
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
 
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div id="about" className="about-container bg-light py-12" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="text-center mb-8" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-4 text-green-600 hover:text-green-800">About Our Bookstore</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Welcome to our online bookstore, where stories come to life! Discover a vast collection of books curated for all book lovers.
        </p>
      </div>

      {/* About Section */}
      <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto px-4 max-w-6xl">
        {/* Text Content */}
        <div className="about-text" data-aos="fade-right">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            At our bookstore, we believe in the power of stories. We are dedicated to providing a platform for authors and readers alike to connect over the love of books.
            Whether you're searching for the latest bestseller or a hidden gem, we have something for everyone. Our goal is to create a space where book enthusiasts can explore, learn, and share their passion.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            Founded in 2020, our bookstore started with a simple idea: to make books accessible to everyone. Over the years, we've grown into a trusted source for book lovers across the globe.
            We continue to expand our offerings, bringing you a wide range of genres and authors to choose from.
          </p>
        </div>

        {/* Image Section */}
        <div className="about-images flex justify-center" data-aos="fade-left">
          <img src={gif1} alt="Bookstore" className="rounded-lg shadow-lg w-full md:w-4/5" />
        </div>
      </div>
    </div>
  );
};

export default About;
