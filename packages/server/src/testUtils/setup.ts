import { AddressInfo } from "net";
//
import { startServer } from "../startServer";

export const setup = async () => {
  const app: any = await startServer();
  const add = app.address() as AddressInfo;
  process.env.TEST_HOST = `http://127.0.0.1:${add.port}`;
};
