// MarketEvents.js

const getRandomImpact = () => parseFloat((Math.random() * 10 + 5).toFixed(2));

const events = [
  {
    text: "DoggoTech's new collar tracker goes viral on TokTrek!",
    target: 'DOGG',
    impact: (price) => price + getRandomImpact(),
  },
  {
    text: "Goblin Gold Mining faces ethical backlash from fantasy rights groups.",
    target: 'GOLD',
    impact: (price) => price - getRandomImpact(),
  },
  {
    text: "SpaceNoodles launches a flavor that actually tastes like noodles.",
    target: 'SPCE',
    impact: (price) => price + getRandomImpact(),
  },
  {
    text: "Random market scare! All stocks tremble...",
    target: 'ALL',
    impact: (price) => price - getRandomImpact(),
  },
  {
    text: "Rumors of acquisition by Techzilla cause speculation.",
    target: 'RANDOM',
    impact: (price) => price + getRandomImpact(),
  },
  {
    text: "Internet meme tanks the economy. Nobody knows why.",
    target: 'ALL',
    impact: (price) => price - (Math.random() * 5),
  },
];

export default events;
