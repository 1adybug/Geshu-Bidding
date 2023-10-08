export default function extractFileSuffix(fileName: string) {
  return fileName.substring(fileName.lastIndexOf(".") + 1);
}
