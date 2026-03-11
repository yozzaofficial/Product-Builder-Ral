"use client";
import { ThreeDot } from "react-loading-indicators";
import React from "react";
type dataType = {
  inps: number;
  irpef: number;
  region: number;
  comun: number;
  month: number;
  tfr: number;
};

type propsType = {
  result: number;
  data: dataType;
};

export default function DisplayResult({ result, data }: propsType) {
  const [animation, setAnimation] = React.useState(true);
  React.useEffect(() => {
    setAnimation(true);

    setTimeout(() => setAnimation(false), 1000);
  }, [result]);
  return (
    <div className="displayContainer">
      {animation && (
        <div className="animationContainer">
          {" "}
          <ThreeDot color="#385e71" size="medium" />
        </div>
      )}
      {!animation && (
        <div className="displayResult">
          <div className="result1">
            <div>
              <p>TFR:</p>
              <p> {data.tfr.toFixed(2)} €</p>
            </div>
            <div>
              <p>TFR Mensile:</p>
              <p> {(data.tfr / data.month).toFixed(2)} €</p>
            </div>
            <div>
              <p>Inps: </p>
              <p>{data.inps.toFixed(2)} €</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="result2">
            <div>
              <p>Irpef:</p>
              <p> {data.irpef.toFixed(2)} €</p>
            </div>
            <div>
              <p>Add. Regione:</p>
              <p> {data.region.toFixed(2)} €</p>
            </div>
            <div>
              <p>Add. Comunali: </p>
              <p>{data.comun.toFixed(2)} €</p>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="result3">
            <div>
              <p>Totale netto annuale: </p>
              <p>{(result * data.month).toFixed(2)} €</p>
            </div>
            <div>
              <p>Totale netto mensile:</p>
              <p className="result"> {result.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
