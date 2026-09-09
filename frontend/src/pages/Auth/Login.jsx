import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.email("Invalid Email"),

  password: z.string().min(6),
});

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,

    handleSubmit,

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);
      const result = response.data.data;

      login(
        result.accessToken,
        result.user,
      );

      toast.success("Welcome Back!");

      switch (result.user.role) {
        case "vendor":
          navigate("/vendor");
          break;

        case "admin":
          navigate("/admin/dashboard");

          break;

        default:
          navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors.password}
            {...register("password")}
          />

          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
