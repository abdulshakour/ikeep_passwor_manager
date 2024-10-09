"use server";
import { InvalidLoginError, signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch (error) {
    if (error instanceof InvalidLoginError) {
      return { error: error.code };
    } else {
      throw new Error("Failer to authenticate");
    }
  }
}
