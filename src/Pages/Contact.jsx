import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="text-center pt-28 pb-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Contact <span className="text-purple-500">Us</span>
        </h1>
        <p className="text-neutral-400 max-w-xl mx-auto">
          មានសំណួរ ឬចង់ធ្វើការជាមួយយើង? ផ្ញើសារមកយើងហើយយើងនឹង ត្រលប់មកអ្នកវិញ។
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-4 md:px-10 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">ទំនាក់ទំនង</h2>
            <p className="text-neutral-400">
              យើងនៅទីនេះដើម្បីជួយអ្នក។ ទាក់ទងមកយើងគ្រប់ពេល
              ហើយយើងនឹងឆ្លើយសំណួររបស់អ្នកដោយរីករាយ។
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-3 rounded-full">📍</div>
                <p>Phnom Penh, Cambodia</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-3 rounded-full">📧</div>
                <p>raksacinema@gmail.com</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-3 rounded-full">📞</div>
                <p>+855 85 217 721</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-neutral-800 rounded-xl p-6 shadow-lg">
            <form className="space-y-4">
              <div>
                <label className="text-sm text-neutral-400">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  required
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
