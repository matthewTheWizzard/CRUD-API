import request from "supertest";
import { App } from "../../app";
import { v4 as uuidv4 } from 'uuid';
import { configDotenv } from "dotenv";
configDotenv();

let app: App;

beforeAll(() => {
  app = new App();
  app.start(3000);
});

afterAll((done) => {
  app.server.close(done);
});

describe("/api/users (POST)", () => {
  it("success", async () => {
    const user = { username: "testuser", age: 25, hobbies: ["test"] };
    const response = await request(app.server).post("/api/users").send(user);
    expect(response.status).toBe(201);

    const responseBody = JSON.parse(JSON.stringify(response.body));
    expect(responseBody.username).toBe(user.username);
    expect(responseBody.age).toBe(user.age);

    await request(app.server).delete(`/api/users/${responseBody.id}`);
  });


  it("no username", async () => {
    const user = { age: 25, hobbies: ["test"] };
    const response = await request(app.server).post("/api/users").send(user);
    expect(response.status).toBe(400);
  });

  it("no age", async () => {
    const user = { username: "testuser", hobbies: ["test"] };
    const response = await request(app.server).post("/api/users").send(user);
    expect(response.status).toBe(400);
  });

  it("no hobbies", async () => {
    const user = { username: "testuser", age: 25 };
    const response = await request(app.server).post("/api/users").send(user);
    expect(response.status).toBe(400);
  });
});

describe("/api/user (GET)", () => {
  it("success", async () => {
    const response = await request(app.server).get("/api/users");

    expect(response.body).toEqual([]);
    expect(response.body).toHaveLength(0);
    expect(response.statusCode).toBe(200);
  });
});

describe("/api/user/{userId} (GET)", () => {
  it("success", async () => {
    const userData = { username: "testuser", age: 25, hobbies: ["test"] };
    const user = await request(app.server).post("/api/users").send(userData);
    const response = await request(app.server).get(`/api/users/${user.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.body.id);

    await request(app.server).delete(`/api/users/${response.body.id}`);
  });

  it("wrong UUID", async () => {
    const response = await request(app.server).get(`/api/users/123`);
    expect(response.status).toBe(400);
  });

  it("user not found", async () => {
    const response = await request(app.server).get(`/api/users/${uuidv4()}`);
    expect(response.status).toBe(404);
  });
});

describe("/api/user/{userId} (PUT)", () => {
  it("success", async () => {
    const userData = { username: "testuser", age: 25, hobbies: ["test"] };
    const user = await request(app.server).post("/api/users").send(userData);

    const updatedUserData = { username: "updated", age: 30, hobbies: ["updated"] };

    const response = await request(app.server).put(`/api/users/${user.body.id}`).send(updatedUserData);
    expect(response.status).toBe(200);
  
    expect(response.body.username).toBe(updatedUserData.username);

    await request(app.server).delete(`/api/users/${user.body.id}`);
  });
});

describe("/api/user/{userId} (DELETE)", () => {
  it("success", async () => {
    const userData = { username: "testuser", age: 25, hobbies: ["test"] };
    const user = await request(app.server).post("/api/users").send(userData);

    const response = await request(app.server).delete(`/api/users/${user.body.id}`);

    expect(response.status).toBe(200);
  });
});