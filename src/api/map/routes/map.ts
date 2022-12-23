/**
 * map router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::map.map", {
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
