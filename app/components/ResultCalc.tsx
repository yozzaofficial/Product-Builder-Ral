"use client";
import React from "react";
import DisplayResult from "./DisplayResult";
type propsType = {
  finalValue: number;
  submitHandler: boolean;
  setFinalValue: React.Dispatch<number>;
};

export default function ResultCalc({
  finalValue,
  submitHandler,
  setFinalValue,
}: propsType) {
  const [filterC, setFilterC] = React.useState("D");
  const [filterM, setFilterM] = React.useState(13);

  const [data, SetData] = React.useState({
    inps: 0,
    irpef: 0,
    region: 0,
    comun: 0,
    month: 13,
    tfr: 0,
  });

  const [displayResult, setDisplayResult] = React.useState(0);
  function resetCalc() {
    setFilterC("D");
    setFilterM(13);
    SetData({
      inps: 0,
      irpef: 0,
      region: 0,
      comun: 0,
      month: 13,
      tfr: 0,
    });
    setFinalValue(0);
  }
  React.useEffect(() => {
    const inps = finalValue * 0.0919;
    const imponibile = finalValue - inps;

    // Calcolo IRPEF progressiva
    let irpef = 0;
    if (imponibile <= 15000) {
      irpef = imponibile * 0.23;
    } else if (imponibile <= 28000) {
      irpef = 15000 * 0.23 + (imponibile - 15000) * 0.25;
    } else if (imponibile <= 50000) {
      irpef =
        15000 * 0.23 + (28000 - 15000) * 0.25 + (imponibile - 28000) * 0.35;
    } else {
      irpef =
        15000 * 0.23 +
        (28000 - 15000) * 0.25 +
        (50000 - 28000) * 0.35 +
        (imponibile - 50000) * 0.43;
    }

    const detrazioneMax = 1880;
    let detrazioni = 0;

    if (finalValue <= 8000) {
      detrazioni = detrazioneMax;
    } else if (finalValue <= 15000) {
      detrazioni = (detrazioneMax * (15000 - finalValue)) / (15000 - 8000);
    } else if (finalValue <= 50000) {
      detrazioni = (detrazioneMax * (50000 - finalValue)) / (50000 - 15000);
    } else {
      detrazioni = 0;
    }

    detrazioni = Math.max(detrazioni, 0);

    if (filterC === "D") {
      if (detrazioni < 690) detrazioni = 690;
    } else if (filterC === "I") {
      if (detrazioni < 1380) detrazioni = 1380;
    }

    const irpefNetta = Math.max(irpef - detrazioni, 0);

    const regionale = imponibile * 0.0123; // Lombardia
    const comunale = imponibile * 0.008; // Milano

    const tfr = finalValue / 13.5;

    const money = finalValue - inps - irpefNetta - regionale - comunale;

    SetData({
      inps: inps,
      irpef: irpefNetta,
      region: regionale,
      comun: comunale,
      month: filterM,
      tfr: tfr,
    });

    if (filterM === 13) {
      setDisplayResult(money / 13);
    } else if (filterM === 14) {
      setDisplayResult(money / 14);
    }
  }, [submitHandler]);
  return (
    <>
      <div className="resultContainer">
        <header className="resultHeader">
          <h2>Filtri calcolo:</h2>
          <p className="resetResultButton" onClick={() => resetCalc()}>
            Azzera
          </p>
        </header>
        <main className="resultDisplay">
          <div className="filterContract">
            <p className="filterName">Contratto:</p>
            <div className="contractFIlter">
              <p
                className={filterC === "D" ? "filterActive" : ""}
                onClick={() => setFilterC("D")}
              >
                Determinato
              </p>
              <p
                className={filterC === "I" ? "filterActive" : ""}
                onClick={() => setFilterC("I")}
              >
                Indeterminato
              </p>
            </div>
          </div>
          <div className="monthFilter">
            <p className="filterName">Mensilità:</p>
            <div className="contractFIlter">
              <p
                className={filterM === 13 ? "filterActive" : ""}
                onClick={() => setFilterM(13)}
              >
                Tredici
              </p>
              <p
                className={filterM === 14 ? "filterActive" : ""}
                onClick={() => setFilterM(14)}
              >
                Quattordici
              </p>
            </div>
          </div>
          <div className="monthFilter">
            <p className="filterName">Località:</p>
            <div className="contractFIlter">
              <p className="filterActive">Milano</p>
            </div>
          </div>
        </main>
      </div>
      {finalValue !== 0 && <DisplayResult result={displayResult} data={data} />}
    </>
  );
}
