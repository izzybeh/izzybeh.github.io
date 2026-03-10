import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-warm-gray-100 border-t border-warm-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h3 className="text-lg sm:text-xl text-warm-gray-900">
              MoneyBeh
            </h3>
            <p className="text-warm-gray-700 text-sm leading-relaxed">
              Clear decisions. Less stress. More freedom.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-warm-gray-900 mb-3 text-sm sm:text-base">Learn</h4>
            <div className="flex flex-col gap-2">
              <Link to="/articles" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                Articles
              </Link>
              <Link to="/podcast" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                Podcast
              </Link>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-warm-gray-900 mb-3 text-sm sm:text-base">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                About Us
              </Link>
              <a href="#" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                Careers
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-warm-gray-900 mb-3 text-sm sm:text-base">Get the App</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                iOS App
              </a>
              <a href="#" className="text-warm-gray-700 text-sm hover:text-seafoam-600 transition-colors">
                Android App
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-warm-gray-200 text-center">
          <p className="text-warm-gray-600 text-xs sm:text-sm">
            © 2026 MoneyBeh. Building a calmer approach to financial wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}