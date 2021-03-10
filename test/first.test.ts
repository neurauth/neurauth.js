import { getKey, setKey } from "../lib/cjs";

describe("Auth test", () => {
    it("should save the key", async () => {
        const myKey = "agoodkey";

        setKey(myKey);
        expect(myKey).toEqual(getKey());
    });
});
