"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("Submitting…");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed: ${res.status}`);
      }
      setStatus("✅ Request sent! I’ll reply by email.");
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setStatus(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold">Custom Gaming PC Request</h1>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full border rounded-md p-2"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm">Budget (USD)</span>
          <input
            type="number"
            name="budget"
            min={0}
            className="mt-1 w-full border rounded-md p-2"
            placeholder="800"
          />
        </label>

        <label className="block">
          <span className="text-sm">Case & Motherboard Color</span>
          <select
            name="color"
            className="mt-1 w-full border rounded-md p-2"
            defaultValue=""
            required
          >
            <option value="" disabled>Choose a color theme…</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Black + RGB">Black + RGB</option>
            <option value="White + RGB">White + RGB</option>
            <option value="Other">Other (specify below)</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Special Requests</span>
          <textarea
            name="special-requests"
            rows={5}
            className="mt-1 w-full border rounded-md p-2"
            placeholder="What games, streaming/recording needs, aesthetics, etc."
          />
        </label>

        <h2 className="text-lg font-semibold">Labor Fees</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><b>$100</b> Builds under $1000</li>
          <li><b>$200+</b> Builds $1000+</li>
          <li><b>$300+</b> Builds $1500+</li>
        </ul>
        <p className="text-xs text-gray-600">The Labor fees apply towards total build</p>

        <p className="text-xs text-gray-600">
          After you submit, I’ll email you a parts list tailored to your budget and special
          requests, go over what parts I’ll source, assemble and set up your PC, and then
          arrange delivery.
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded-md hover:opacity-90 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting…" : "Submit"}
        </button>

        {status ? <p className="text-sm mt-2">{status}</p> : null}
      </form>
    </main>
  );
}
