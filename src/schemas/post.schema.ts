import Realm from 'realm';

export const OwnerSchema: Realm.ObjectSchema = {
  embedded: true,
  name: 'Owner',
  properties: {
    id: 'string',
    title: 'string',
    firstName: 'string',
    lastName: 'string',
    picture: 'string',
  },
};

export const PostSchema: Realm.ObjectSchema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: 'string',
    image: 'string',
    likes: 'int',
    tags: 'string[]',
    text: 'string',
    publishDate: 'string',
    owner: 'Owner',
  },
};
