/**
 * combatant router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::combatant.combatant", {
  only: ["find", "findOne"],
  config: {
    findOne: {
      auth: false,
    },
    find: {
      auth: false,
    },
  },
});
