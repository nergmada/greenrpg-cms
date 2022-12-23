/**
 * combatant service
 */

import { factories } from "@strapi/strapi";
import { CombatantService } from "./combatant-service";

export default factories.createCoreService<CombatantService>(
  "api::combatant.combatant",
  () =>
    ({
      async changeHealth(id, value) {
        const combatant = await strapi
          .service("api::combatant.combatant")
          .findOne(id, {
            populate: ["health"],
          });
        await strapi.service("api::combatant.combatant").update(id, {
          data: {
            health: {
              max: combatant.health.max,
              current: value,
            },
          },
        });
      },
    } as CombatantService)
);
