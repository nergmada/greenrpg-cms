/**
 * game service
 */

import { factories } from "@strapi/strapi";
import { GameService } from "./game-service";

export default factories.createCoreService<GameService>(
  "api::game.game",
  () =>
    ({
      async getGame(id) {
        const game = await strapi
          .service("api::game.game")
          .findOne(Number.parseInt(id), {
            populate: "deep",
          });
        return game;
      },
      async addCombatantToGame(game_id, id) {
        const game = await strapi.service("api::game.game").findOne(game_id, {
          populate: "deep",
        });
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            active_combatants: [...game.active_combatants.map((c) => c.id), id],
          },
          populate: "deep",
        });
        return updated;
      },
      async removeCombatantFromGame(game_id, id) {
        const game = await strapi.service("api::game.game").findOne(game_id, {
          populate: "deep",
        });
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            active_combatants: game.active_combatants
              .map((c) => c.id)
              .filter((v) => v !== id),
          },
          populate: "deep",
        });
        return updated;
      },
      async changeLocation(game_id, location) {
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            current_location: location,
          },
          populate: "deep",
        });
        return updated;
      },
      async changeMap(game_id, id) {
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            current_map: id,
          },
          populate: "deep",
        });
        return updated;
      },
      async giveDice(game_id, id) {
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            rolling: id,
          },
          populate: "deep",
        });
        return updated;
      },
      async takeDice(game_id) {
        const updated = await strapi.service("api::game.game").update(game_id, {
          data: {
            rolling: null,
          },
          populate: "deep",
        });
        return updated;
      },
    } as GameService)
);
