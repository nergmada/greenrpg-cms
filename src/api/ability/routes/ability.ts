/**
 * ability router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::ability.ability", {
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
