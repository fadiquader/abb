import * as DataLoader from 'dataloader';
import {User} from "../entity/User";

type BatchUsers = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUsers = async (ids) => {
  const users = await User.findByIds(ids);
  const userMap: { [key: string]: User } = {};
  users.forEach(u => userMap[u.id] = u);
  return ids.map(id => userMap[id]);
};

export const userLoader = () => {
  return new DataLoader<string, User>(batchUsers);
};
