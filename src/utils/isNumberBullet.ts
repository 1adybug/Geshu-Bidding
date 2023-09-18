export default function isNumberBullet(str) {
  const pattern = /^[1-9]\d*、$/;
  return pattern.test(str);
}
