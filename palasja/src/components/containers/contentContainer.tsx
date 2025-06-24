import style from './contentContainer.module.css'

interface ContentWrapperProps {
  children: React.ReactNode
}

interface ContentWrapper extends ContentWrapperProps {
  className?: string
}
export const ContentContainer = ({ children }: ContentWrapperProps)=> {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}

export const ContentWrapper = ({ children, className = '' }: ContentWrapper)=> {
  return (
    <section className={`${style.wraper} ${className}`}>
      <ContentContainer>
        {children}
      </ContentContainer>
    </section>
  )
}