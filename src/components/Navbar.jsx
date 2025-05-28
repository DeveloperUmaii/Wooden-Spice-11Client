import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Moon, Sun, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenmenu, setIsDropdownOpenmenu] = useState(false);



  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownmenu = () => {
    setIsDropdownOpenmenu(!isDropdownOpenmenu);
  };

  return (
    <nav className="h-10 w-full bg-gradient-to-r from-[#2a190f] via-[#1e293b] to-[#095225] shadow-lg text-white py-3 px-6 flex justify-between items-center">
      <Link to='/' className='flex items-center gap-3'>
        <img src='https://i.ibb.co/DfKTKkg6/Chat-GPT-Image-May-24-2025-07-17-52-PM.png' alt="Logo" className='w-10 h-10 rounded-full shadow-md' />
        <span className='text-xl font-extrabold tracking-wide  text-[#86450f]'>WOODEN<span className='text-xl font-extrabold tracking-widest font-lato text-[#ff2f28]'> Spice</span></span>

      </Link>

      <div className='md:hidden relative z-[999] dropdown-bottom bg-cover'>
        <div onClick={toggleDropdownmenu} className='flex justify-center'>
          <div className='btn btn-xs bg-[#1b804202] hover:bg-[#284948b9] border-none'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
        </div>

        {isDropdownOpenmenu && (
          <div
            className='flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-[9999] menu menu-sm p-3 shadow-lg bg-[#00000034] rounded-box w-36'
          >
            <li><Link to='/' className='border-b-2 hover:text-emerald-400 transition'>Home</Link></li>
            <li><Link to='/gallery' className='border-b-2 hover:text-emerald-400 transition'>Gallery</Link></li>
            <li><Link to='/foods' className='border-b-2 hover:text-emerald-400 transition'>All Food-item</Link></li>
          </div>
        )}
      </div>


      <ul className='hidden md:flex gap-6 text-sm font-medium'>
        <li><Link to='/' className='hover:text-emerald-400 transition'>Home</Link></li>
        <li><Link to='/gallery' className='hover:text-emerald-400 transition'>Gallery</Link></li>
        <li><Link to='/foods' className='hover:text-emerald-400 transition'>All Food-item</Link></li>
      </ul>

      <div className='flex items-center gap-3'>
        <button
          onClick={toggleTheme}
          className='p-2 rounded-full hover:bg-[#32c73925] transition'
          title='Toggle Dark/Light Mode'
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {!user ? (
          <Link
            to='/login'
            className='btn btn-sm w-14 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full '
          >
            LogIn
          </Link>
        ) : (
          <div className='relative z-[999] dropdown-end dropdown bg-cover'>
            <div
              onClick={toggleDropdown}
              className='btn btn-circle btn-sm mt-1 border-none rounded-full avatar '
            >
              <div title={user?.displayName} className=' w-8 rounded-full '>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile'
                  src={user?.photoURL}
                />
              </div>
            </div>

            {isDropdownOpen && (
              <ul
                className='absolute right-0 top-full mt-2 z-[9999] menu menu-sm p-3 shadow-lg   bg-[#083b1f69]   rounded-box w-56'
              >
                <li>
                  <Link
                    to='/profile'
                    className='font-semibold  bg-[#149c7f8e] '
                  >
                    Profile
                  </Link>
                </li>
                <li><Link to='/add-food-item'>Add Food-item</Link></li>
                <li><Link to='/my-added-food'>My Added-Food</Link></li>
                <li><Link to='/my-purchase'>My Purchase</Link></li>
                <li><Link to='/bid-requests'>Bid Requests</Link></li>
                <li>
                  <button
                    onClick={() => {
                      logOut();
                      setIsDropdownOpen(false); // logout দিলে dropdown বন্ধ করে দাও
                    }}
                    className='w-full text-left px-2 py-1 mt-2 rounded bg-red-100 dark:bg-red-600 text-red-600 dark:text-white hover:opacity-90'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>

        )}
      </div>

    </nav>
  );
};

export default Navbar;
