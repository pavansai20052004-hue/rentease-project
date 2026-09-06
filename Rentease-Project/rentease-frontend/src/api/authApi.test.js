import API, { loginUser, registerUser, getAuthErrorMessage } from "./authApi";

afterEach(() => jest.restoreAllMocks());

test("authentication requests have a bounded timeout", () => {
  expect(API.defaults.timeout).toBe(30000);
});

test("accepts a valid authentication response", async () => {
  const data = { token: "test-token", user: { id: "test-user" } };
  jest.spyOn(API, "post").mockResolvedValue({ data });
  expect((await loginUser({ email: "test@example.com", password: "password" })).data).toEqual(data);
});

test.each([loginUser, registerUser])("rejects HTML or incomplete responses instead of storing a broken session", async (authenticate) => {
  jest.spyOn(API, "post").mockResolvedValue({ data: "<html>Not an API</html>" });
  await expect(authenticate({})).rejects.toThrow("Invalid authentication response");
});

test("distinguishes unavailable service from invalid credentials", () => {
  expect(getAuthErrorMessage({ code: "ECONNABORTED" })).toMatch(/taking too long/);
  expect(getAuthErrorMessage({})).toMatch(/Unable to reach/);
  expect(getAuthErrorMessage({ response: { status: 401, data: { message: "Invalid email or password" } } })).toBe("Invalid email or password");
});
