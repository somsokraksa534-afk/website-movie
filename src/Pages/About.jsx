import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Own from "../Images/Own.png";
import banner from "../Images/avengers infinity war.jpg";
import teacher from "../Images/Teacher.png";
import school from "../Images/School.png";

const About = () => {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative w-full h-[90vh] flex items-center justify-center text-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          ></div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-purple-500">Raksa </span>Cinema
            </h1>

            <p className="mb-8 text-neutral-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Khmer Coding is the open sourse website that student can learn by
              themself with a lot of lesson student can{" "}
              <br className="hidden md:block" />
              growing faster and build the Knowladge more easier.Student don't
              need to pay money for this course.
            </p>

            <Link to="/contact" className="cursor-pointer mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition">
              Contact us
            </Link>
          </div>
        </section>

        {/* TITLE */}
        <div className="txt text-center my-10">
          <h1 className="text-2xl md:text-3xl font-bold">
            Our Institute and Teacher
          </h1>
        </div>

        {/* SCHOOL */}
        <section className="school flex flex-col md:flex-row gap-6 px-4 md:px-10 justify-center items-center">
          <div className="teacher flex flex-col md:flex-row bg-neutral-800 rounded-xl overflow-hidden shadow-lg max-w-xl">
            <div className="img w-full md:w-64 h-48 md:h-auto">
              <img
                src={school}
                alt=""
                className="w-full h-full bg-contain object-cover"
              />
            </div>

            <div className="text p-8">
              <h3 className="text-lg font-semibold mb-2">ETEC CENTER</h3>

              <p className="text-sm text-neutral-300">
                The SIP provides students with an opportunity to apply and
                integrate the knowledge and skills acquired during their study.
              </p>

              <div className="icon flex gap-3 mt-3 text-lg">
                <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer" />
                <i className="fa-solid fa-earth-asia hover:text-green-400 cursor-pointer" />
                <i className="fa-brands fa-telegram hover:text-sky-400 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="teacher flex flex-col md:flex-row bg-neutral-800 rounded-xl overflow-hidden shadow-lg max-w-xl">
            <div className="img w-full md:w-52 h-48 md:h-auto">
              <img
                src={teacher}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text p-8">
              <h3 className="text-lg font-semibold mb-2">
                Teacher Sey ChanRaksa
              </h3>

              <p className="text-sm text-neutral-300">
                Web Front-end teacher At ETEC School who taught me clearly.
              </p>

              <div className="icon flex gap-3 mt-3 text-lg">
                <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer" />
                <i className="fa-solid fa-earth-asia hover:text-green-400 cursor-pointer" />
                <i className="fa-brands fa-telegram hover:text-sky-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </section>

        {/* TITLE */}
        <div className="txt text-center my-10">
          <h1 className="text-2xl md:text-3xl font-bold">Is Me</h1>
        </div>

        {/* STUDENT */}
        <section className="student flex justify-center px-4 md:px-10 pb-10">
          <div className="cardstudent bg-neutral-800 rounded-xl overflow-hidden shadow-lg w-full max-w-xs">
            <div className="imgstu h-52">
              <img
                src={Own}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="con p-4">
              <h3 className="text-lg font-semibold">Som Sokraksa</h3>
              <p className="text-sm text-neutral-300">
                Learn coding make life better. let's grow together.
              </p>

              <div className="icon flex gap-3 mt-3 text-lg">
                <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer" />
                <i className="fa-solid fa-earth-asia hover:text-green-400 cursor-pointer" />
                <i className="fa-brands fa-telegram hover:text-sky-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
