import { Square, Circle, Triangle } from './player_objects.interface';

interface Location {
    pos_x: number,
    pos_y: number
}

export interface Player {
    id: number,
    name: string,
    player_location: Location,
    player_object: Square & Circle & Triangle
}
