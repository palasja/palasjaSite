import { JSX } from "react"

export const splitLineGetParagragh = (str: string):JSX.Element[] => {
      return str.split('/n').map((s) => (<p>{s}</p>))
}