"use client";
import Image from "next/image";
import "./css/homePage.css";
import searchIcon from "./../public/searchIcon.png";
import ResultCalc from "./components/ResultCalc";
import { FormEvent, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>(""); // stato controllato
  const [finalValue, setFinalValue] = useState<number>(0);
  const [submitHandler, setSubmitHandler] = useState(false);

  function calcRal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const regexNumero = /^\d+(\.\d+)?$/;
    const valueTrim = inputValue.trim();
    const valueInNumber = Number(valueTrim);

    if (!regexNumero.test(valueTrim) || valueInNumber < 4000) {
      alert("Inserisci solo numeri validi");
      return;
    } else {
      const valueInNumber = parseFloat(valueTrim);
      setFinalValue(valueInNumber);
      setSubmitHandler((prev) => !prev); // serve per ResultCalc
    }
  }

  return (
    <div className="containerMain">
      <form id="formRedditoAnnuo" onSubmit={calcRal}>
        <div className="inputContainerAnnuo">
          <input
            type="text"
            placeholder="Reddito annuo lordo"
            className="inputRedditoAnnuo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Image src={searchIcon} alt="Search Icon" className="searchIcon" />
        </div>
        <button type="submit" className="formAnnuoSubmit">
          Calcola
        </button>
      </form>
      <ResultCalc
        finalValue={finalValue}
        submitHandler={submitHandler}
        setFinalValue={setFinalValue}
      />
    </div>
  );
}
