import './feedback.css';
import 'slick-carousel/slick/slick.css';
import style from './feedback.module.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { FeedbackItem } from '../../../helpers/types';
import { RESPONSIVE } from '../../../helpers/constants';

const settings: Settings = {
  className: `style.sliderElement`,
  dots: false,
  infinite: true,
  speed: 1520,
  arrows: false,
  swipe: false,
  slidesToShow: 2,
  slidesToScroll: 2,
  initialSlide: 0,
  rows: 2,
  useTransform: true,
  responsive: [
    {
      breakpoint: RESPONSIVE.tablet,
      settings: {
        speed: 1320,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        infinite: true,
        swipe: true,
        arrows: true,
        prevArrow: (
          <div>
            <ArrowForwardIcon className={style.feedbackArrow} />
          </div>
        ),
        nextArrow: (
          <div>
            <ArrowForwardIcon className={style.feedbackArrow} />
          </div>
        ),
      },
    },
  ],
};
const FeedbackBlock = (props: { item: FeedbackItem }) => {
  const { name, text } = props.item;
  return (
    <div className={style.feedbackBlock}>
      <img src="/icons/quotes.svg" alt="quotes" className={`quotes ${style.feedbackQuotes}`} />
      <p className={style.text}>{text}</p>
      <p className={style.name}>{name}</p>
    </div>
  );
};
const Feedback = (props: { feedbackItems: FeedbackItem[] }) => {
  const { feedbackItems } = props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(document.body.clientWidth <= RESPONSIVE.tablet ? true : false);
  }, []);
  let sliderRef = useRef<{ slickNext: () => void }>();
  const next = () => {
    //@ts-expect-error react-slick ref no type
    sliderRef.slickNext();
  };
  const previous = () => {
    //@ts-expect-error react-slick ref no type
    sliderRef.slickPrev();
  };
  const getFeedbackItemWithQuotes = () => {
    let result = [];
    //В зависимости от ширины экрана добавить блоки со скобками
    if (!isMobile) {
      let countQuotesBlock = 0;
      result = [...Array(feedbackItems.length + Math.round(feedbackItems.length / 3))].map(
        (_el, i) => {
          if (i == 1 || i == countQuotesBlock * 4 + 1) {
            countQuotesBlock++;
            return (
              <div key={i} className={style.quote}>
                <img src="/icons/quotes.svg" alt="quotes" className={style.filter} />
              </div>
            );
          } else {
            return <FeedbackBlock key={i} item={feedbackItems[i - countQuotesBlock]} />;
          }
        }
      );
    } else {
      result = feedbackItems.map((f, i) => <FeedbackBlock key={i} item={f} />);
    }
    return result;
  };
  return (
    <section id="feedback" className={style.feedback}>
      <div className={style.feedbackHead}>
        <h2 className={style.title}>Отзывы</h2>
        <div className={style.buttons}>
          <div className={style.button} onClick={previous}>
            <ArrowForwardIcon sx={{ fontSize: 80 }} className={style.slickPrev} />
          </div>
          <div className={style.button} onClick={next}>
            <ArrowForwardIcon sx={{ fontSize: 80 }} className={style.slickNext} />
          </div>
        </div>
      </div>
      <div className={`feedback-courusel ${style.feedbackCourusel}`}>
        <div className="courusel-container">
          <Slider
            {...settings}
            ref={(slider) => {
              //@ts-expect-error react-slick ref no type
              sliderRef = slider;
            }}
          >
            {getFeedbackItemWithQuotes().map((d) => d)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
