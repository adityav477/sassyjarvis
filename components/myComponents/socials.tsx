"use client"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react";

export default function SocialsButtons() {

  //GithubLogin
  async function providersLogin(provider: "github" | "google") {
    console.log("insde githubLogin");
    await signIn(provider, {
      callbackUrl: "/dashboard",
    });
  }
  return <div className="grid grid-cols-2 gap-2 pt-4">
    <Button variant="outline" onClick={() => providersLogin("google")}>
      <FcGoogle />
    </Button>

    <Button onClick={() => providersLogin("github")}>
      <FaGithub />
    </Button>
  </div>
}
