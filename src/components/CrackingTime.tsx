import { useState } from "react";
import { calc_entropy, calculateTimeToCrack } from "../utils/crackingTime";

export default function CrackingTime() {
  const [input, setInput] = useState("");

  function handleInput(value: string) {
    setInput(value);
  }

  return (
    <>
      <section className="grid gap-4">
        <span className="text-gray40 text-sm font-normal">
          Tip: Avoid the use of dictionary words or common names, and avoid
          using any personal information
        </span>
        <label htmlFor=""></label>
        <input
          name="passwordTest"
          onChange={(event) => handleInput(event.target.value)}
          className="bg-transparent rounded-md border-2 border-gray60 py-4 px-3 w-full text-white text-base font-normal"
          type="text"
          value={input}
        />
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
          <div className="w-full h-3 bg-redOrange"></div>
          <div className="w-full h-3 bg-orangePeel"></div>
          <div className="w-full h-3 bg-orangePeel"></div>
          <div className="w-full h-3 bg-greenDarkMint"></div>
        </footer>
      </section>
      <div className="grid gap-3">
        <span className="text-white text-center text-base font-normal">
          Time to crack your password
        </span>
        <h2 className="text-white text-center text-3xl font-bold">
          {calculateTimeToCrack(input)}
        </h2>
        <h2 className="text-white text-center text-3xl font-bold">
          {calc_entropy(input)}
        </h2>
      </div>
      <div className="flex gap-2 py-10 px-2 rounded-md border border-greenDarkMint w-full">
        <span className="text-xl font-bold text-center text-greenDarkMint">
          Great! Using that password avoids rapid attackers!
        </span>
      </div>
    </>
  );
}
