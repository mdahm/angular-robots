import {COLUMNS, Grid, ROBOTS, ROWS} from './grid.model';
import {FigureType} from './cell.model';

describe('Grid', () => {
  const objectUnderTest = new Grid();

  test('populate', () => {
    let cell = objectUnderTest.cell(2, 2);

    // Acces to array deprecated, modifiable
    expect(objectUnderTest.rows().length).toBe(ROWS);
    expect(objectUnderTest.allCells().length).toBe(ROWS * COLUMNS);
    expect(objectUnderTest.columns(2).length).toBe(COLUMNS);
    expect(cell).toBeUndefined();

    objectUnderTest.populate();
    cell = objectUnderTest.cell(2, 2);
    expect(cell.color).toBe('white');
  });

  test('positions', () => {
    objectUnderTest.populate();

    let robots = objectUnderTest.allCells().map(cell => cell.content.type).filter(value => value == FigureType.ROBOT_ALIVE).length;
    expect(robots).toBe(ROBOTS);

    let player = objectUnderTest.player;
    expect(objectUnderTest.cell(player.cell.position.row, player.cell.position.column).content).toEqual(player);
  });
});
