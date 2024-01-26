function isVeryStrong() {
  return "very strong";
}

function isStrong(entropy: number) {
  if (entropy >= 60 && entropy <= 119) {
    return "strong";
  }
  return isVeryStrong();
}

function isWeak(entropy: number) {
  if (entropy >= 36 && entropy <= 59) {
    return "weak";
  }
  return isStrong(entropy);
}

function isVeryWeak(entropy: number) {
  if (entropy >= 0 && entropy <= 35) {
    return "very weak";
  }
  return isWeak(entropy);
}

export function getStrength(entropy: number) {
  return isVeryWeak(entropy);
}
