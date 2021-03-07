import { add } from "../lib/cjs";

describe("Addction", () => {
    it("should work", async () => {
        let addction = add(1, 2);
        expect(addction).toEqual(3);
    });
});
