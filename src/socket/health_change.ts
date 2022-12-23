export default (game_id, sockets) =>
  async ({ id, value }) => {
    console.log(`update health of combatant ${id} to ${value}`);
    await strapi.service("api::combatant.combatant").changeHealth(id, value);
    const game = await strapi.service("api::game.game").getGame(game_id);
    console.log("updating players about game");
    sockets.to(game_id).emit("update", game);
  };
