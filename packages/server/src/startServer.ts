import "reflect-metadata";
// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
import { GraphQLServer } from "graphql-yoga";
import * as express  from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import { applyMiddleware } from 'graphql-middleware';
import { RedisPubSub } from 'graphql-redis-subscriptions';
// -----------------------------
import { redis } from "./redis";
import { createTypeormConn } from "./utils/createTypeormConn";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { redisSessionPrefix } from "./constants";
import {createTestConn} from "./testUtils/createTestConn";
import { middlewareShield } from './shield';
import { userLoader } from './loaders/userLoader';
//

const SESSION_SECRET = "ajslkjalksjdfkl";

const RedisStore = connectRedis(session as any);


export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }
  const schema =  genSchema() as any;
  applyMiddleware(schema, middlewareShield);
  const pubsub = new RedisPubSub();
  const server = new GraphQLServer({
    schema: schema,
    context: ({ request, response }) => ({
      redis,
      url: request && request.protocol + "://" + request.get("host") || '',
      session: request && request.session || '',
      req: request,
      res: response,
      userLoader: userLoader(),
      pubsub
    })
  });
  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0 // disable delaying - full speed until the max limit is reached
    })
  );
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );
  server.express.use('/images', express.static('images'))
  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };
  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    const conn = await createTypeormConn();
    await conn.runMigrations();
  }
  const port = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    cors,
    port
  });
  // console.log('process.env.FRONTEND_HOST ', process.env.FRONTEND_HOST);
  console.log("Server running on localhost:", port);
  return app;
};


