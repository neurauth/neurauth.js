import { setupCredentials, getCredentials, list } from "../lib/cjs";

describe("Auth test", () => {
    it("should save the key", async () => {
        const credential = {
            apiKey: "123",
            appId: "321"
        }

        setupCredentials(credential);
        expect(credential).toEqual(getCredentials());
    });
});
