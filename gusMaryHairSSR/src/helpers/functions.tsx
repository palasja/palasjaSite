export const togleStyle = (element: HTMLElement, style: string) => {
  const linkArray = [...(element.parentElement?.children as HTMLCollection)];
  linkArray.forEach((c) => c.classList.remove(style));
  element.classList.add(style);
};
