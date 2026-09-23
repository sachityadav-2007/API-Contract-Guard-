const { validate } = require("../src/middleware/validate");

function mockReqResNext(body) {
  const req = { body };
  const res = {
    statusCode: null,
    jsonData: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    }
  };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  return { req, res, next, wasNextCalled: () => nextCalled };
}

test("calls next() when request is valid", () => {
  const schema = { email: { type: "email", required: true } };
  const { req, res, next, wasNextCalled } = mockReqResNext({ email: "sachit@gmail.com" });

  validate(schema)(req, res, next);

  expect(wasNextCalled()).toBe(true);
  expect(res.statusCode).toBe(null);
});

test("returns 422 when request is invalid", () => {
  const schema = { email: { type: "email", required: true } };
  const { req, res, next, wasNextCalled } = mockReqResNext({});

  validate(schema)(req, res, next);

  expect(wasNextCalled()).toBe(false);
  expect(res.statusCode).toBe(422);
  expect(res.jsonData.success).toBe(false);
});

test("reports multiple errors at once", () => {
  const schema = {
    name: { type: "string", required: true, minLength: 2 },
    age: { type: "number", required: true, min: 18 }
  };
  const { req, res, next } = mockReqResNext({ name: "A", age: 10 });

  validate(schema)(req, res, next);

  expect(Object.keys(res.jsonData.errors)).toEqual(["name", "age"]);
});