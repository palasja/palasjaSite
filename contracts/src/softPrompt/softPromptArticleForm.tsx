import { useEffect, useState } from 'react';
import style from './softPromptForm.module.css';
import { getURLByBase64File, NotNullubleValue, toBase64 } from '../helpers/helper';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useIsUpdate } from '../hooks/useIsUpdate';
import {
  SoftArticle,
  SoftArticleLink,
  SoftArticle as SoftArticleType,
  SoftInfoContentType,
  SoftInfoForm,
} from '../helpers/contractTypes';
import { SOFT_INFO_IMAGE_PREFIX, SOFT_INFO_SPLITER_IMAGE } from '../helpers/constants';
import {
  useAddSoftArticleMutation,
  useUpdateSoftArticleMutation,
} from '../redux/slices/softInfoArticleRTK';
import {
  useAddSoftArticleLinksMutation,
  useDeleteSoftArticleLinkMutation,
  useUpdateSoftArticleLinkMutation,
} from '../redux/slices/softInfoArticleLinkRTK';
import { AddIcon, RemoveIcon } from '../components/icons/icons';
import { useAppDispatch } from '../redux/hooks';
import { choseArticleId } from '../redux/slices/softSlice';

type ChangingSoftArticleFormProps = {
  changingSoftArticle: SoftArticleType | undefined;
  changingSoftLinks: SoftArticleLink[] | undefined;
  softInfoId: string;
  clearCallback: (articleId: string) => void;
};
let activeEl = '';

const setActive = (e: any) => {
  if ((e.target as HTMLElement).getAttribute('area-soft-info') !== undefined)
    activeEl = (e.target as HTMLElement).id;
};

const ImageContainer = ({
  img,
  id,
  removeCallback,
}: {
  id: string;
  img: string;
  removeCallback: () => void;
}) => {
  return (
    <div area-soft-info="" onClick={setActive} className={style.imageCont}>
      <img id={id} src={img}></img>
      <div className={style.closeBtn} onClick={removeCallback}>
        <RemoveIcon />
      </div>
    </div>
  );
};

const TextField = ({ id, text = undefined }: { id: string; text?: string }) => {
  return (
    <textarea
      area-soft-info=""
      id={id}
      className={style.field}
      onClick={setActive}
      defaultValue={text}
    />
  );
};

const getId = () => uuidv4();

