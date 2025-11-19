import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@test.com" && password === "admin") {
      localStorage.setItem("auth", "true");
      window.location.reload();
    } else {
      setError("Invalid email or password");
    //   localStorage.setItem("auth", "true");
    //   window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDE PANEL */}
      <div className="hidden md:flex w-1/2 bg-slate-900 bg-gradient-to-r
       from-slate-900 to-slate-800 text-white items-center justify-center flex-col px-10">
        <h1 className="text-4xl font-bold mb-4">Portus Gateway Manager</h1>
        <p className="text-lg text-slate-100">
          Secure • Scalable • Enterprise-grade API Gateway
        </p>
      </div>

      {/* LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Sign in to your account
          </h2>
          <div className="flex justify-center mb-4 bg-gray-50
           p-2 width-full rounded-lg">
            <div className="text-sm text-gray-500 cursor-pointer ">
              For demo, Use&nbsp;
              <em><b>"admin@test.com"</b></em>
              &nbsp;with password&nbsp;
              <em><b>"admin"</b></em>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm bg-red-100 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-slate-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white py-2 rounded-lg font-medium transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
