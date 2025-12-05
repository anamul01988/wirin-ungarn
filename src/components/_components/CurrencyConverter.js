"use client";
import React, { useState, useEffect, useCallback } from "react";

const CurrencyConverter = ({ isEurToHuf, onCurrencySwitch }) => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("HUF");
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("Loading...");

  const allowedCurrencies = ["EUR", "HUF", "USD", "CHF"];
  const apiURL = "https://open.er-api.com/v6/latest/";

  // Initialize currencies based on isEurToHuf prop
  useEffect(() => {
    if (isEurToHuf) {
      setFromCurrency("EUR");
      setToCurrency("HUF");
    } else {
      setFromCurrency("HUF");
      setToCurrency("EUR");
    }
  }, [isEurToHuf]);

  // Fetch exchange rate
  const updateRate = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}${fromCurrency}`);
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];

      if (exchangeRate) {
        setRate(exchangeRate);
        const calculatedResult = (
          parseFloat(amount || 0) * exchangeRate
        ).toFixed(2);
        setResult(calculatedResult);

        // Update date
        const date = new Date(data.time_last_update_utc);
        setLastUpdated(date.toISOString().split("T")[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error converting:", error);
      setLoading(false);
      setResult("Error");
    }
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    updateRate();
    // Auto-refresh every 5 minutes
    const interval = setInterval(updateRate, 300000);
    return () => clearInterval(interval);
  }, [updateRate]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty, numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const toggleCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    onCurrencySwitch();
  };

  const handleRefresh = () => {
    updateRate();
  };

  const headerPair = `${fromCurrency}<>${toCurrency}`;
  const footerPair = `${fromCurrency}/${toCurrency}`;
  const isGreenTheme = fromCurrency === "HUF";

  return (
    <div
      className={`currency-converter-widget ${isGreenTheme ? "green" : "red"}`}
    >
      <div className="card-header">
        <div className="header-top">
          <span
            id="header-pair"
            onClick={toggleCurrencies}
            style={{ cursor: "pointer" }}
          >
            {headerPair}
          </span>
          <div className="header-icons">
            <i className="fas fa-th-list"></i>
          </div>
        </div>
        <h1>Währungsrechner</h1>
      </div>

      <div className="card-body">
        <div className="input-group">
          <label>Menge</label>
          <div className="input-wrapper">
            <span className="currency-label">{fromCurrency}</span>
            <input
              type="number"
              id="amount"
              value={amount}
              min="0"
              onChange={handleAmountChange}
            />
            <button className="icon-btn" onClick={handleRefresh}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <div className="currency-row">
          <div className="input-group">
            <label>Von</label>
            <div className="select-wrapper">
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {allowedCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down dropdown-icon"></i>
            </div>
          </div>

          <div className="input-group">
            <label>Zu</label>
            <div className="select-wrapper">
              <select
                id="to-currency"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {allowedCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down dropdown-icon"></i>
            </div>
          </div>
        </div>

        <div className="result-section">
          <label>Ergebnisse</label>
          <div className="result-display">
            <span id="result-value">{loading ? "Loading..." : result}</span>
            <span id="result-currency">{toCurrency}</span>
          </div>
          <div className="result-footer">
            <span id="last-updated">{lastUpdated || "2025-11-25"}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <span id="footer-pair">{footerPair}</span>
        <span>Currency.Wiki</span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
