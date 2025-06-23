import style from './conteiner.module.css'

function Conteiner ({ children }: {children: React.ReactNode}){
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}

export default Conteiner