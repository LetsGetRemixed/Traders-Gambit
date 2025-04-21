import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import EventEngine from './EventEngine';
import EventPopup from './EventPopup';

const generateInitialHistory = (price) =>
  Array.from({ length: 20 }, () => price + (Math.random() - 0.5) * 2);

const initialStocks = [
  { symbol: 'DOGG', name: 'DoggoTech', price: 120.5, volatility: 3 },
  { symbol: 'SPCE', name: 'SpaceNoodles Inc.', price: 80.25, volatility: 2 },
  { symbol: 'GOLD', name: 'Goblin Gold Mining', price: 60.75, volatility: 5 }
];

const Game = () => {
  const [stocks, setStocks] = useState(
    initialStocks.map(stock => ({
      ...stock,
      history: generateInitialHistory(stock.price)
    }))
  );
  const [cash, setCash] = useState(1000);
  const [portfolio, setPortfolio] = useState({});
  const [timer, setTimer] = useState(300); // 5 minutes
  const [eventMessage, setEventMessage] = useState('');

  // Simulate price changes over time
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          const change = (Math.random() - 0.5) * stock.volatility;
          const newPrice = Math.max(1, stock.price + change);
          const newHistory = [...stock.history.slice(1), newPrice];
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            history: newHistory
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Game timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const buyStock = (symbol, price) => {
    if (cash < price) return alert('Not enough cash!');
    setCash(prev => prev - price);
    setPortfolio(prev => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + 1
    }));
  };

  const sellStock = (symbol, price) => {
    if (!portfolio[symbol]) return alert("You don't own any!");
    setCash(prev => prev + price);
    setPortfolio(prev => ({
      ...prev,
      [symbol]: prev[symbol] - 1
    }));
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Trader's Gambit</h1>
        <div className="text-lg">
          Time Left: <span className="text-yellow-400">{formatTime(timer)}</span>
        </div>
        <div className="text-lg">
          Cash: <span className="text-green-400">${cash.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map(stock => (
          <div key={stock.symbol} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{stock.name} ({stock.symbol})</h2>
            <p className="text-lg mt-2">
              Price: <span className="text-blue-400">${stock.price}</span>
            </p>
            <p>Owned: {portfolio[stock.symbol] || 0}</p>

            <Charts history={stock.history} />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => buyStock(stock.symbol, stock.price)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Buy
              </button>
              <button
                onClick={() => sellStock(stock.symbol, stock.price)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event logic */}
      <EventEngine
        onEventTriggered={setEventMessage}
        stocks={stocks}
        setStocks={setStocks}
      />
      <EventPopup message={eventMessage} />
    </div>
  );
};

export default Game;



