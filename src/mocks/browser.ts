import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { financesHandlers } from "./handlers/finances";

export const worker = setupWorker(...authHandlers, ...financesHandlers);
