import { ObjectID } from 'typeorm';
declare enum mediatype {
    image = "image",
    video = "video"
}
export declare class MediaEntity {
    _id: ObjectID;
    type: mediatype;
}
export {};
