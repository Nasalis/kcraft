import { divmod } from "./divmod";

function hasOnlyLetters(password: string) {
  let setAmount = 0;
  const upperCaseReg = new RegExp(/[A-Z]/);
  const lowerCaseReg = new RegExp(/[a-z]/);

  if (upperCaseReg.test(password)) {
    setAmount += 26;
  }
  if (lowerCaseReg.test(password)) {
    setAmount += 26;
  }
  return setAmount;
}

function hasOnlyNumbers(password: string) {
  const numbersReg = new RegExp(/\d/);
  return numbersReg.test(password) ? 10 : 0;
}

function hasSpecialChar(password: string) {
  const charReg = new RegExp(/[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]/g);
  return charReg.test(password) ? 32 : 0;
}

function calcPassRange(...functions: Array<(data: string) => number>) {
  return (password: string) => {
    let passRange = 0;
    functions.forEach((func) => (passRange += func(password)));
    return passRange;
  };
}

export const getPassRange = (password: string) =>
  calcPassRange(hasOnlyLetters, hasOnlyNumbers, hasSpecialChar)(password);

export function calcEntropy(password: string) {
  const range = getPassRange(password);
  return Math.log2(range ** password.length);
}

function convertSecondsToTime(seconds: number) {
  const [minutes, secondsRemaing] = divmod(seconds, 60);
  const [hours, minsRemaing] = divmod(minutes, 60);
  const [days, hrsRemaing] = divmod(hours, 24);
  const [years, daysRemaing] = divmod(days, 365);

  if (secondsRemaing > 0 && minutes === 0) {
    return `${secondsRemaing.toPrecision(2)} seconds`;
  }

  if (years >= 1e6) {
    return `${years.toString()[0]} milion years`;
  }

  return `${years} years, ${daysRemaing} days, ${hrsRemaing} hours, ${minsRemaing} minutes, ${secondsRemaing.toPrecision(
    2
  )} seconds`;
}

export function calculateTimeToCrack(password: string) {
  if (!password.length) {
    return "0 second";
  }
  // Supposing a computer that explore a billion possibilities per second (10e9 operations per 1 second)
  const range = getPassRange(password);
  const possibility_space = range ** password.length;
  const seconds_time = possibility_space / 10e9;
  return convertSecondsToTime(seconds_time);
}
