import {Cell, COLUMNS, Figure, Grid, ROWS} from './grid.model';

describe('Grid', () => {
  const objectUnderTest = new Grid();

  test('populate', () => {
    const rows = objectUnderTest.rows();
    const columns = objectUnderTest.columns(2);
    let cell = objectUnderTest.cell(2, 2);

    expect(rows.length).toBe(ROWS);
    expect(columns.length).toBe(COLUMNS);
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
