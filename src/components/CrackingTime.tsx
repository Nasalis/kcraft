import { useState } from "react";
import { calcEntropy, calculateTimeToCrack } from "../utils/crackingTime";

import CheckIcon from "../assets/checkIcon.svg";
import EyeOnIcon from "../assets/eyeOnIcon.svg";
import EyeOffIcon from "../assets/eyeOffIcon.svg";
import { getStrength } from "../utils/passwordStrength";

export default function CrackingTime() {
  const [input, setInput] = useState("");

  const passwordStrengthBars = [
    { background: "bg-redOrange" },
    { background: "bg-orangePeel" },
    { background: "bg-orangePeel" },
    { background: "bg-greenDarkMint" },
  ];

  function handleInput(value: string) {
    setInput(value);
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
            type="text"
            value={input}
          />
          <img
            src={EyeOnIcon.src}
            alt="icon to visible password"
            className="absolute top-5 right-4 w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-sm font-semibold">
            Characters amount: {input.length}
          </span>
          <ul className="flex gap-4 capitalize">
            <li className="text-gray50 text-sm font-normal">lower case</li>
            <li className="text-gray50 text-sm font-normal">upper case</li>
            <li className="text-gray50 text-sm font-normal">numbers</li>
            <li className="text-gray50 text-sm font-normal">symbols</li>
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
