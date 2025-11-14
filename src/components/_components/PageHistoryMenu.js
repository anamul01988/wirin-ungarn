"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getAllHistory, clearHistory } from '@/lib/utils/historyManager';

const PageHistoryMenu = () => {
  const route = useRouter();
  const [pageHistory, setPageHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      const history = getAllHistory();
      setPageHistory(history);
    };
    
    loadHistory();
    
    // Add event listener to update history when storage changes
    window.addEventListener('storage', loadHistory);
    
    // Custom event for when history is updated within the same window
    window.addEventListener('historyUpdated', loadHistory);
    
    return () => {
      window.removeEventListener('storage', loadHistory);
      window.removeEventListener('historyUpdated', loadHistory);
    };
  }, []);


  const handleClearHistory = (e) => {
    e.stopPropagation();
    clearHistory();
  };

  return (
    <div className="hover-menu calendar-hover-menu history-hover-menu">
      {pageHistory.length > 0 ? (
        pageHistory.map((page, i) => (
          <div
            key={i}
            className="menu-item history-item cursor-pointer"
            onClick={() => route.push(page.route)}
            title={page.route}
          >
            <span className="history-title">
              {(page.title || 'Unbenannte Seite').length > 15
                ? `${(page.title || 'Unbenannte Seite').substring(0, 15)}...`
                : page.title || 'Unbenannte Seite'
              }
            </span>
            <span className="history-date whitespace-nowrap">
              {new Date(page.timestamp).toLocaleString('de-DE', { 
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        ))
      ) : (
        <div className="menu-item history-item">
          <span className="history-title">Keine Verlaufsdaten vorhanden</span>
        </div>
      )}
      {pageHistory.length > 0 && (
        <div 
          className="menu-footer cursor-pointer" 
          onClick={handleClearHistory}
        >
          Verlauf löschen
        </div>
      )}
    </div>
  );
};

export default PageHistoryMenu;