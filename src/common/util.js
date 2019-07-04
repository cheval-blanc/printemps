export function bytesToImage(format, bytes) {
  const base64String = bytes.reduce((str, b) => str += String.fromCharCode(b), '');
  return `data:${format};base64,${window.btoa(base64String)}`;
}
