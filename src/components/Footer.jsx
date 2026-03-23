import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="inline-block mb-6">
              <span className="text-purple-500 font-bold text-2xl">
                Raksa <span className="text-white">Cinema</span>
              </span>
            </a>
            <p className="mb-4 text-sm">
              ស្វែងយល់ និងរុករកភាពយន្តថ្មីៗពីជុំវិញពិភពលោក។ RaksaCinema
              ផ្តល់ឱ្យអ្នកនូវការប្រមូលផ្ដុំនៃខ្សែភាពយន្តដ៏ច្រើននៅគ្រប់ប្រភេទ។
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/raksaa.som/"
                target="blank"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 
                    23.407.595 24 1.326 24H12.82V14.708h-3.13v-3.62h3.13V8.413
                    c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 
                    2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 
                    1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.405 
                    24 24 23.407 24 22.674V1.326C24 .593 23.405 0 
                    22.675 0z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/"
                target="blank"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.3 
  3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
  0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
  -.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729
  1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 
  3.492.997.108-.775.418-1.305.76-1.605
  -2.665-.3-5.467-1.332-5.467-5.93 
  0-1.31.467-2.38 1.235-3.22
  -.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 
  3.301 1.23.957-.266 1.983-.399 3.003-.404
  1.02.005 2.047.138 3.006.404 
  2.29-1.552 3.296-1.23 3.296-1.23 
  .653 1.653.242 2.873.118 3.176
  .77.84 1.233 1.91 1.233 3.22 
  0 4.61-2.807 5.625-5.48 5.92
  .43.37.823 1.102.823 2.222 
  0 1.606-.015 2.898-.015 3.293
  0 .322.216.694.825.576C20.565 21.795 
  24 17.295 24 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/eren_alwayshurt/"
                target="blank"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 
  19.426 4.574 22 7.75 22h8.5C19.426 22 22 
  19.426 22 16.25v-8.5C22 4.574 19.426 2 
  16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 
  20 7.75v8.5c0 1.966-1.784 3.75-3.75 
  3.75h-8.5C5.784 20 4 18.216 4 
  16.25v-8.5C4 5.784 5.784 4 7.75 
  4zm4.25 2.5A5.75 5.75 0 1 0 17.75 
  12 5.756 5.756 0 0 0 12 6.5zm0 
  2A3.75 3.75 0 1 1 8.25 12 
  3.754 3.754 0 0 1 12 
  8.5zm5.25-.75a1.25 1.25 0 1 0 
  1.25 1.25 1.251 1.251 0 0 0 
  -1.25-1.25z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              តំណភ្ជាប់រហ័ស
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-all">
                  ទំព័រដើម
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-purple-400 transition-all">
                  រឿងកំពុងពេញនិយម
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-purple-400 transition-all">
                  រឿងល្បីៗ
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-purple-400 transition-all">
                  រឿងទទួលបានចំណាត់ថ្នាក់ខ្ពស់
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-purple-400 transition-all">
                  រកមើលតាមប្រភេទរឿង
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">ប្រភព</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-purple-400">
                  អំពីយើង
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400">
                  ទំនាក់ទំនង
                </Link>
              </li>
              <li>
                <a className="hover:text-purple-400">Blog</a>
              </li>
              <li>
                <a className="hover:text-purple-400">FAQ</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Help Center</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              ព្រឹត្តិបត្រ
            </h3>
            <p className="text-sm mb-4">ទទួលបានព័ត៌មានថ្មីៗ និងភាពយន្តថ្មីៗ</p>
            <form action="" className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-neutral-800 border-neutral-700 text-white px-4 py-2 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                />
              </div>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg
                           transition-all text-sm"
              >
                បញ្ជូន
              </button>
            </form>
          </div>
        </div>
        <div
          className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row
                  justify-between"
        >
          <p className="text-xs">
            RaksaCinema. រក្សាសិទ្ធិគ្រប់យ៉ាង. <br className="md:hidden" />
            <span className="hidden md:inline">.</span>
            ដំណើរការដោយ{" "}
            <Link to="/" className="text-purple-400 hover:text-purple-300">
              Raksa Coding
            </Link>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
            <a
              href="Privacy Policy"
              className="hover:text-purple-400 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="Privacy Policy"
              className="hover:text-purple-400 transition-all"
            >
              Terms Of Service
            </a>
            <a
              href="Privacy Policy"
              className="hover:text-purple-400 transition-all"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
