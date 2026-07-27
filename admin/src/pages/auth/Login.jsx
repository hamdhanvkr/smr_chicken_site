import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import api from "../../services/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await api.post("/admin/login", { email, password });

      if (response.data.success) {
        // Optional: Save token if returned
        if (response.data.token) {
          localStorage.setItem("adminToken", response.data.token);
        }
        navigate("/dashboard");
      } else {
        setErrorMsg(response.data.message || "Invalid login credentials.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-slate-800/40 rounded-full blur-3xl"></div>
      </div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* BRAND HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-600/10 border border-red-500/20 mb-4">
            <img
              src="/src/assets/smr_logo1.png"
              alt="SMR Chicken Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40?text=SMR";
              }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Admin <span className="text-red-500">Portal</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Salsabeel Maju Resources
          </p>
        </div>

        {/* ERROR NOTIFICATION BANNER */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium text-center animate-fade-in">
            {errorMsg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL FIELD */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-slate-500 text-sm pointer-events-none" />
              <input
                type="email"
                placeholder="admin@smrchicken.com"
                required
                className="w-full bg-slate-800/60 border border-slate-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-slate-500 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-500 text-sm pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full bg-slate-800/60 border border-slate-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-slate-500 text-sm rounded-xl pl-11 pr-11 py-3.5 outline-none transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-red-600 hover:bg-red-500 disabled:bg-red-800/60 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-red-600/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-base" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-slate-500 text-xs mt-8">
          Authorized personnel only. Protected by SMR Admin Security.
        </p>

      </div>
    </div>
  );
}

export default Login;