import { Link } from "react-router";
import style from './heade.module.css';

const Header = () => {
  return(
    <header>
      <nav><Link to={'/'}>Home</Link></nav>
      <nav><Link to={'cw'}>CW</Link></nav>
      <nav><Link to={'projects'}>Project</Link></nav>
      <nav><Link to={'login'}>Login</Link></nav>
    </header>
  );
}

export default Header