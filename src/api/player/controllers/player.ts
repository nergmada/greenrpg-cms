/**
 * player controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::player.player", () => ({
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
        "icon",
        "abilities",
        "meta.edge",
        "pools.might",
        "pools.intellect",
        "pools.speed",
        "pools.luck",
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
        "icon",
        "meta.edge",
        "pools.might",
        "pools.intellect",
        "pools.speed",
        "pools.luck",
        "abilities",
      ],
    };
    const { data } = await super.findOne(ctx);
    return strapi.service("api::utils.utils").flatten(data);
  },
}));
