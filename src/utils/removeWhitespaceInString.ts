export default function removeNbsp(str:string) {
  const hasNbsp = str.includes("&nbsp;");

  if (hasNbsp) {
    const withoutNbsp = str.replace(/&nbsp;/g, "");
    return withoutNbsp;
  }

  return str;
}
