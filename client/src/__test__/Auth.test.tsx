import { render, screen } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

//TODO
test("Should perform login", async () => {
  render(<App />);

  const loginButton = await screen.findByText("Accedi alla piattaforma");

  userEvent.click(loginButton);

  expect(await screen.findByRole("dialog")).toBeDefined();

  userEvent.type(screen.getByLabelText("username"), "mario.rossi");
  userEvent.type(screen.getByLabelText("password"), "password123");

  const submitButton = await screen.findByText("Accedi");

  userEvent.click(submitButton);

  expect(await screen.findByText("mario.rossi")).toBeDefined();
});
