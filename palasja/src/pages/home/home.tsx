
import Description from './sections/description';
import Skils from './sections/skils';
import Education from './sections/education';
import Languages from './sections/languages';
import Experience from './sections/experience';
import Certificates from './sections/certificates';

const Home = () => {
  return (
    <main>
      <Description />
      <Skils />
      <Education />
      <Languages /> 
      <Experience />  
      <Certificates />
    </main>
  );
};

export default Home;
