
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details to create a TftC account"
      footer={
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
