import style from './../softPrompt.module.css';

const ImageContainer = ({ img }: { img: string }) => {
  return (
    <div area-soft-info="" className={style.imageCont}>
      <img src={img}></img>
    </div>
  );
};

export default ImageContainer;
