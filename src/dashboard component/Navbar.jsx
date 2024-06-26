import { BsBell, BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink, useLoaderData } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { orders } = useLoaderData();

  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const numItemsInCart = useSelector(
    (store) => store.orderState.numItemsInCart
  );
  const user = useSelector((store) => store.userState.user);
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
          >
            {user.name.charAt(0) || C}
          </NavLink>

          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* moon icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK */}
          <NavLink
            to="/dashboard/newOrder"
            className="btn btn-ghost btn-circle btn-md ml-4"
          >
            <div className="indicator">
              <BsBell className="h6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {orders ? <div>{orders.length}</div> : ''}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
