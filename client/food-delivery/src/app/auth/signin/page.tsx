import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <div className="flex min-h-[calc(100svh-96px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