const SoftInfoArticleForm = ({
  changingSoftArticle,
  changingSoftLinks,
  softInfoId,
  clearCallback,
}: ChangingSoftArticleFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SoftInfoForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'softLinks',
  });
  const [addSoftArticle] = useAddSoftArticleMutation();
  const [updateSoftArticle] = useUpdateSoftArticleMutation();
  const [addSoftArticleLinks] = useAddSoftArticleLinksMutation();
  const [updateSoftArticleLinks] = useUpdateSoftArticleLinkMutation();
  const [deleteSoftArticleLinks] = useDeleteSoftArticleLinkMutation();
  const [softInfoContent, setSoftInfoContent] = useState<SoftInfoContentType[]>([]);
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();

  const onSubmitCreate: SubmitHandler<SoftInfoForm> = async (data) => {
    
    const newArticle: SoftArticle = {
      id: '',
      name: data.name,
      info: '',
      softInfoId: softInfoId,
    };
    const newArticleContentArr = softInfoContent.map((c) => {
      if (c.type === 'image') {
        return c.value;
      } else {
        const val = (document.getElementById(c.id) as HTMLTextAreaElement).value;
        return val.length === 0 ? '' : val;
      }
    });
    newArticle.info = newArticleContentArr.join(SOFT_INFO_SPLITER_IMAGE);
    const newArticleId = (await addSoftArticle(newArticle).unwrap()).id;
    if (data.softLinks.length > 0) {
      const links = data.softLinks;
      links.forEach((l) => (l.softArticleId = newArticleId));
      addSoftArticleLinks(links);
    }
    console.log(newArticleId);
    resetForm(newArticleId);
  };

  const onSubmitUpdate: SubmitHandler<SoftInfoForm> = async (data) => {
    const articleContentArr = softInfoContent.map((c) => {
      if (c.type === 'image') {
        return c.value;
      } else {
        const val = (document.getElementById(c.id) as HTMLTextAreaElement).value;
        return val.length === 0 ? '' : val;
      }
    });
    data.info = articleContentArr.join(SOFT_INFO_SPLITER_IMAGE);
    updateSoftArticle(data);

    if (data.softLinks.length > 0) {
      const links = data.softLinks;
      const newLinks = links.filter((l) => l.id === '0');
      const changingLinks = links.filter((l) => l.id !== '0');
      const linksIdArr = links.map((l) => l.id);
      const changingIdArr = changingSoftLinks?.map((l) => l.id);
      const removedLinksId = changingIdArr?.filter((sourceId) => !linksIdArr.includes(sourceId));

      if (newLinks.length !== 0) {
        newLinks.forEach((l) => (l.softArticleId = data.id));
        addSoftArticleLinks(newLinks);
      }

      if (changingLinks.length !== 0) updateSoftArticleLinks(changingLinks);

      if (removedLinksId && removedLinksId.length !== 0)
        removedLinksId.forEach((id) => deleteSoftArticleLinks(id));
      }
      resetForm(data.id);
  };

  const resetForm = (articleId: string) => {
    clearCallback(articleId);
    reset();
  };
  const removeSoftInfoImage = (id: string) => {
    const removeIndex = softInfoContent.findIndex((c) => c.id === id);
    let removeCount = 0;
    //if image between text than union text and remove next textarea
    if (
      softInfoContent[removeIndex - 1].type === 'text' &&
      softInfoContent[removeIndex + 1].type === 'text'
    ) {
      const prevTextEl = document.getElementById(
        softInfoContent[removeIndex - 1].id
      ) as HTMLTextAreaElement;
      const nextTextEl = document.getElementById(
        softInfoContent[removeIndex + 1].id
      ) as HTMLTextAreaElement;
      prevTextEl.value =
        nextTextEl.value.length === 0
          ? prevTextEl.value
          : prevTextEl.value + '\n' + nextTextEl.value;
      removeCount = 2;
    } else {
      removeCount = 1;
    }
    setSoftInfoContent([
      ...softInfoContent.slice(0, removeIndex),
      ...softInfoContent.slice(removeIndex + removeCount),
    ]);
  };

  useEffect(() => {
    if (changingSoftArticle) {
      setIsUpdate(true);
      setValue('id', changingSoftArticle.id);
      setValue('name', changingSoftArticle.name);
      changingSoftLinks && setValue('softLinks', changingSoftLinks);

      const imagePrefRegExp = new RegExp(SOFT_INFO_IMAGE_PREFIX);
      const arr: SoftInfoContentType[] = changingSoftArticle.info
        .split(SOFT_INFO_SPLITER_IMAGE)
        .map((s) => {
          return {
            id: getId(),
            type: imagePrefRegExp.test(s) ? 'image' : 'text',
            value: s,
          };
        });
      setSoftInfoContent([...arr]);
    } else {
      const newTextField: SoftInfoContentType = { type: 'text', id: getId() };
      setSoftInfoContent([newTextField]);
    }
  }, [changingSoftArticle]);

  useEffect(() => {
    const pastImage = async (e: ClipboardEvent) => {
      if (e.clipboardData !== null) {
        const item = Array.from(e.clipboardData.items).find((x) => /^image\//.test(x.type));
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
        const contentTextObject: SoftInfoContentType = { id: textId, type: 'text' };
        const contentImageObject: SoftInfoContentType = { id: imgId, type: 'image', value: a };
        //put image in text of textarea
        if (document.activeElement?.tagName.toLocaleLowerCase() === 'textarea') {
          const textareaEl = document.activeElement as HTMLTextAreaElement;
          const textareaElId = softInfoContent.findIndex((sic) => sic.id === textareaEl.id);

          const start = textareaEl.selectionStart;
          const prevValue = textareaEl.value.slice(0, start);
          const prevId = textareaEl.id;
          const nextValue = textareaEl.value.slice(start);

          const prevContentTextObject: SoftInfoContentType = {
            id: prevId,
            type: 'text',
            value: prevValue,
          };
          const nextContentTextObject: SoftInfoContentType = {
            id: textId,
            type: 'text',
            value: nextValue,
          };
          setSoftInfoContent([
            ...softInfoContent.slice(0, textareaElId),
            prevContentTextObject,
            contentImageObject,
            nextContentTextObject,
            ...softInfoContent.slice(textareaElId + 1),
          ]);
        } else if (setSoftInfoContent.length === 1 || activeEl.length != 0) {
          //put first image
          setSoftInfoContent([...softInfoContent, contentImageObject, contentTextObject]);
        } else {
          //put more than one
          const index = softInfoContent.findIndex((c) => c.id === activeEl);
          setSoftInfoContent([
            ...softInfoContent.slice(0, index),
            contentImageObject,
            contentTextObject,
            ...softInfoContent.slice(index),
          ]);
        }
      }
    };
    window.addEventListener('paste', pastImage);

    return () => window.removeEventListener('paste', pastImage);
  }, [softInfoContent]);

  const LinkRow = ({ id, index }: { id: string; index: number }) => {
    return (
      <div key={id}>
        <section className={'section'} key={id}>
          <input
            value={`softLinks.${index}.id`}
            type="hidden"
            {...register(`softLinks.${index}.id` as const, {
              required: false,
            })}
          />
          <input
            placeholder="name"
            {...register(`softLinks.${index}.name` as const, {
              required: true,
            })}
            className={errors?.softLinks?.[index]?.name ? 'error' : ''}
          />
          <input
            placeholder="url"
            type="string"
            {...register(`softLinks.${index}.url` as const, {
              required: true,
            })}
            className={errors?.softLinks?.[index]?.url ? 'error' : ''}
          />
          <span onClick={() => remove(index)} className={style.removeIconCont}>
            <RemoveIcon />
          </span>
        </section>
      </div>
    );
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
          <input
            placeholder="Name"
            {...register(`name` as const, {
              required: true,
            })}
          />
          <div className={style.addLink}>
            <AddIcon onClick={() => append({ id: '0', name: '', url: '', softArticleId: '' })} />
            <p>Ссылки </p>
          </div>
          {/* <h3>Ссылки</h3>
          <button
            type="button"
            onClick={() => append({ id: '0', name: '', url: '', softArticleId: '' })}
          >
            Добавить ссылку
          </button> */}
          {fields.map((field, index) => {
            return <LinkRow id={field.id} index={index} />;
          })}

          <br />
          <input type="submit" value={btnValue} />
        </form>
      </div>
      <div id="articleBlock">
        {softInfoContent.map((info) => {
          return info.type === 'text' ? (
            <TextField id={info.id} text={info.value} key={info.id} />
          ) : (
            <ImageContainer
              id={info.id}
              img={NotNullubleValue(info.value)}
              removeCallback={() => removeSoftInfoImage(info.id)}
              key={info.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default SoftInfoArticleForm;
