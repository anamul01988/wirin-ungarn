"use client";
import React, { useState, useEffect } from "react";

const MobileCurrencyConverter = () => {
  const [isEurToHuf, setIsEurToHuf] = useState(true);
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
      // Fallback rate
      setRate(isEurToHuf ? 395.5 : 0.00253);
      setLastUpdated(new Date().toISOString().split("T")[0]);
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
    const result = amountNum * rate;
    return result.toFixed(2);
  };

  const handleSwitch = () => {
    setIsEurToHuf(!isEurToHuf);
    setAmount("1");
  };

  const fromCurrency = isEurToHuf ? "EUR" : "HUF";
  const toCurrency = isEurToHuf ? "HUF" : "EUR";
  const fromCurrencyFull = isEurToHuf ? "Euro" : "Ungarischer Forint";
  const toCurrencyFull = isEurToHuf ? "Ungarischer Forint" : "Euro";

  return (
    <div className="mobile-currency-converter">
      {/* Header with Switch */}
      <div className="mobile-currency-header">
        <button
          onClick={handleSwitch}
          className="currency-switch-btn"
          disabled={loading}
        >
          <svg
            className="currency-switch-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <span>Wechseln</span>
        </button>
      </div>

      {loading ? (
        <div className="mobile-currency-loading">
          <div className="loading-spinner"></div>
          <p>Lädt Wechselkurs...</p>
        </div>
      ) : (
        <div className="mobile-currency-content">
          {/* Amount Input - Menge */}
          <div className="mobile-converter-group">
            <label className="mobile-converter-label">Menge</label>
            <div className="mobile-input-wrapper">
              <span className="mobile-currency-badge">{fromCurrency}</span>
              <input
                type="text"
                className="mobile-currency-input"
                value={amount}
                placeholder="1"
                onChange={handleAmountChange}
              />
            </div>
          </div>

          {/* Von - From Currency */}
          <div className="mobile-converter-group">
            <label className="mobile-converter-label-small">Von</label>
            <div className="mobile-display-box">
              <span className="mobile-currency-full-name">{fromCurrencyFull}</span>
            </div>
          </div>

          {/* Exchange Icon */}
          <div className="mobile-exchange-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4M7 4L3 8M7 4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>

          {/* Zu - To Currency */}
          <div className="mobile-converter-group">
            <label className="mobile-converter-label-small">Zu</label>
            <div className="mobile-display-box">
              <span className="mobile-currency-full-name">{toCurrencyFull}</span>
            </div>
          </div>

          {/* Result Display - Ergebnisse */}
          <div className="mobile-result-box">
            <div className="mobile-result-label">Ergebnisse</div>
            <div className="mobile-result-value">{calculateResult()}</div>
            <div className="mobile-result-currency">{toCurrency}</div>
          </div>

          {/* Exchange Rate Info */}
          <div className="mobile-exchange-info">
            <div className="last-updated">
              {new Date(lastUpdated).toLocaleDateString("de-DE")}
            </div>
            <div className="exchange-rate-links">
              <span>1 {fromCurrency} = {rate?.toFixed(4)} {toCurrency}</span>
              <span>•</span>
              <span>Currency.Wiki</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mobile-currency-converter {
          width: 100%;
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-currency-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .currency-switch-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #4a7c59;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .currency-switch-btn:hover {
          background: #3d6a4a;
        }

        .currency-switch-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .currency-switch-icon {
          width: 18px;
          height: 18px;
        }

        .mobile-currency-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #666;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4a7c59;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .mobile-currency-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-converter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-converter-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .mobile-converter-label-small {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          margin-bottom: 8px;
        }

        .mobile-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 14px;
          transition: border-color 0.2s;
        }

        .mobile-input-wrapper:focus-within {
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .mobile-currency-badge {
          padding: 8px 14px;
          background: #4a7c59;
          color: white;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          min-width: 55px;
          text-align: center;
        }

        .mobile-currency-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 24px;
          font-weight: 700;
          color: #333;
          background: transparent;
          padding-left: 12px;
        }

        .mobile-currency-input::placeholder {
          color: #aaa;
        }

        .mobile-display-box {
          background: #f5f5f5;
          border: 2px solid #e8e8e8;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .mobile-currency-full-name {
          font-size: 15px;
          color: #555;
          font-weight: 500;
        }

        .mobile-result-box {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.25);
          margin-top: 8px;
        }

        .mobile-result-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .mobile-result-value {
          font-size: 34px;
          font-weight: 700;
          color: white;
          margin: 6px 0;
          line-height: 1.2;
        }

        .mobile-result-currency {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }

        .mobile-exchange-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          margin: 4px 0;
        }

        .mobile-exchange-icon svg {
          width: 36px;
          height: 36px;
          color: #4a7c59;
          opacity: 0.7;
        }

        .mobile-exchange-info {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .last-updated {
          font-size: 11px;
          color: #999;
          font-weight: 500;
        }

        .exchange-rate-links {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666;
        }

        .exchange-rate-links span:last-child {
          color: #4a7c59;
          font-weight: 600;
        }

        @media (max-width: 400px) {
          .mobile-currency-converter {
            padding: 16px;
          }

          .mobile-currency-input,
          .mobile-currency-result {
            font-size: 20px;
          }

          .rate-value {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileCurrencyConverter;
