"use client";
import { useState } from "react";
import { apiRequest, setToken } from "../../../lib/utils";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest("auth/login", "POST", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      setMessage({
        text: response.message || "Logged in successfully!",
        type: response.status === "success" ? "success" : "error",
      });

      if (response.status === "success") {
        if (response.data.token) {
          setToken(response.data.token);
          router.push("/dashboard");
        } else {
          setMessage({
            text: "Login failed. Please try again.",
            type: "error",
          });
        }
      }
    } catch (error) {
      setMessage({
        text: error.message || "Login failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Sign In
        </h2>
        <p className="text-center text-green-600">Access your account</p>

        {message && (
          <p
            className={`text-center ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              className="block mb-1 text-sm font-medium text-green-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block mb-1 text-sm font-medium text-green-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader2 size={20} color="#ffffff" className="animate__animated animate__infinite animate-spin" /> : "Sign In"}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-sm text-green-600">
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
