import React, { useState, useCallback } from "react";
import { ArrowLeftRight, Clipboard } from "lucide-react";

export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = {
    en: "English",
    hi: "Hindi",
    fr: "French",
    es: "Spanish",
    de: "German",
  };

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText("");
  };

  const translateText = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setOutputText("");
    try {
      const res = await fetch(
        "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
            "x-rapidapi-key":
              "25b8f23ef5mshbb1dba72a3c1ed4p14e885jsnb21ef8a87dca",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromLang,
            to: toLang,
            text: inputText,
          }),
        }
      );
      const data = await res.json();
      setOutputText(data.trans ?? "Translation error");
    } catch {
      setOutputText("API Error");
    } finally {
      setLoading(false);
    }
  }, [inputText, fromLang, toLang]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white border border-black/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-black text-center">
          Multi-Language Translator
        </h1>

        <div className="flex items-center gap-3">
          <LangSelect
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            options={languages}
          />
          <button
            onClick={handleSwap}
            aria-label="swap languages"
            className="p-2 rounded-lg border border-black/10 hover:bg-black/[0.02] transition"
          >
            <ArrowLeftRight className="w-5 h-5 text-black" />
          </button>
          <LangSelect
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            options={languages}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextArea
            placeholder="Enter text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <TextArea
            placeholder="Translation"
            value={outputText}
            readOnly
            loading={loading}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={translateText}
            disabled={loading || !inputText.trim()}
            className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition"
          >
            {loading ? "Translating…" : "Translate"}
          </button>

          <button
            onClick={copyToClipboard}
            disabled={!outputText}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 text-black text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/[0.02] transition"
          >
            <Clipboard className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LangSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/20"
    >
      {Object.entries(options).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}

function TextArea({ loading, ...props }) {
  return (
    <div className="relative">
      <textarea
        {...props}
        className="w-full h-40 px-4 py-3 rounded-lg border border-black/10 resize-none bg-white text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
      />
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-white/70">
          <span className="text-black/60 text-sm">Translating…</span>
        </div>
      )}
    </div>
  );
}
