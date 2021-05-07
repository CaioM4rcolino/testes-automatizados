const generatedUUID = require("../../src/utils/generateUUID");

describe("generateUUID", () =>{
    it("se é possível gerar um ID único", () =>{
        const id = generatedUUID();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    })
})