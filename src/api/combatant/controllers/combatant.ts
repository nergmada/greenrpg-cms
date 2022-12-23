/**
 * combatant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::combatant.combatant",
  () => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: [...(ctx.query.populate || []), "icon", "health"],
      };
      const { data, meta } = await super.find(ctx);
      return strapi.service("api::utils.utils").flatten(data);
    },
    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: [...(ctx.query.populate || []), "icon", "health"],
      };
      const { data } = await super.findOne(ctx);
      return strapi.service("api::utils.utils").flatten(data);
    },
  })
);
