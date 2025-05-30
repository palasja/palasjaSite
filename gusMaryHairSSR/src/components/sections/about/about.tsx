import style from './about.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider, { Settings } from 'react-slick';

import './certificateSlider.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '../../modalContent';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RESPONSIVE } from '../../../helpers/constants';

const certifacateImages: string[] = [
  '/images/certificates/1.jpg',
  '/images/certificates/2.jpg',
  '/images/certificates/3.jpg',
  '/images/certificates/4.jpg',
  '/images/certificates/5.jpg',
  '/images/certificates/6.jpg',
  '/images/certificates/7.jpg',
];
const settings: Settings = {
  customPaging: function () {
    return <div className="dot"></div>;
  },
  focusOnSelect: true,
  dots: true,
  infinite: true,
  speed: 320,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipe: false,
  prevArrow: (
    <div>
      <ArrowForwardIcon className={style.сertificatesArrow} />
    </div>
  ),
  nextArrow: (
    <div>
      <ArrowForwardIcon className={style.сertificatesArrow} />
    </div>
  ),
  responsive: [
    {
      breakpoint: RESPONSIVE.tablet,
      settings: {
        slidesToShow: 1,
        infinite: true,
        swipe: true,
        dots: false,
      },
    },
  ],
};
const whyListItems = [
  `я стараюсь расти в профессиональном плане: изучаю новые техники, методики, перенимаю опыт и знания лидеров в сфере красоты`,
  `я никогда не приступаю к работе без предварительной диагностики состояния волос и устного опроса клиента`,
  `я придерживаюсь адекватной ценовой политики на свои услуги, я радую вас акциями, скидками и розыгрышами`,
];
const MODAL_IMAGE_ID = 'idModalImage';
const About = () => {
  const [idModalImage, setIdModalImage] = useState<number>(-1);

  return (
    <>
      <section id="about" className={style.about}>
        <div className={style.aboutContent}>
          <div className={style.imageContainer}>
            <img
              src="/images/maria_flower.jpg"
              className={style.image}
              alt="Мария с цветком"
              loading="lazy"
            ></img>
          </div>
          <div className={style.aboutInfo}>
            <h2 className={style.title}>Обо мне</h2>
            <p className={style.aboutText}>
              Привет. Меня зовут Мария <br className="responsiveNewLineTablet" />и я сделаю вас
              неотразимой.
              <br className="responsiveNewLineMonitor" />
              <br className="responsiveNewLineTablet" /> Я - парикмахер, мастер{' '}
              <br className="responsiveNewLineTablet" />
              по реконструкции волос.
              <br className="responsiveNewLineMobile" /> <br className="responsiveNewLineTablet" />В
              сфере красоты работаю <br className="responsiveNewLineTablet" />
              с 2013 года. <br className="responsiveNewLineMonitor" />
              <br className="responsiveNewLineTablet" />
              Сейчас очень много мастеров <br className="responsiveNewLineTablet" /> различного
              профиля и уровня <br className="responsiveNewLineTablet" />
              профессионализма, разной <br className="responsiveNewLineTablet" />
              ценовой категории, но так <br className="responsiveNewLineTablet" /> сложно найти
              своего.
            </p>
          </div>
          <div className={style.whyInfo}>
            <h3 className={style.whyTitle}>Почему я?</h3>
            <ul className={style.whyList}>
              {whyListItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={style.сertificates}>
        <h3 className={style.сertificatesTitle}>Обучение</h3>
        <div className={`certificate-courusel ${style.certificateCourusel}`}>
          <div className="courusel-container">
            <Slider
              {...settings}
              {...(settings.beforeChange = (_prev: number, next: number) => {
                const isModalShow = document?.getElementById(MODAL_IMAGE_ID);
                if (isModalShow != null) {
                  setIdModalImage(next);
                }
              })}
            >
              {certifacateImages.map((src, i) => {
                return (
                  <div
                    key={i}
                    className="image-container"
                    onClick={() => {
                      setIdModalImage(i);
                    }}
                  >
                    <img src={src} alt="сертификат" loading="lazy"></img>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        {idModalImage >= 0 &&
          createPortal(
            <ModalContent
              content={
                <img
                  id={`${MODAL_IMAGE_ID}`}
                  src={certifacateImages[idModalImage]}
                  className={style.certifacateModalImage}
                ></img>
              }
              onClose={() => {
                setIdModalImage(-1);
              }}
            />,
            document.getElementsByTagName('body')[0]
          )}
      </section>
    </>
  );
};

export default About;
