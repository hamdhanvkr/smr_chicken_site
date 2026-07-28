import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaShieldAlt } from "react-icons/fa";
import logo from "../../assets/smr_logo1.png";
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-red-500 selection:text-white">
      {/* LIGHT DECORATIVE BACKGROUND AMBIENCE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-red-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />
      </div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 transition-all">
        
        {/* BRAND HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mb-4 transition-transform hover:scale-105">
            <img
              src={logo}
              alt="SMR Chicken Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
              }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin <span className="text-red-600">Portal</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 uppercase tracking-wider font-semibold">
            Salsabeel Maju Resources
          </p>
        </div>

        {/* ERROR BANNER */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200/80 rounded-xl text-red-600 text-xs font-medium text-center animate-shake">
            {errorMsg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL FIELD */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative flex items-center group">
              <FaEnvelope className="absolute left-4 text-slate-400 group-focus-within:text-red-600 transition-colors text-sm pointer-events-none" />
              <input
                type="email"
                placeholder="admin@salsabeel.com"
                required
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all duration-200 font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
            </div>
            <div className="relative flex items-center group">
              <FaLock className="absolute left-4 text-slate-400 group-focus-within:text-red-600 transition-colors text-sm pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-11 pr-11 py-3.5 outline-none focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all duration-200 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
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
            className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
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

        {/* FOOTER SECURITY BADGE */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium">
          <FaShieldAlt className="text-slate-400 text-xs" />
          <span>Protected by SMR Admin Security</span>
        </div>

      </div>
    </div>
  );
}

export default Login;