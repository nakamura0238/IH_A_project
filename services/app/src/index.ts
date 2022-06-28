const app = require("@/server");
import config from "@/config";

// サーバーリッスン
const port = config.server.port;
app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}`);
});
