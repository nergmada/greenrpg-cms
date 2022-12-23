/**
 * campaign router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::campaign.campaign", {
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
