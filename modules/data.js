// Officialy starts from 1, not 0, so decrement by one... [1, 2, 3, ...]
const heroTypes = ['tank', 'warrior', 'assassin', 'mage', 'marksman', 'support']

// Officially starts at 0 and increments by 2. Resolve by dividing with 2... [0, 2, 4]
const energyTypes = ['mana', 'energy', 'rage']

// Officially, this is not present within any of three available "endpoints"
const talents = {
  "80109": {
    name: "Sprint",
    description: "Increases movement speed by 30% for 10 seconds.",
    cooldown: "100s"
  },
  "80108": {
    name: "Execute",
    description: "Instantly attacks a nearby enemy hero and deals damage equal to 16% of the HP the enemy hero has lost as true damage.",
    cooldown: "90s"
  },
  "80104": {
    name: "Punish",
    description: "Deals 800 true damage to nearby minions and monsters and stuns them for 1 second.",
    cooldown: "30s"
  },
  "80110": {
    name: "Roar",
    description: "Increases attack speed by 60% and attack damage by 10% for 5 seconds.",
    cooldown: "60s"
  },
  "80102": {
    name: "Heal",
    description: "You and nearby teammates instantly recover 15% HP and gain 15% movement speed for 2 seconds.",
    cooldown: "120s"
  },
  "80105": {
    name: "Disrupt",
    description: "Silences a structure for 5 seconds.",
    cooldown: "60s"
  },
  "80103": {
    name: "Daze",
    description: "Stuns nearby enemies for 0.5 seconds, then reduces their movement speed for 1 second.",
    cooldown: "90s"
  },
  "80107": {
    name: "Purify",
    description: "Removes all debuffs and control effects on yourself and gains immunity to them for 1.5 seconds.",
    cooldown: "120s"
  },
  "80112": {
    name: "Endure",
    description: "Immobilizes your hero to become invulnerable for 1.5 seconds.",
    cooldown: "120s"
  },
  "80115": {
    name: "Flicker",
    description: "Teleports your hero a short distance.",
    cooldown: "120s"
  }
}

module.exports = {
  heroTypes,
  energyTypes,
  talents
}
