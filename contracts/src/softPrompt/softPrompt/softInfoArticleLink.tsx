import style from './../softPrompt.module.css';
import { SoftArticleLink } from '../../helpers/contractTypes';

const SoftInfoArticleLink = ({ links }: { links: SoftArticleLink[] }) => {
  return (
    <>
      <aside className={style.linkContainer}>
        {links &&
          links.map((a, i) => {
            return (
              <a className={style.link} href={a.url} key={i} target="_blank">
                {a.name}
              </a>
            );
          })}
      </aside>
    </>
  );
};

export default SoftInfoArticleLink;
