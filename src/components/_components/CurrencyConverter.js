"use client";
import React, { useState, useEffect } from "react";

const CurrencyConverter = ({ isEurToHuf, onCurrencySwitch }) => {
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch exchange rate
  useEffect(() => {
    fetchRate();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRate, 300000);
    return () => clearInterval(interval);
  }, [isEurToHuf]);

  const fetchRate = async () => {
    try {
      const from = isEurToHuf ? "EUR" : "HUF";
      const to = isEurToHuf ? "HUF" : "EUR";
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${from}&to=${to}`
      );
      const data = await response.json();
      setRate(data.rates[to]);
      setLastUpdated(data.date);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty, numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const calculateResult = () => {
    if (!rate) return "0.00";
    const amountNum = parseFloat(amount) || 0;
    if (isEurToHuf) {
      return (amountNum * rate).toFixed(2);
    } else {
      return (amountNum / rate).toFixed(2);
    }
  };

  const colorClass = isEurToHuf ? "red" : "green";
  const fromCurrency = isEurToHuf ? "Euro - EUR" : "Ungarischer Forint - HUF";
  const toCurrency = isEurToHuf ? "Ungarischer Forint - HUF" : "Euro - EUR";
  const resultCurrency = isEurToHuf ? "HUF" : "EUR";
  const currencyPair = isEurToHuf ? "EUR/HUF" : "HUF/EUR";

  return (
    <div className={`currency-converter-widget ${colorClass}`}>
      {/* Header */}
      <div className={`currency-header ${colorClass}`} onClick={onCurrencySwitch}>
        <h2>Währungsrechner</h2>
        <svg
          className="currency-refresh-icon"
          onClick={(e) => {
            e.stopPropagation();
            fetchRate();
          }}
          viewBox="0 0 24 24"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </div>

      {/* Body */}
      <div className="currency-body">
        {loading ? (
          <div className="currency-loading">Loading...</div>
        ) : (
          <>
            {/* Amount Input */}
            <div className="currency-form-group">
              <label className="currency-label">Menge</label>
              <div className="currency-input-wrapper">
                <span className={`currency-input-badge ${colorClass}`}>
                  {isEurToHuf ? "EUR" : "HUF"}
                </span>
                <input
                  type="text"
                  className="currency-input"
                  value={amount}
                  placeholder="1"
                  onChange={handleAmountChange}
                />
              </div>
            </div>

            {/* From */}
            <div className="currency-form-group">
              <label className="currency-label-small">Von</label>
              <div className="currency-box-display">
                <span className="currency-text-display">{fromCurrency}</span>
              </div>
            </div>

            {/* Swap Button */}
            <div className="currency-swap-container">
              <button
                className={`currency-swap-button ${colorClass}`}
                onClick={onCurrencySwitch}
              >
                <svg className="currency-swap-icon" viewBox="0 0 24 24">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </button>
            </div>

            {/* To */}
            <div className="currency-form-group">
              <label className="currency-label-small">Zu</label>
              <div className="currency-box-display">
                <span className="currency-text-display">{toCurrency}</span>
              </div>
            </div>

            {/* Result */}
            <div className={`currency-result-box ${colorClass}`}>
              <div className="currency-result-label">Ergebnisse</div>
              <div className="currency-result-value">{calculateResult()}</div>
              <div className="currency-result-currency">{resultCurrency}</div>
            </div>

            {/* Footer Info */}
            <div className="currency-footer-info">{lastUpdated}</div>
            <div className="currency-footer-links">
              <span>{currencyPair}</span>
              <span>•</span>
              <span>Currency.Wiki</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

