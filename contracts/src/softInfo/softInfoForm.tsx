import { useEffect, useState } from 'react';
import style from './softInfoForm.module.css';
import { getURLByBase64File, NotNullubleValue, toBase64 } from '../helpers/helper';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { SoftArticle, SoftInfoContentType } from '../helpers/contractTypes';
import { SOFT_INFO_IMAGE_PREFIX, SOFT_INFO_SPLITER_IMAGE } from '../helpers/constants';

type ChangingSoftArticleFormProps = { changingSoftArticle: SoftArticle | undefined; clearCallback: () => void };
let activeEl = '';

const setActive = (e: any) => {
  if((e.target as HTMLElement).getAttribute('area-soft-info') !== undefined) activeEl = (e.target as HTMLElement).id;
}
  
const ImageContainer = ({ img, id, removeCallback }: {id: string, img: string, removeCallback: ()=>void}) => {
  return (
    <div area-soft-info='' onClick={setActive}>
      <div className={style.closeBtn} onClick={removeCallback}>X</div>
      <img id={id} src={img} ></img>
    </div>
  )
}

const TextField =  ({id ,text = undefined}: {id: string, text?: string}) => {
  return (
    <textarea area-soft-info='' id={id} className={style.field} onClick={setActive} defaultValue={text} />
    // </textarea> 
  );
}
  const getId = () => uuidv4();

const SoftInfoForm = ({ changingSoftArticle, clearCallback }: ChangingSoftArticleFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SoftArticle>();
  // const [addService] = useAddServiceMutation();
    // const [updateService] = useUpdateServiceMutation();
  const imagePrefRegExp = new RegExp(SOFT_INFO_IMAGE_PREFIX);
  const id = getId();
  // const contentIdObject:SoftInfoContentType = changingSoftArticle ? {type: 'text', id: changingSoftArticle.id, value:changingSoftArticle.info} : {type: 'text', id: id};
  // const initSoftInfoContentType = {type: 'text', id: contentIdObject.id, value:contentIdObject?.value};
  const [softInfoContent, setSoftInfoContent] = useState<SoftInfoContentType[]>([]);
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();

  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  });

  const onSubmitCreate: SubmitHandler<SoftArticle> = async (data) => {
    const arr = softInfoContent.map(c => {
      if(c.type === 'image'){
        return c.value; 
      } else {
        const val = (document.getElementById(c.id) as HTMLTextAreaElement).value;
        return val.length === 0 ? '' : val;
      }
    })
    data.info = arr.join(SOFT_INFO_SPLITER_IMAGE)
    console.log(data);
    // addContract(data);
    // resetForm();
  };

  const resetForm = () => {
    clearCallback();
    reset();
    // if (choosenOrg) setValue('orgId', choosenOrg.id.toString());
    // setIsUpdate(false);
  };  
   //onSubmitUpdate  
  const removeSoftInfoImage = (id: string) => {
    const removeIndex = softInfoContent.findIndex(c => c.id === id);
    let removeCount = 0;
    if(softInfoContent[removeIndex -1].type === 'text' && softInfoContent[removeIndex + 1].type === 'text'){
      const prevTextEl = (document.getElementById(softInfoContent[removeIndex - 1].id) as HTMLTextAreaElement);
      const nextTextEl = (document.getElementById(softInfoContent[removeIndex + 1].id) as HTMLTextAreaElement);
      prevTextEl.value = nextTextEl.value.length === 0 ?  prevTextEl.value : prevTextEl.value + '\n' + nextTextEl.value ;
      removeCount = 2;
    } else {
      removeCount = 1;
    }
    setSoftInfoContent([...softInfoContent.slice(0, removeIndex), ...softInfoContent.slice(removeIndex + removeCount)]);
  }
  useEffect(() => {
    if (changingSoftArticle) {
      setIsUpdate(true);
      setValue('id', changingSoftArticle.id);
      setValue('name', changingSoftArticle.name);
      setValue('links', changingSoftArticle.links);
      
      const arr:SoftInfoContentType[] = changingSoftArticle.info.split(SOFT_INFO_SPLITER_IMAGE).map(s => {
        return {
          id: getId(),
          type: imagePrefRegExp.test(s) ? 'image' : 'text',
          value:s} 
      });
      setSoftInfoContent([...arr]);
    } else {
      // resetForm();
    }
  }, [changingSoftArticle]);

useEffect(() =>{
  const pastImage = async (e: ClipboardEvent) => {
    if(e.clipboardData !== null){
      const item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));
      const blob = item?.getAsFile() as Blob; 
      const a = await toBase64(blob);
      const b = getURLByBase64File(a, 'image/png');
      const img = new Image();

      // img.onload = function(){
      //   document.getElementById('articleBlock')?.appendChild(img);
      // };

      img.src = URL.createObjectURL(blob);
      const imgId = getId();
      const textId = getId();
      const contentTextObject :SoftInfoContentType = {id: textId, type: 'text'};
      const contentImageObject :SoftInfoContentType = {id: imgId, type: 'image', value: a};
      // setContent([...content, <ImageContainer id={imgId} img={img} removeCallback={remove}/>, <TextField id={id} changeCallback={(str) => {contentIdObject.value = str}}/>])
      if(setSoftInfoContent.length === 1 || activeEl.length != 0){
        setSoftInfoContent([...softInfoContent, contentImageObject, contentTextObject]);
      } else {
        const index = softInfoContent.findIndex(c => c.id === activeEl);
        setSoftInfoContent([...softInfoContent.slice(0, index), contentImageObject, contentTextObject, ...softInfoContent.slice(0, index)]);
      }
    }
  }
  document.getElementsByTagName('body')[0].addEventListener("paste", pastImage);

  return () => document.getElementsByTagName('body')[0].removeEventListener("paste", pastImage);
  
}, [softInfoContent]);



  return (
    <>
    <div>
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <input
          placeholder="Name"
          {...register(`name` as const, {
            required: true
          })}
        />
        <h3>Ссылки</h3>
        <button
          type="button"
          onClick={() =>
            append({id:'', name:'', url:''})
          }
        >
          Добавить ссылку
        </button>
        {changingSoftArticle?.links && fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`links.${index}.name` as const, {
                    required: true
                  })}
                  className={errors?.links?.[index]?.name ? "error" : ""}
                />
                <input
                  placeholder="url"
                  type="string"
                  {...register(`links.${index}.url` as const, {
                    required: true
                  })}
                  className={errors?.links?.[index]?.url ? "error" : ""}
                />
                <button type="button" onClick={() => remove(index)}>
                  Удалить
                </button>
              </section>
            </div>
          );
        })}

        <br/>
        <input type="submit" value='Сохранить' />
      </form>

    </div>
    <div id='articleBlock'>
      {softInfoContent.map((info) => {
        return info.type === 'text' ? <TextField id={info.id} text={info.value} key={info.id}/> 
        : 
        <ImageContainer id={info.id} img={NotNullubleValue(info.value)} removeCallback={() => removeSoftInfoImage(info.id)} key={info.id}/>;
      })}

    </div>
    </>
    
  )
}

export default SoftInfoForm;
