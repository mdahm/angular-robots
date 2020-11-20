import {Cell, COLUMNS, Figure, Grid, ROWS} from './grid.model';

describe('Grid', () => {
  const objectUnderTest = new Grid();

  test('populate', () => {
    let cell = objectUnderTest.cell(2, 2);

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
  });
});
