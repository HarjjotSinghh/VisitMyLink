
import React from "react";
import CreateLinkForm from "./create-link-form";

export default function CreateLinkPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 lg:px-8 px-4 py-24 mb-48">
      <h1 className="lg:text-5xl text-4xl tracking-tight font-semibold">Create <span className="bg-gradient-to-tr from-primary to-primary/60 bg-clip-text text-transparent font-extrabold tracking-tighter">Shortened Link</span></h1>
      <CreateLinkForm className="w-full max-w-[35rem]" />
    </main>
  );
}
