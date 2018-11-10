import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
// import {User} from "../../../entity/User";

export const resolvers: ResolverMap = {
  Listing: {
    pictureUrl: (parent, _, { url }) => {
      return parent.pictureUrl ? `${url}/${parent.pictureUrl}` : ''
    },
    owner: ({ userId }, _, {userLoader}) => {
      return userLoader.load(userId)
    }
  },
  Query: {
    findListings: async () => {
      return Listing.find();
    }
  }
};
