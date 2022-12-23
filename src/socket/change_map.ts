export default (game_id, sockets) => async (id) => {
  console.log(`Update game ${game_id} to map ${id}`);
  const game = await strapi.service("api::game.game").changeMap(game_id, id);
  console.log("updating players about game");
  sockets.to(game_id).emit("update", game);
};
