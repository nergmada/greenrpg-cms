import path from "path";
import { parse } from "pg-connection-string";

const POSTGRES_CONFIG = (config, env) => ({
  connection: {
    client: "postgres",
    connection: {
      ...config,
      ssl: {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      },
    },
  },
});

export default ({ env }) => {
  if (env("DB_CONNECTION", "default") === "postgres") {
    const config = parse(env("DB_URL", ""));
    return POSTGRES_CONFIG(config, env);
  }
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };
};
