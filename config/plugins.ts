const uploadConfig = (env) => ({
  config: {
    provider: "strapi-provider-upload-dos",
    providerOptions: {
      key: env("DO_SPACE_ACCESS_KEY"),
      secret: env("DO_SPACE_SECRET_KEY"),
      endpoint: env("DO_SPACE_ENDPOINT"),
      space: env("DO_SPACE_BUCKET"),
      directory: env("DO_SPACE_DIRECTORY"),
      cdn: env("DO_SPACE_CDN"),
    },
  },
});

module.exports = ({ env }) => ({
  "users-permissions": false,
  upload: uploadConfig(env),
  "strapi-plugin-populate-deep": {
    deaultDepth: 5,
  },
});
