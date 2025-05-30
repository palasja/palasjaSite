import Header from './components/header';
import Footer from './components/footer';
import { CostInfo, FeedbackItem } from './helpers/types';
import Feedback from './components/sections/feedback';
import About from './components/sections/about';
import Advantage from './components/sections/advantage';
import Jobs from './components/sections/jobs';
import Maria from './components/sections/maria';
import Services from './components/sections/services';

const App = (props: { feedback: FeedbackItem[]; services: CostInfo[] }) => {
  const { feedback, services } = props;
  return (
    <>
      <div className="content">
        <Header />
        <Maria />
        <Advantage />
        <Services services={services} />
        <About />
        <Jobs />
        <Feedback feedbackItems={feedback} />
      </div>
      <Footer />
    </>
  );
};

export default App;
