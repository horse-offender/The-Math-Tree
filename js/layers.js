addLayer("p", {
    name: "Addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "Number", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() {
        
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "Addition ",
            description: "Gain 1 more to your Number per second.",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "+1 number per second",
        },
        12: {
            title: "Better addition ",
            description: "Number per second scales with unspent addition points.",
            cost: new Decimal(2),
            unlocked() { return player[this.layer].unlocked },
            tooltip: "Number scales with addition points",
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Different addition ", 
            description: "Addition points scale with number.",
            cost: new Decimal(5),
            unlocked() { return player[this.layer].unlocked },
            tooltip: "Numbers",
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        
    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for addition points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
