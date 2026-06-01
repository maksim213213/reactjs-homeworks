// src/components/Footer/Footer.jsx
import logo from "../../assets/images/logo.svg";
import footerBg from "../../assets/images/footerBg.svg";
import phoneIcon from "../../assets/images/phoneIcon.jpg";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const Footer = () => {
  return (
    <footer className="relative bg-bgLight dark:bg-slate-900 px-8 py-12 text-sm text-textGray dark:text-slate-300">
      <div className="absolute inset-0 dark:hidden" style={{ backgroundImage: `url(${footerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <img src={logo} alt="FoodDelivery" className="h-10 w-10 mb-4" />
            <p className="text-textGray dark:text-slate-300">Takeaway & Delivery template for small - medium businesses.</p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold text-textDark dark:text-slate-100 mb-4 uppercase text-xs tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary transition">Home</a></li>
                <li><a href="#" className="hover:text-primary transition">Order</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
                <li className="relative group">
                    <img src={phoneIcon} alt="phone" className="w-6 h-6 hover:opacity-75 transition cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      +1 (555) 123-4567
                    </div>
                  </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-textDark dark:text-slate-100 mb-4 uppercase text-xs tracking-wider">Template</h4>
              <ul className="space-y-3">
                <li><a href="https://www.google.com/" className="hover:text-primary transition">Style Guide</a></li>
                <li><a href="https://www.google.com/" className="hover:text-primary transition">Changelog</a></li>
                <li><a href="https://www.google.com/" className="hover:text-primary transition">Licence</a></li>
                <li><a href="https://www.google.com/" className="hover:text-primary transition">Webflow University</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-textDark dark:text-slate-100 mb-4 uppercase text-xs tracking-wider">Flowbase</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary transition">More Cloneables</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Built by <a href="#" className="text-primary hover:underline">Flowbase</a> · Powered by <a href="#" className="text-primary hover:underline">Webflow</a></p>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition">
              <InstagramIcon />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition">
              <TwitterIcon />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;