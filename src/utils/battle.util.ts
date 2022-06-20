import { Attack } from "../entities";

class BattleUtils {
  accuracyCalculator = (attack: Attack) => {
    // return a boolean indicating if the attack hit or not
    const hit = Math.floor(Math.random() * 100);
    if (hit <= attack.accuracy) {
      return true;
    } else {
      return false;
    }
  };
  damageCalculator = (attacker, defender, attack: Attack) => {
    //((for*pow) * (1-((res_mons / 100) + (agi_mons / 1000))))
    let damage = 0;
    let hits = attack.hits;
    switch (attack.type) {
      case "physical":
        while (hits) {
          const damageCalc =
            attack.power *
            attacker.status.strength *
            (1 -
              (defender.status.defense / 100 +
                defender.status.strength / 1000));
          if (!this.accuracyCalculator(attack)) {
            damage += 0;
          } else {
            damage += damageCalc;
          }
          console.log(damage, attack.name);
          hits--;
        }
        return damage;
      case "magic":
        while (hits) {
          const damageCalc =
            attack.power *
            attacker.status.magic *
            (1 -
              (defender.status.defense / 100 + defender.status.magic / 1000));
          if (!this.accuracyCalculator(attack)) {
            damage += 0;
          } else {
            damage += damageCalc;
          }
          hits--;
        }
        return damage;
      case "ranged":
        while (hits) {
          const damageCalc =
            attack.power *
            attacker.status.agility *
            (1 -
              (defender.status.defense / 100 + defender.status.agility / 1000));
          if (!this.accuracyCalculator(attack)) {
            damage += 0;
          } else {
            damage += damageCalc;
          }
          hits--;
        }
        return damage;
    }
  };
  enemyRandomAttack = ({ enemy }) => {
    const randomAttack =
      enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
    return randomAttack;
  };
}

export default new BattleUtils();
