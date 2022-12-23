export default (game_id, sockets) => async (id) => {
  console.log(`Update game ${game_id} to add combatant ${id}`);
  const game = await strapi
    .service("api::game.game")
    .addCombatantToGame(game_id, id);
  console.log("updating players about game");
  sockets.to(game_id).emit("update", game);
};
