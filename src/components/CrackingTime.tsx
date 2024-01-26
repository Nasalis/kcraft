import { useState } from "react";
import { calcEntropy, calculateTimeToCrack } from "../utils/crackingTime";

import CheckIcon from "../assets/checkIcon.svg";
import EyeOnIcon from "../assets/eyeOnIcon.svg";
import EyeOffIcon from "../assets/eyeOffIcon.svg";
import { getStrength } from "../utils/passwordStrength";
import {
  checkLowerCase,
  checkNumbers,
  checkSpecialChar,
  checkUpperCase,
} from "../utils/checkRegExp";

export default function CrackingTime() {
  const [input, setInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordStrengthBars = [
    { background: "bg-redOrange" },
    { background: "bg-orangePeel" },
    { background: "bg-greenDarkMint" },
    { background: "bg-greenDarkMint50" },
  ];

  const textCases = [
    { label: "lower case", checkOccurence: checkLowerCase },
    { label: "upper case", checkOccurence: checkUpperCase },
    { label: "numbers", checkOccurence: checkNumbers },
    { label: "symbols", checkOccurence: checkSpecialChar },
  ];

  function handleInput(value: string) {
    setInput(value);
  }

  function handlePasswordVisible() {
    setPasswordVisible((prev) => !prev);
  }

  function getStrengthBarsAmount() {
    const entropy = calcEntropy(input);
    const strength = getStrength(entropy);

    switch (strength) {
      case "very weak":
        return 1;
      case "weak":
        return 2;
      case "strong":
        return 3;
      default:
        return 4;
    }
  }

  return (
    <>
      <section className="grid gap-4">
        <span className="text-gray40 text-sm font-normal">
          Tip: Avoid the use of dictionary words or common names, and avoid
          using any personal information
        </span>
        <div className="relative">
          <input
            name="passwordTest"
            onChange={(event) => handleInput(event.target.value)}
            className="bg-transparent rounded-md border-2 border-gray60 py-4 px-3 w-full text-white text-base font-normal"
            type={passwordVisible ? "text" : "password"}
            value={input}
          />
          <img
            src={passwordVisible ? EyeOffIcon.src : EyeOnIcon.src}
            alt="icon to visible password"
            className="absolute top-5 right-4 w-5 h-5 cursor-pointer"
            onClick={handlePasswordVisible}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-sm font-semibold">
            Characters amount: {input.length}
          </span>
          <ul className="flex gap-4 capitalize">
            {textCases.map((item, index) => (
              <li
                key={index}
                className={`${
                  item.checkOccurence(input)
                    ? "text-greenDarkMint"
                    : "text-gray-50"
                } text-sm font-normal`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <footer className="flex items-center justify-center gap-3">
          {passwordStrengthBars
            .slice(0, getStrengthBarsAmount())
            .map((element, index) => (
              <div
                key={index}
                className={`w-full h-3 ${element.background}`}
              ></div>
            ))}
        </footer>
      </section>
      <div className="grid gap-3 w-full">
        <span className="text-white text-center text-base font-normal">
          Time to crack your password
        </span>
        <h2 className="text-white text-center text-3xl font-bold">
          {calculateTimeToCrack(input)}
        </h2>
      </div>
      <div className="flex items-center gap-2 py-10 px-2 rounded-md border border-greenDarkMint w-full">
        <img src={CheckIcon.src} alt="icon to test result" />
        <span className="text-xl font-bold text-center text-greenDarkMint">
          Great! Using that password avoids rapid attackers!
        </span>
      </div>
    </>
  );
}
