function checkRegExp(text: string, pattern: RegExp) {
  const regx = new RegExp(pattern);
  return regx.test(text) ? true : false;
}

export function checkLowerCase(text: string) {
  return checkRegExp(text, /[a-z]/);
}

export function checkUpperCase(text: string) {
  return checkRegExp(text, /[A-Z]/);
}

export function checkNumbers(text: string) {
  return checkRegExp(text, /[0-9]/);
}

export function checkSpecialChar(text: string) {
  return checkRegExp(text, /[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]/g);
}
