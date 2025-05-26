import { Link } from 'react-router';
import { Outlet } from "react-router";
import style from './projects.module.css';

const Projects = () => {
  return (
    <>
      <Link to="srvScan">SrvScan</Link>
      <Outlet />
    </>
  );
}

export default Projects