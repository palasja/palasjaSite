import { RemoveIcon } from '../../components/icons/icons';
import style from './softPromptForm.module.css';

type ImageContainerProps = {
  id: string;
  img: string;
  removeCallback: () => void;
  setActive: (e: any) => void;
};

const ImageContainer = ({ img, id, removeCallback, setActive }: ImageContainerProps) => {
  return (
    <div area-soft-info="" onClick={setActive} className={style.imageCont}>
      <img id={id} src={img}></img>
      <div className={style.closeBtn} onClick={removeCallback}>
        <RemoveIcon />
      </div>
    </div>
  );
};

export default ImageContainer;
