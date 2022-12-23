module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/game/:campaign",
      handler: "game.create",
      config: {
        auth: false,
      },
    },
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/game/:id",
      handler: "game.findOne",
      config: {
        auth: false,
      },
    },
  ],
};
