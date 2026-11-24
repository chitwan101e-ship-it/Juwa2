export const gameGroups = {
  "Slots": [
    "7 Burning HOT",
    "7 Crystal Clovers",
    "777 Jackpot Inferno",
    "777 Lucky",
    "45 President",
    "Bonus Hot 7's",
    "Cash Zone",
    "Cherry Valentine",
    "Diamond Riches",
    "Epic Summer",
    "Fortune Lion",
    "Fruit Mary",
    "Glitz",
    "King Kong's Rampage",
    "Loteria Don",
    "Mega Money Machine",
    "Moolah Bingo",
    "Oh my Girls",
    "Perfect Purple Jackpots",
    "Rainbow Riches",
    "Spin Golden Wheel",
    "Super Stars",
    "Wild West"
  ],
  "High Roller": [
    "Huge Cash",
    "Megaball Deluxe",
    "Megs 10x Pay",
    "Wild Royale Gold",
    "Life of Luxury",
    "Epic Vault",
    "Simple Triple",
    "Cash Cow",
    "Buffalo Keno",
    "Black & White Double",
    "Hex Gems"
  ],
  "Fish & Keno": [
    "Big Bass Bonzana",
    "Cash Cow",
    "Deep Sea Predator",
    "Deep Sea",
    "Dragon Treasure",
    "Farm Life",
    "Happy Fishing",
    "Buffalo Keno",
    "Hexa Keno",
    "Superball Keno"
  ]
};

export const allGames = [...new Set(Object.values(gameGroups).flat())].sort();
