type CodeProps = {
  name: string,
  code: string
}
const Code = ({name, code}: CodeProps) => {
  return(
    <>
      <h3>{name}</h3>
      <pre>{code}</pre>
    </>
  );
}

export default Code