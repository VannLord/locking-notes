import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>

        <AuthForm type="sign-up" />
      </Card>
    </div>
  );
};

export default SignUpPage;
