import {COLUMNS, Grid, ROBOTS, ROWS} from './grid.model';
import {Cell, Figure} from './cell.model';

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

  test('immutable', () => {
    objectUnderTest.populate();

    const cells = objectUnderTest.columns(2);
    cells[2] = new Cell('red', Figure.ROBOT_TRASH);

    const cell = objectUnderTest.cell(2, 2);
    expect(cell.color).toBe('white');

    let robots = objectUnderTest.allCells().map(cell => cell.content).filter(value => value == Figure.ROBOT_ALIVE).length;
    expect(robots).toBe(ROBOTS);
  });
});
