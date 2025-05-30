import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider, { Settings } from 'react-slick';
import style from './jobs.module.css';
import './jobs.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { RESPONSIVE } from '../../../helpers/constants';
const jobImages: string[] = [
  '/images/jobs/1.jpg',
  '/images/jobs/2.jpg',
  '/images/jobs/3.jpg',
  '/images/jobs/4.jpg',
  '/images/jobs/5.jpg',
  '/images/jobs/6.jpg',
  '/images/jobs/7.jpg',
  '/images/jobs/8.jpg',
  '/images/jobs/9.jpg',
  '/images/jobs/10.jpg',
  '/images/jobs/11.jpg',
  '/images/jobs/12.jpg',
  '/images/jobs/13.jpg',
  '/images/jobs/14.jpg',
  '/images/jobs/15.jpg',
  '/images/jobs/16.jpg',
  '/images/jobs/17.jpg',
  '/images/jobs/18.jpg',
  '/images/jobs/19.jpg',
];

const settings: Settings = {
  customPaging: function () {
    return <div className="dot"></div>;
  },
  className: 'slider variable-width',
  infinite: true,
  centerMode: true,
  speed: 320,
  arrows: false,
  swipe: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 2,
  variableWidth: true,
  rows: 1,
  useTransform: true,
  responsive: [
    {
      breakpoint: RESPONSIVE.tablet,
      settings: {
        centerMode: false,
        arrows: true,
        speed: 120,
        slidesToShow: 1,
        initialSlide: 1,
        swipe: true,
        dots: false,
        infinite: true,
        prevArrow: (
          <div>
            <ArrowForwardIcon className={style.jobArrow} />
          </div>
        ),
        nextArrow: (
          <div>
            <ArrowForwardIcon className={style.jobArrow} />
          </div>
        ),
      },
    },
  ],
};
type RefType = { current: { slickNext: () => void } };

const Jobs = () => {
  let sliderRef = useRef<RefType>();

  const next = () => {
    //@ts-expect-error react-slick ref no type
    sliderRef.slickNext();
  };
  const previous = () => {
    //@ts-expect-error react-slick ref no type
    sliderRef.slickPrev();
  };
  return (
    <>
      <section id="jobs" className={style.jobs}>
        <div className={style.jobsHead}>
          <h2 className={style.title}>Мои работы</h2>
          <div className={style.buttons}>
            <div className={style.button} onClick={previous}>
              <ArrowForwardIcon className={style.slickPrev} />
            </div>
            <div className={style.button} onClick={next}>
              <ArrowForwardIcon className={style.slickNext} />
            </div>
          </div>
        </div>
        <div className={`job-courusel ${style.jobsCourusel}`}>
          <div className="courusel-container">
            <Slider
              {...settings}
              ref={(slider) => {
                //@ts-expect-error react-slick ref no type
                sliderRef = slider;
              }}
            >
              {jobImages.map((src, i) => {
                return (
                  <img
                    key={i}
                    src={src}
                    className="image"
                    alt="Восстановление волос"
                    loading="lazy"
                  ></img>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
