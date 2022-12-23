/**
 * tutorial controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::tutorial.tutorial", () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: "deep",
    };
    const { data } = await super.find(ctx);
    return strapi.service("api::utils.utils").flatten(data);
  },
}));
