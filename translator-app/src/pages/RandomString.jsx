import React, { useState, useEffect, useCallback, useRef } from "react";

export default function GenerateString() {
  const [length, setLength]   = useState(12);
  const [password, setPassword] = useState("");
  const [charAllow, setCharAllow] = useState(true);
  const [symAllow,  setSymAllow]  = useState(true);
  const [numAllow,  setNumAllow]  = useState(true);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  const passwordGenerator = useCallback(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums  = "0123456789";
    const syms  = "!@#$%^&*()_+{}[]<>?,./;";

    let allowed = "";
    if (charAllow) allowed += chars;
    if (numAllow)  allowed += nums;
    if (symAllow)  allowed += syms;

    if (!allowed) {
      setPassword("");
      return;
    }

    let temp = "";
    for (let i = 0; i < length; i++) {
      temp += allowed[Math.floor(Math.random() * allowed.length)];
    }
    setPassword(temp);
  }, [charAllow, numAllow, symAllow, length]);

  useEffect(() => passwordGenerator(), [passwordGenerator]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-black/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-8 space-y-6">

        
        <div>
          <h1 className="text-2xl font-semibold text-black">Random String Generator</h1>
          <p className="text-sm text-black/60 mt-1">Configure your rules and copy the result instantly.</p>
        </div>

        
        <div className="bg-white border border-black/15 rounded-xl p-4 flex items-center gap-3">
          <input
            ref={passwordRef}
            value={password}
            readOnly
            className="flex-1 bg-transparent outline-none font-mono text-black"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Copy
          </button>
        </div>

       
        <div>
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-black">String length</label>
            <span className="text-lg font-semibold text-black">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-black/5 rounded-lg appearance-none cursor-pointer mt-3 accent-black"
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Characters", checked: charAllow, onChange: () => setCharAllow((p) => !p) },
            { label: "Numbers",    checked: numAllow,  onChange: () => setNumAllow((p) => !p) },
            { label: "Symbols",    checked: symAllow,  onChange: () => setSymAllow((p) => !p) },
          ].map(({ label, checked, onChange }) => (
            <label
              key={label}
              className="flex items-center gap-3 p-3 rounded-lg border border-black/10 cursor-pointer hover:bg-black/[0.02] transition"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-black/20 text-black focus:ring-black/40"
              />
              <span className="text-sm font-medium text-black">{label}</span>
            </label>
          ))}
        </div>

       
        <button
          onClick={passwordGenerator}
          className="w-full py-2.5 rounded-lg border border-black/10 bg-white text-black text-sm font-medium hover:bg-black/[0.02] transition"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}