/**
 * tutorial router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::tutorial.tutorial", {
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
