import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import { signup as signupApi } from "../../services/authService";

const signupSchema = z
    .object({
        fullName: z.string().min(3, "Full name is required"),

        email: z.email("Invalid email"),

        phone: z
            .string()
            .min(10, "Phone number must be at least 10 digits"),

        password: z.string().min(6, "Password must be at least 6 characters"),

        confirmPassword: z.string(),

        role: z.enum(["customer", "vendor"], {
            error: "Please select a role",
        }),

        businessName: z.string().optional(),
        description: z.string().optional(),
        city: z.string().optional(),
        address: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })
    .superRefine((data, ctx) => {
        if (data.role !== "vendor") return;

        const vendorFields = {
            businessName: "Business name is required",
            description: "Description must be at least 10 characters",
            city: "City is required",
            address: "Address is required",
        };

        Object.entries(vendorFields).forEach(([field, message]) => {
            const value = data[field]?.trim();
            if (!value || (field === "description" && value.length < 10)) {
                ctx.addIssue({ code: "custom", path: [field], message });
            }
        });
    });

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: "customer",
        },
    });

    const isVendor = watch("role") === "vendor";

    const onSubmit = async (data) => {
        try {
            const payload = {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: data.role,
                ...(data.role === "vendor" && {
                    businessName: data.businessName,
                    description: data.description,
                    city: data.city,
                    address: data.address,
                }),
            };

            await signupApi(payload);

            toast.success("Account created successfully!");

            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
                <h2 className="mb-8 text-center text-3xl font-bold">
                    Create Account
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter Full Name"
                        error={errors.fullName}
                        {...register("fullName")}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        error={errors.email}
                        {...register("email")}
                    />

                    <Input
                        label="Phone Number"
                        type="text"
                        placeholder="Enter Phone Number"
                        error={errors.phone}
                        {...register("phone")}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Account Type
                        </label>

                        <select
                            {...register("role")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                        >
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>

                        {errors.role && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {isVendor && (
                        <>
                            <Input
                                label="Business Name"
                                type="text"
                                placeholder="Enter business name"
                                error={errors.businessName}
                                {...register("businessName")}
                            />

                            <div className="space-y-1">
                                <label className="font-medium">Business Description</label>
                                <textarea
                                    rows="4"
                                    placeholder="Tell customers about your business"
                                    {...register("description")}
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-600"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            <Input
                                label="City"
                                type="text"
                                placeholder="Enter city"
                                error={errors.city}
                                {...register("city")}
                            />

                            <Input
                                label="Business Address"
                                type="text"
                                placeholder="Enter business address"
                                error={errors.address}
                                {...register("address")}
                            />
                        </>
                    )}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        error={errors.password}
                        {...register("password")}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        error={errors.confirmPassword}
                        {...register("confirmPassword")}
                    />

                    <button
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                    >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
