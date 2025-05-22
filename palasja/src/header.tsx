import { Link } from "react-router";

const Header = () => {
  return(
    <header>
      <nav><Link to={'/'}>Home</Link></nav>
      <nav><Link to={'/cw'}>CW</Link></nav>
      <nav><Link to={'/project'}>Project</Link></nav>
      <nav><Link to={'/login'}>Login</Link></nav>
    </header>
  );
}

export default Header