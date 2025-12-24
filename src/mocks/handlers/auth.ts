import { http, HttpResponse } from "msw";

type SignInRequest = {
  email: string;
  password: string;
};

type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ForgotPasswordRequest = {
  email: string;
};

export const authHandlers = [
  // SIGN IN
  http.post("/api/auth/signin", async ({ request }) => {
    const { email, password } = (await request.json()) as SignInRequest;

    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json(
        {
          success: true,
          token: "fake-jwt-token",
          user: {
            id: "1",
            firstName: "Jane",
            lastName: "Doe",
            email,
          },
        },
        {
          headers: {
            "Set-Cookie":
              "session=fake-session; HttpOnly; Path=/; Max-Age=3600",
          },
        }
      );
    }

    return HttpResponse.json(
      { success: false, message: "Invalid credentials." },
      { status: 401 }
    );
  }),

  // SIGN UP
  http.post("/api/auth/signup", async ({ request }) => {
    const { firstName, lastName, email, password } =
      (await request.json()) as SignUpRequest;

    return HttpResponse.json({
      success: true,
      user: {
        id: "2",
        firstName,
        lastName,
        email,
        password,
      },
    });
  }),

  // FORGOT PASSWORD
  http.post("/api/auth/forgot-password", async ({ request }) => {
    const { email } = (await request.json()) as ForgotPasswordRequest;

    return HttpResponse.json({
      success: true,
      message: "Reset code sent to your email.",
      resetCode: "123456",
    });
  }),

  // GET SESSION
  http.get("/api/auth/session", () => {
    const mockUser = {
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@example.com",
    };

    return HttpResponse.json({ user: mockUser });
  }),

  // SIGNOUT
  http.post("/api/auth/signout", () => {
    return HttpResponse.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": "session=; HttpOnly; Path=/; Max-Age=0",
        },
      }
    );
  }),
];
