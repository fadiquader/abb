import { ResolverMap } from "../../../types/graphql-utils";
import { Message } from "../../../entity/Message";
import {PUBSUB_NEW_MESSAGE} from "../shared/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: async (_, { message }, { session, pubsub }) => {
      const newMessage = await Message.create({
        ...message,
        userId: session.userId
      }).save();
      pubsub.publish(PUBSUB_NEW_MESSAGE, {
        newMessage: newMessage,
      })
      return true;
    }
  }
}
