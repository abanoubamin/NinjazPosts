import {createRealmContext} from '@realm/react';

import {OwnerSchema, PostSchema} from '../schemas/post.schema';
import {SCHEMA_VERSION} from '../constants/common';

export const config: Realm.Configuration = {
  schemaVersion: SCHEMA_VERSION,
  schema: [OwnerSchema, PostSchema],
};

export default createRealmContext(config);
