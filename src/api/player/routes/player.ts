/**
 * player router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::player.player", {
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
