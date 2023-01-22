import { ObjectID } from 'typeorm';

enum mediatype {
  image = 'image',
  video = 'video',
}

export class MediaEntity {
  _id: ObjectID;
  type: mediatype;
}
