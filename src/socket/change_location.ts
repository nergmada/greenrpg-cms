export default (game_id, sockets) => async (location) => {
  console.log(`Update game ${game_id} to location ${location}`);
  const game = await strapi
    .service("api::game.game")
    .changeLocation(game_id, location);
  console.log("updating players about game");
  sockets.to(game_id).emit("update", game);
};
