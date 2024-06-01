import { ObjectId } from 'mongodb';

import { GenericErrors } from './AppError';

export function getValidObjectId(id: string | ObjectId) {
  if (!ObjectId.isValid(id)) {
    throw new GenericErrors.InvalidIdError();
  }

  if (typeof id === 'string') {
    id = new ObjectId(id);
  }

  return id;
}
