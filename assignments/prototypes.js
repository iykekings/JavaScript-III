/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(attrs) {
  this.name = attrs.name;
  this.createdAt = attrs.createdAt;
  this.dimensions = attrs.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};
/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function Characterstats(charaAttrs) {
  GameObject.call(this, charaAttrs);
  this.healthPoints = charaAttrs.healthPoints;
}
Characterstats.prototype = Object.create(GameObject.prototype);

Characterstats.prototype.takeDamage = function() {
  return `${this.name} took damage`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(humAttrs) {
  Characterstats.call(this, humAttrs);
  this.team = humAttrs.team;
  this.weapons = humAttrs.weapons;
  this.language = humAttrs.language;
}
Humanoid.prototype = Object.create(Characterstats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};
/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: ['Staff of Shamalama'],
  language: 'Common Tongue'
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: ['Giant Sword', 'Shield'],
  language: 'Common Tongue'
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: ['Bow', 'Dagger'],
  language: 'Elvish'
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!
function Hero(hAttrs) {
  Humanoid.call(this, hAttrs);
  this.strength = hAttrs.strength;
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.reduceHealthBy = function(severity) {
  return this.healthPoints - severity > 0
    ? (this.healthPoints -= severity)
    : (() => {
        this.healthPoints = 0;
        return this.destroy();
      })();
};

function Villain(vAttrs) {
  Humanoid.call(this, vAttrs);
  this.strength = vAttrs.strength;
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.reduceHealthBy = function(severity) {
  return this.healthPoints - severity * 2 > 0
    ? (this.healthPoints -= severity * 2)
    : (() => {
        this.healthPoints = 0;
        return this.destroy();
      })();
};

const thor = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 1000,
  strength: 2,
  name: 'Thor',
  team: 'Forest Kingdom',
  weapons: ['Bow', 'Dagger'],
  language: 'Elvish'
});

const thanos = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 1000,
  strength: 4,
  name: 'Thanos',
  team: 'Forest Kingdom',
  weapons: ['Bow', 'Dagger'],
  language: 'Elvish'
});

// Gaming helper functions
function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Starts a fight between two Humanoids
function combat(fighter1, fighter2) {
  console.log(`Fight Started between ${fighter1.name} and ${fighter2.name}`);
  let winner = '';
  while (fighter1.healthPoints && fighter2.healthPoints) {
    const index = randomIndex(1, 2);
    if (index == 1) {
      console.log(fighter2.takeDamage());
      console.log(
        `${fighter2.name} healthPoints remaining ${fighter2.reduceHealthBy(
          fighter1.strength
        )}`
      );
    } else {
      console.log(fighter1.takeDamage());
      console.log(
        `${fighter1.name} healthPoints remaining ${fighter1.reduceHealthBy(
          fighter2.strength
        )}`
      );
    }
  }
  winner = fighter1.healthPoints > 0 ? fighter1.name : fighter2.name;
  console.log(`Fight Ended, ${winner} is the new champion!`);
}

// combat(thor, thanos);
