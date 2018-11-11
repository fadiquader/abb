import { ResolverMap } from "../../../types/graphql-utils";
import { Message } from "../../../entity/Message";

export const resolvers: ResolverMap = {
  Message: {
    user: (parent, __, { userLoader}) => userLoader.load(parent.userId),
  },
  Query: {
    messages: async (_, { listingId }, { session }) => {
      return Message.find({
        where: {
          listingId,
          userId: session.userId,
        }
      });
    }
  }
}
