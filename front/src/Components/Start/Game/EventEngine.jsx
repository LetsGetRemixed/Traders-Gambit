// EventEngine.js
import { useEffect } from 'react';
import events from './MarketEvents';

const EventEngine = ({ onEventTriggered, stocks, setStocks }) => {
    useEffect(() => {
        const interval = setInterval(() => {
          const chance = Math.random();
          if (chance < 0.3) {
            const event = events[Math.floor(Math.random() * events.length)];
      
            setStocks(prevStocks => {
              const affected =
                event.target === 'RANDOM'
                  ? [prevStocks[Math.floor(Math.random() * prevStocks.length)]]
                  : event.target === 'ALL'
                  ? prevStocks
                  : prevStocks.filter(s => s.symbol === event.target);
      
              const updated = prevStocks.map(stock => {
                if (affected.some(a => a.symbol === stock.symbol)) {
                  const newPrice = Math.max(1, event.impact(stock.price));
                  return { ...stock, price: parseFloat(newPrice.toFixed(2)) };
                }
                return stock;
              });
      
              return updated;
            });
      
            onEventTriggered(event.text);
          }
        }, 10000);
      
        return () => clearInterval(interval);
      }, [setStocks, onEventTriggered]);
      

  return null;
};

export default EventEngine;

