import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaPinterest,
  } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <footer className="bg-emerald-900 text-emerald-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and brief */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-200">Dishful Recipes</h2>
              <p className="mt-3 text-emerald-300">
                Your go-to destination for mouthwatering recipes from around the
                world. Let&rsquo;s cook something delicious together.
              </p>
            </div>
            {/* Links */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-200">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-emerald-300">
                <li>
                  <a href="/" className="hover:text-emerald-100 transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-emerald-100 transition-colors duration-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/foods" className="hover:text-emerald-100 transition-colors duration-200">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-emerald-100 transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-200">Follow Us</h3>
              <p className="mt-3 text-emerald-300">
                Stay connected with us on social media:
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors duration-200"
                  aria-label="Pinterest"
                >
                  <FaPinterest className="text-xl" />
                </a>
              </div>
            </div>
            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-200">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-3 text-emerald-300">
                Get the latest recipes and tips delivered straight to your inbox.
              </p>
              <form className="mt-4">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-full bg-emerald-800 text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-900 font-semibold transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-emerald-800 pt-6 text-center text-emerald-400">
            <p>
              © {new Date().getFullYear()} Dishful Recipes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;