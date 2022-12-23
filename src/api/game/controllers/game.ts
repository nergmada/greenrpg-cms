import { sha512 } from "js-sha512";
/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::game.game", () => ({
  async create(ctx) {
    const { campaign } = ctx.params;
    const campaignData = await strapi
      .service("api::campaign.campaign")
      .findOne(campaign, {
        populate: [
          "start_map.icons.icon",
          "start_map.icons.description",
          "start_map.icons.images",
        ],
      });
    if (!campaignData) return false;
    const id = sha512(`${campaignData.name}${new Date().toISOString()}`);
    const current_location =
      campaignData.start_map.icons[campaignData.start_location];

    const game = await strapi.service("api::game.game").create({
      data: {
        game_id: id,
        campaign: campaignData.id,
        current_map: campaignData.start_map.id,
        current_location: current_location.description.title,
      },
    });
    return strapi.service("api::utils.utils").flatten(game);
  },
  async findOne(ctx) {
    ctx.state.auth = null;
    ctx.query = {
      ...(ctx.query || {}),
      populate: "deep",
    };
    const { data } = await super.findOne(ctx);
    return strapi.service("api::utils.utils").flatten(data);
  },
}));
