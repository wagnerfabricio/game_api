import { Attack } from "../entities";

class BattleUtils {
  damageCalculator = ({ char, enemy }, attack: Attack) => {
    //((for*pow) * (1-((res_mons / 100) + (agi_mons / 1000))))
    //verify attack type
    console.log(
      attack.power,
      char.status.strength,
      enemy.status.agility,
      enemy.status.defense
    );
    const damage =
      attack.power *
      char.status.strength *
      (1 - (enemy.status.defense / 100 + enemy.status.agility / 1000));
    console.log(damage);
    return damage;
  };
  enemyRandomAttack = ({ enemy }) => {
    const randomAttack =
      enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
    return randomAttack;
  };
}

export default new BattleUtils();
