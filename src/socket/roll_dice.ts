export default (game_id, sockets) => async (id) => {
  const result = Math.floor(Math.random() * 20) + 1;
  console.log(`Update game ${game_id} to give dice to ${id}`);
  const game = await strapi.service("api::game.game").takeDice(game_id, id);
  console.log("updating players about game");
  sockets.to(game_id).emit("dice_result", result);
  sockets.to(game_id).emit("update", game);
};
