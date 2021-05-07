const { cpf } = require("cpf-cnpj-validator");
const request = require("supertest");
const connection = require("../../src/database")
const app = require("../../src/app");
const truncate = require("./truncate");

describe("managers", () => {

    afterAll(()=>{
        connection.close();
    })

    beforeEach(async (done) => {
        await truncate(connection.models);
        done();
    })

    it("é possível criar um novo gerente", async () => {
        const response = await request(app).post("/managers").send({
            name: "Caio Augusto",
            email: "caioaugustowill@gmail.com",
            cpf: cpf.generate(),
            cellphone: "994563433445",
            password: "password"
        })

        expect(response.ok).toBeTruthy(),
        expect(response.body).toHaveProperty("id")
    }),

    it("cpf já existe", async () => {

        let cpfManager = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Caio Augusto",
            email: "caioaugustowill@gmail.com",
            cpf: cpfManager,
            cellphone: "994563433445",
            password: "password"
        })

        response = await request(app).post("/managers").send({
            name: "José Marin",
            email: "josemarinl@gmail.com",
            cpf: cpfManager,
            cellphone: "994301045645",
            password: "password"
        })


        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists");

    })
})