import { createWriteStream } from 'fs'
import * as shortid from 'shortid'
//
import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

const storeUpload = async ({ stream, mimetype }: any): Promise<any> => {
  const id = shortid.generate();
  const ext = mimetype.split('/')[1];
  const path = `images/${id}.${ext}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload({ stream, mimetype });
  return id
}

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data} }, { session }) => {
      console.log(session);
      const pictureUrl = picture ? await processUpload(picture) : '';
      await Listing.create({
        ...data,
        pictureUrl,
        userId: session.userId
      }).save();

      return true;
    }
  }
}
