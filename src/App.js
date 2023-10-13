// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [moneyInput, setMoneyInput] = useState("");
  const [curInput, setCurInput] = useState("EUR");
  const [curOutput, setCurOutput] = useState("USD");
  const [moneyOutput, setMoneyOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchConvertMoney() {
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${moneyInput}&from=${curInput}&to=${curOutput}`
        );
        const data = await res.json();
        setMoneyOutput(data.rates[curOutput]);

        // console.log(data.rates[curOutput]);

        setIsLoading(false);
      }
      if (curInput === curOutput) return setMoneyOutput(moneyInput);
      fetchConvertMoney();
    },
    [moneyInput, curInput, curOutput]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setMoneyInput(Number(e.target.value));
        }}
        value={moneyInput}
        disabled={isLoading}
      />
      <select
        value={curInput}
        onChange={(e) => setCurInput(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={curOutput}
        onChange={(e) => setCurOutput(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {moneyOutput} {curOutput}
      </p>
    </div>
  );
}
