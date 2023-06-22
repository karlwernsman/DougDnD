import pool from "./lib/utils/pool";
import setup from "./data/setup";

setup(pool)
  .catch((err) => console.error(err))
  .finally(() => process.exit());
