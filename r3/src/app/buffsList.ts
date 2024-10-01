let buffsList = [
  {
    name: 'Attributes',
    buffs: [
      {
        name: 'Defense General',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Defense General (Agility) Attribute per package.',
        prefix: '+',
        suffix: ' to Defense General (Agility) Attribute.',
      },
      {
        name: 'Toughness Boost',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Toughness Boost (Constitution) Attribute per package.',
        prefix: '+',
        suffix: ' to Toughness Boost (Constitution) Attribute.',
      },
      {
        name: 'Opportune Chance',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Opportune Chance (Luck) Attribute per package.',
        prefix: '+',
        suffix: ' to Opportune Chance (Luck) Attribute.',
      },
      {
        name: 'Ranged General',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Ranged General (Precision) Attribute per package.',
        prefix: '+',
        suffix: ' to Ranged General (Precision) Attribute.',
      },
      {
        name: 'Endurance Boost',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Endurance Boost (Stamina) Attribute per package.',
        prefix: '+',
        suffix: ' to Endurance Boost (Stamina) Attribute.',
      },
      {
        name: 'Melee General',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 10,
        description: '+10 to Melee General (Strength) Attribute per package.',
        prefix: '+',
        suffix: ' to Melee General (Strength) Attribute.',
      },
    ]
  },
  {
    name: 'Combat',
    buffs: [
      {
        name: 'Action Cost Reduction',
        cost: 5,
        maxAssignments: 1,
        assignments: 0,
        effect: 5,
        prefix: '',
        suffix: '% reduction to all action costs.',
        description: '5% reduction to all action costs per package.',
      },
      {
        name: 'Critical Hit',
        cost: 5,
        maxAssignments: 1,
        assignments: 0,
        effect: 3,
        description: '3% increase to the chance to strike a critical hit per package.',
        prefix: '',
        suffix: '% increase to the chance to strike a critical hit.',
      },
      {
        name: 'Critical Hit Defense',
        cost: 5,
        maxAssignments: 1,
        assignments: 0,
        effect: 3,
        description: '3% decrease to the chance to be struck by a critical hit per package.',
        prefix: '',
        suffix: '% decrease to the chance to be struck by a critical hit.',
      },
      {
        name: 'Healing Efficiency',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 3,
        description: '3% increase to the strength of your heals per package.',
        prefix: '',
        suffix: '% increase to the strength of your heals.',
      },
      {
        name: 'Knockdown Defense',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '+5 to defense against Knockdown per package.',
        prefix: '+',
        suffix: ' to defense against Knockdown.',
      },
      {
        name: 'Melee Accuracy',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '+5 increase to Melee Accuracy per package.',
        prefix: '+',
        suffix: ' increase to Melee Accuracy.',
      },
      {
        name: 'Melee Speed',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '+5 increase to Melee Speed per package.',
        prefix: '+',
        suffix: ' increase to Melee Speed.',
      },
      {
        name: 'Ranged Accuracy',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '+5 increase to Ranged Accuracy per package.',
        prefix: '+',
        suffix: ' increase to Ranged Accuracy.',
      },
      {
        name: 'Ranged Speed',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '+5 increase to Ranged Speed per package.',
        prefix: '+',
        suffix: ' increase to Ranged Speed.',
      },
      {
        name: 'Movement Speed',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 1,
        description: '1% increase to movement speed per package.',
        prefix: '',
        suffix: '% increase to your movement speed.',
      },
      {
        name: 'Second Chance',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 4,
        description: '4% increase to the chance to automatically heal damage when hit in combat per package.',
        prefix: '',
        suffix: '% increase to the chance to automatically heal damage when hit in combat.',
      },
      {
        name: 'Resilience',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 4,
        description: '4% reduction to the damage received by damage over time effects per package.',
        prefix: '',
        suffix: '% reduction to the damage received by damage over time effects.',
      }
    ]
  },
  {
    name: 'Utility',
    buffs: [
      {
        name: 'Droid Find Speed',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '5% increase to Bounty Hunter Droid Find Speed per package.',
        prefix: '',
        suffix: '% increase to Bounty Hunter Droid Find Speed.',
      },
      {
        name: 'Flush With Success',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 3,
        description: '3% increase to the experience points gained from all sources per package.',
        prefix: '',
        suffix: '% increase to the experience points gained from all sources.',
      },
    ]
  },
  {
    name: 'Player vs. Player (PvP)',
    buffs: [
      {
        name: 'PvP Damage Reduction',
        cost: 3,
        maxAssignments: 2,
        assignments: 0,
        effect: 5,
        description: '5% decrease to damage dealt by other players during PvP per package.',
        prefix: '',
        suffix: '% decrease to damage dealt by other players during PvP.',
      },
      {
        name: 'PvP Decay Reduction',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 10,
        description: '10% reduction to weapon and armor decay from PvP per package.',
        prefix: '',
        suffix: '% reduction to weapon and armor decay from PvP.',
      },
      {
        name: 'PvP DoT Defense',
        cost: 1,
        maxAssignments: 10,
        assignments: 0,
        effect: 5,
        description: '5% resistance to damage over time effects from other players during PvP per package.',
        prefix: '',
        suffix: '% resistance to damage over time effects from other players during PvP.',
      },
    ]
  },
  {
    name: 'Resistances',
    buffs: [
      {
        name: 'Elemental Resistance',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 225,
        description: '+225 to resistance protection against all types of elemental damage per package.',
        prefix: '+',
        suffix: ' to resistance protection against all types of elemental damage.',
      },
      {
        name: 'Energy Resistance',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 200,
        description: '+200 to resistance protection against energy damage per package.',
        prefix: '+',
        suffix: ' to resistance protection against energy damage.',
      },
      {
        name: 'Kinetic Resistance',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 200,
        description: '+200 to resistance protection against kinetic damage per package.',
        prefix: '+',
        suffix: ' to resistance protection against kinetic damage.',
      },
    ]
  },
  {
    name: 'Crafting',
    buffs: [
      {
        name: 'Crafting Assembly',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 1,
        description: '+1 increase to General Assembly while crafting or making repairs per package.',
        prefix: '+',
        suffix: ' increase to General Assembly while crafting or making repairs.',
      },
      {
        name: 'Amazing Success Chance',
        cost: 5,
        maxAssignments: 2,
        assignments: 0,
        effect: 1,
        description: '1% increase to the chance to have an Amazing Success while crafting per package.',
        prefix: '',
        suffix: '% increase to the chance to have an Amazing Success while crafting.',
      },
      {
        name: 'Factory Speed',
        cost: 1,
        maxAssignments: 5,
        assignments: 0,
        effect: 5,
        description: '5% increase to Factory Speed per package.',
        prefix: '',
        suffix: '% increase to Factory Speed.',
      },
      {
        name: 'Hand Sampling',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 2,
        description: '2% increase to the quantity of resources gathered through hand sampling per package.',
        prefix: '',
        suffix: '% increase to the quantity of resources gathered through hand sampling.',
      },
      {
        name: 'Harvest Faire',
        cost: 2,
        maxAssignments: 5,
        assignments: 0,
        effect: 1,
        description: '1% increase to the quantity of resources gathered by harvesters per package.',
        prefix: '',
        suffix: '% increase to the quantity of resources gathered by harvesters.',
      },
      {
        name: 'Resource Quality',
        cost: 5,
        maxAssignments: 2,
        assignments: 0,
        effect: 2,
        description: '2% increase to Resource Quality when crafting per package.',
        prefix: '',
        suffix: '% increase to Resource Quality when crafting.',
      },
    ]
  },
];

export default buffsList;