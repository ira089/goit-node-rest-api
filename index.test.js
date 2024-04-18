import {sum} from "./index"

describe('fun sum', () => {
test ("return sum", () => {
    const result = sum (10, 9);
   expect(result).toEqual(19)
})
})