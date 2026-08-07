import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">CityFix</Link>
      <div className="nav-links">
        <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/report" className={pathname === '/report' ? 'active' : ''}>Report Registry</Link>
      </div>
    </nav>
  );
}

export default Navbar;