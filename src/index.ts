import { Server } from "socket.io";
import add_combatant from "./socket/add_combatant";
import change_location from "./socket/change_location";
import change_map from "./socket/change_map";
import give_dice from "./socket/give_dice";
import health_change from "./socket/health_change";
import pool_change from "./socket/pool_change";
import remove_combatant from "./socket/remove_combatant";
import roll_dice from "./socket/roll_dice";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.socketIO = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
      },
    });
    strapi.clients = {};
    strapi.socketIO.on("connection", (socket) => {
      socket.emit("get_game_room");
      socket.on("game_room", (game_id) => {
        console.log(`Joining socket to game ${game_id}`);
        socket.join(game_id);
        health_change;
        socket.on("health_change", health_change(game_id, strapi.socketIO));
        socket.on("add_combatant", add_combatant(game_id, strapi.socketIO));
        socket.on(
          "remove_combatant",
          remove_combatant(game_id, strapi.socketIO)
        );
        socket.on("change_location", change_location(game_id, strapi.socketIO));
        socket.on("change_map", change_map(game_id, strapi.socketIO));
        socket.on("update_pool", pool_change(game_id, strapi.socketIO));
        socket.on("give_dice", give_dice(game_id, strapi.socketIO));
        socket.on("roll_dice", roll_dice(game_id, strapi.socketIO));
      });
    });
  },
};
