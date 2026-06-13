import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Send, Mail, Youtube, Facebook, Twitter, Gitlab } from 'lucide-react';
import { CATEGORIES } from '../../constants';

export default function Footer() {
  const vglugSocialLinks = [
    { icon: Send, url: 'https://t.me/vpmglug', label: 'Telegram', color: 'hover:text-sky-500' },
    { icon: Mail, url: 'https://www.freelists.org/list/villupuramglug', label: 'Mailing List', color: 'hover:text-amber-500' },
    { icon: Youtube, url: 'https://www.youtube.com/channel/UCztecD7qSCgqcb59r0G3GHg', label: 'Youtube', color: 'hover:text-red-500' },
    { icon: Facebook, url: 'https://www.facebook.com/vpmglug/', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, url: 'http://www.twitter.com/vpmglug', label: 'Twitter', color: 'hover:text-cyan-500' },
    { icon: Gitlab, url: 'https://gitlab.com/villupuramglug/', label: 'Gitlab', color: 'hover:text-orange-500' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800/50 hidden md:block">
      {/* Main Footer */}
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/home" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center shadow-button">
                <ShoppingBag size={17} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text tracking-tight">UNIMART</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              The premier student-only marketplace. Buy and sell textbooks, electronics, and more with
              verified fellow students on campus.
            </p>
            <div className="flex flex-wrap gap-2">
              {vglugSocialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-center transition-all duration-200 text-gray-400 ${social.color} hover:scale-105 hover:shadow-glass`}
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/home?category=${cat.id}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/sell', label: 'Sell a Product' },
                { to: '/orders', label: 'My Orders' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/help', label: 'Help Center' },
                { to: '/about', label: 'About Us' },
                { to: '/terms', label: 'Terms of Service' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get notified about new listings and campus deals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-field text-sm !py-2.5"
              />
              <button className="btn-primary text-sm !py-2.5 !px-4 !rounded-xl flex-shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 dark:border-gray-800/50">
        <div className="section-padding py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2026 UNIMART. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Made with <Heart size={11} className="text-rose-400" /> for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
