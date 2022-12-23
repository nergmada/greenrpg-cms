/**
 * map controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::map.map", () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: [...(ctx.query.populate || []), "main"],
    };
    const { data, meta } = await super.find(ctx);
    return strapi.service("api::utils.utils").flatten(data);
  },
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: [
        ...(ctx.query.populate || []),
        "main",
        "icons.icon",
        "icons.images",
        "icons.description",
        "images",
      ],
    };
    const { data } = await super.findOne(ctx);
    console.log(data);
    return strapi.service("api::utils.utils").flatten(data);
  },
}));
