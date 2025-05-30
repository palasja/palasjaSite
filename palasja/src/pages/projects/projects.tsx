import { Link } from 'react-router';
import { Outlet } from 'react-router';
import style from './projects.module.css';

const Projects = () => {
  return (
    <>
    <ul>
      <li><Link to="srvScan">SrvScan</Link></li>
      <li><Link to="getInfo">GetInfo</Link></li>
    </ul>
    <Outlet />
    </>
  );
};

export default Projects;
