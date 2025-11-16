import { Links, Link } from "react-router-dom";
import { Languages, Shuffle, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Text Translator",
      description: "Translate text from English to your favorite language using RapidAPI integration.",
      icon: Languages,
      path: "/translate",
    },
    {
      title: "Random String Generator",
      description: "Generate random strings with customizable length and character types using React hooks.",
      icon: Shuffle,
      path: "/generate",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-black">
            Welcome to Multi-Tool App
          </h1>
          <p className="text-black/60 max-w-2xl mx-auto text-sm md:text-base">
            A collection of useful tools built with React and Tailwind CSS. Explore our translator and random string generator features.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ title, description, icon: Icon, path }) => (
            <Link
              key={title}
              to={path}
              className="group bg-white border border-black/10 rounded-2xl p-6 hover:border-black/20 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-black" />
                    <h3 className="text-lg font-semibold text-black">{title}</h3>
                  </div>
                  <p className="text-sm text-black/60">{description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-black/40 group-hover:text-black transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}