import { Player } from './player';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player(
      {
        "name": "luis",
        "id": 1,
        "player_location": {
            "pos_x": 0,
            "pos_y": 0
        },
        "player_object": {
            "type":"square",
            "height":"200px",
            "width":"200px",
            "radius":"0",
            "base":"0"
        }
    }
    )).toBeTruthy();
  });
});

