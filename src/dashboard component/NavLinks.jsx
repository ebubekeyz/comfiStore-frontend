const links = [
  { id: 1, url: '/dashboard', text: 'home' },
  { id: 3, url: '/dashboard/addProducts', text: 'Add Products' },
  { id: 4, url: '/dashboard/orders', text: 'orders' },
  { id: 5, url: '/dashboard/users', text: 'users' },
  { id: 6, url: '/dashboard/products', text: 'products' },
];
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === 'checkout' || url === 'dashboard/orders') && !user)
          return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
