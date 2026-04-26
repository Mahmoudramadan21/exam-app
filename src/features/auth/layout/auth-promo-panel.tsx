import { FolderCode } from "lucide-react";
import { PLATFORM_FEATURES } from "../lib/constants/platform-features.constant";

function AuthPromoPanel() {
  return (
    <section className="relative hidden lg:block min-h-screen px-20 2xl:px-31 py-18 2xl:py-27 overflow-hidden bg-[#EFF6FFBF]">
      {/* Branding */}
      <div className="flex items-center gap-4 mb-20 2xl:mb-34">
        <FolderCode className="w-7 h-7 text-blue-600" />
        <p className="font-semibold text-xl text-blue-600">Exam App</p>
      </div>

      {/* Title */}
      <h2 className="mb-15 font-bold text-3xl text-gray-800">
        Empower your learning journey with our smart exam platform.
      </h2>

      {/* Platform Features */}
      <ul>
        {PLATFORM_FEATURES.map(({ id, icon: Icon, title, description }) => (
          <li key={id} className="flex gap-7 mb-8">
            <Icon width={28} className="shrink-0 mt-2 text-blue-600" />

            <div>
              <h3 className="mb-2.5 font-semibold text-xl text-blue-600">
                {title}
              </h3>

              <p className="text-gray-700">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Ellipise */}
      <div className="absolute top-4 -right-6 w-110 h-110 bg-[radial-gradient(circle,rgba(59,130,246,0.20)_0%,rgba(59,130,246,0)_70%)]" />
      <div className="absolute bottom-4 -left-10 w-110 h-110 bg-[radial-gradient(circle,rgba(59,130,246,0.20)_0%,rgba(59,130,246,0)_70%)]" />
    </section>
  );
}

export default AuthPromoPanel;
