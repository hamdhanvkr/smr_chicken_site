import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
  FaClock,
  FaCommentAlt,
} from "react-icons/fa";

export default function Contact() {
  const location = useLocation();
  const selectedProduct = location.state?.productName || "";

  // Pre-filled WhatsApp message if redirected with a selected product
  const customMessage = selectedProduct
    ? encodeURIComponent(`Hello SMR Chicken! I would like to inquire/order: ${selectedProduct}`)
    : encodeURIComponent("Hello SMR Chicken! I would like to make an inquiry.");

  const waLinks = [
    {
      label: "Sales Representative 1",
      phone: "+6016-8050930",
      link: `https://wa.me/60168050930?text=${customMessage}`,
    },
    {
      label: "Sales Representative 2",
      phone: "+6012-3623786",
      link: `https://wa.me/60123623786?text=${customMessage}`,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-red-600 font-bold uppercase tracking-wider text-xs bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200/80 shadow-sm">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We're Here To <span className="text-red-600">Help</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
            Whether you are a retail customer or a wholesale buyer, reach out to us for fresh poultry orders, quotes, and general inquiries.
          </p>
        </div>

        {/* ================= TWO-COLUMN MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT INFORMATION */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Contact Details
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Reach out directly through any of our official channels or visit our corporate office.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Phone Numbers Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 transition-all hover:bg-slate-50 hover:border-slate-300">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm">
                  <FaPhoneAlt />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 text-base">Phone Support</h3>
                  <div className="text-slate-600 text-sm font-medium mt-1 space-y-1">
                    <p className="flex items-center gap-2">
                      <a href="tel:+60168050930" className="hover:text-red-600 transition-colors">
                        +6016-805 0930
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <a href="tel:+60123623786" className="hover:text-red-600 transition-colors">
                        +6012-362 3786
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Address Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 transition-all hover:bg-slate-50 hover:border-slate-300">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Corporate Headquarters</h3>
                  <p className="text-slate-800 font-semibold text-xs mt-1">
                    SALSABEEL MAJU RESOURCES (M) SDN. BHD.
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mt-0.5">
                    Jalan Titir 33/25 Technology Park,<br />
                    40400 Shah Alam, Selangor, Malaysia
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 transition-all hover:bg-slate-50 hover:border-slate-300">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Email Inquiries</h3>
                  <a
                    href="mailto:salsabeelmaju786@gmail.com"
                    className="text-slate-600 hover:text-red-600 text-sm font-medium transition-colors mt-1 block"
                  >
                    salsabeelmaju786@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WHATSAPP ORDERING BOX */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              
              {/* Product Context Alert Banner */}
              {selectedProduct ? (
                <div className="mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <FaCommentAlt className="text-red-400 flex-shrink-0" />
                  <span>Inquiring For: <strong className="text-white underline">{selectedProduct}</strong></span>
                </div>
              ) : null}

              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/20">
                  <FaWhatsapp size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">Instant WhatsApp Order</h3>
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 pt-2">
                Click on any of our official representatives below to start chatting instantly with a pre-filled request.
              </p>

              {/* Representative Cards */}
              <div className="space-y-3.5">
                {waLinks.map((wa, i) => (
                  <a
                    key={i}
                    href={wa.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 rounded-2xl transition-all duration-200 group active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                        <FaWhatsapp />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">{wa.label}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{wa.phone}</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400 leading-relaxed">
              ⚡ Fast reply guaranteed during regular business operating hours.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}