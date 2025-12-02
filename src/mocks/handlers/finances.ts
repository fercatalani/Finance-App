import { http, HttpResponse } from "msw";

export const financesHandlers = [
  http.get("/api/finances", () => {
    return HttpResponse.json({
      records: [
        { id: "1", type: "income", amount: 2500, date: "2025-01-10" },
        { id: "2", type: "expense", amount: 150, date: "2025-01-12" },
      ],
      balance: 2350,
    });
  }),
];
