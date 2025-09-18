import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ContactForm from "../src/components/ContactForm";describe("ContactForm", () => {
  beforeEach(() => {
    // @ts-expect-error - allow assignment for test
    global.fetch = vi.fn(() => Promise.resolve({ ok: true })) as any;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  function fillAndSubmit({ name = "", email = "", message = "" } = {}) {
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    if (name !== undefined) fireEvent.change(nameInput, { target: { value: name } });
    if (email !== undefined) fireEvent.change(emailInput, { target: { value: email } });
    if (message !== undefined) fireEvent.change(messageInput, { target: { value: message } });

    fireEvent.submit(screen.getByRole("button", { name: /send/i }).closest("form") as HTMLFormElement);
  }

  it("validates required fields and shows errors", async () => {
    render(<ContactForm />);

    // Submit empty form
    fillAndSubmit();

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("validates email format", async () => {
    render(<ContactForm />);

    fillAndSubmit({ name: "John", email: "not-an-email", message: "Hello" });

    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits successfully and calls fetch with correct body", async () => {
    render(<ContactForm />);

    const payload = { name: "Jane", email: "jane@example.com", message: "Hi there" };
    fillAndSubmit(payload);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(options.body)).toEqual(payload);

    // success message is shown
    expect(await screen.findByRole("status")).toHaveTextContent(/thanks/i);
  });
});


