import { NavLink } from "react-router-dom";

export default function Navbar() {
  const nav = [
    { name: "Home", link: "/" },
    { name: "Translate Text", link: "/translate" },
    { name: "Generate Random Text", link: "/generate" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-center gap-8">
        {nav.map(({ name, link }) => (
          <NavLink
            key={link}
            to={link}
            className={({ isActive }) =>
              `relative text-sm font-medium text-black hover:text-black/80 transition-colors ` +
              (isActive ? "text-black" : "text-black/60")
            }
          >
            {({ isActive }) => (
              <>
                {name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}