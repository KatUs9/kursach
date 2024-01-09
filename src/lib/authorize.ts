import { compare } from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { createJwtToken } from "@/lib/jwt";
import { users } from "db/schema";

type AuthorizeResult =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
      authToken: string;
    };

export async function authorize(
  login: string,
  password: string
): Promise<AuthorizeResult> {
  const dbUsers = await db.select().from(users).where(eq(users.login, login));

  if (dbUsers.length != 1) {
    return { success: false, message: "Невалидный логин или пароль" };
  }

  const user = dbUsers[0];

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: "Невалидный логин или пароль" };
  }

  const authToken = createJwtToken(
    {
      userId: user.id
    },
    import.meta.env.JWT_SECRET
  );

  return { success: true, authToken };
}
