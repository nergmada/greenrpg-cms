/**
 * campaign controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::campaign.campaign", () => ({
  async find(ctx) {
    ctx.state.auth = {
      strategy: {
        verify: () => true,
      },
    };
    ctx.query = {
      ...ctx.query,
      populate: [
        ...(ctx.query.populate || []),
        "players",
        "maps",
        "combatants",
      ],
    };
    const { data, meta } = await super.find(ctx);
    const res = strapi.service("api::utils.utils").flatten(data);
    return res;
  },
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: [
        ...(ctx.query.populate || []),
        "players",
        "maps",
        "combatants",
      ],
    };
    const { data } = await super.findOne(ctx);
    return strapi.service("api::utils.utils").flatten(data);
  },
}));
