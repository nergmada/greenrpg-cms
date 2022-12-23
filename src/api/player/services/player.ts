/**
 * player service
 */

import { factories } from "@strapi/strapi";
import { PlayerService } from "./player-service";

export default factories.createCoreService(
  "api::player.player",
  () =>
    ({
      async updatePool(id, pool, value) {
        const player = await strapi.service("api::player.player").findOne(id, {
          populate: "deep",
        });
        const pools = player.pools;
        const newPools = {
          ...pools,
          [pool]: {
            ...pools[pool],
            current: value,
          },
        };
        await strapi.service("api::player.player").update(id, {
          data: {
            pools: newPools,
          },
        });
      },
    } as PlayerService)
);
