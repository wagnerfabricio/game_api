import { Char } from "../entities";

class CharUtils {
  verifyMaxLvl(char: Char) {
    if (char.status.level <= 99) {
      return true;
    }
    return false;
  }
}
export default new CharUtils();
