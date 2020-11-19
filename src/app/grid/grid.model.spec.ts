import {COLUMNS, Grid, ROWS} from "./grid.model";

describe('Grid', () => {
  let objectUnderTest = new Grid();

  test("populate", () => {
    objectUnderTest.populate();

    let rows = objectUnderTest.rows()
    let columns = objectUnderTest.columns(2)
    let cell = objectUnderTest.cell(2, 2)

    expect(rows.length).toBe(ROWS)
    expect(columns.length).toBe(COLUMNS)
    expect(cell.color).toBe('white')
  })
})
