import bcrypt from "bcrypt";
import type { NextRequest } from 'next/server'


export async function generateHashedPassword(
  plainTextPassword: string
): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
}

export async function GET(request: NextRequest) {
  console.log("Generating hashed password...");
  const { searchParams } = new URL(request.url);


  const text = searchParams.get("text");
  if (text) {
    const hashedPassword = await generateHashedPassword(text);
    return new Response(
      `Input Text: ${text}\nHashed Password: ${hashedPassword}`
    );
  }
  return new Response("No input text provided.");
}
