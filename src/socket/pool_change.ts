export default (game_id, sockets) =>
  async ({ id, pool, value }) => {
    console.log(`update health of combatant ${id} to ${value}`);
    await strapi.service("api::player.player").updatePool(id, pool, value);
    const game = await strapi.service("api::game.game").getGame(game_id);
    console.log("updating players about game");
    sockets.to(game_id).emit("update", game);
  };
