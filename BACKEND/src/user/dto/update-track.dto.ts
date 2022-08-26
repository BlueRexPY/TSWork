import { ObjectId } from 'mongoose';
export class UpdateTrackDto {
    userName: string;
    trackId: ObjectId;
}