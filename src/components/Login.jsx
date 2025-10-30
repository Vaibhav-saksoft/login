import React, { useState } from "react";

/**
 * POC Login Page (micro frontend)
 * - Dispatches a browser event with token when login succeeds
 * - UI unchanged
 */

const fakeGenerateToken = (username) =>
  `POC-TOKEN.${btoa(username + "|" + Date.now())}.${Math.random()
    .toString(36)
    .slice(2)}`;

const Input = ({ label, type = "text", value, onChange, placeholder }) => (
  <div style={{ marginBottom: 12 }}>
    <label
      style={{
        display: "block",
        fontSize: 13,
        color: "#3b3b3b",
        marginBottom: 6,
      }}
    >
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #e6e6e6",
        boxSizing: "border-box",
        fontSize: 14,
      }}
    />
  </div>
);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((r) => setTimeout(r, 700));

      // Demo credentials
      if (username === "admin" && password === "1234") {
        const token = fakeGenerateToken(username);

        // ✅ Dispatch token to dashboard host (event-based communication)
        window.dispatchEvent(
          new CustomEvent("user-logged-in", {
            detail: { token, user: { username } },
          })
        );
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Login failed — try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minWidth: 320,
        maxWidth: 420,
        margin: "40px auto",
        padding: 28,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        background: "linear-gradient(180deg,#fff,#fbfbfb)",
        fontFamily: "Inter, Roboto, system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div
          style={{
            width: "auto",
            height: 64,
            borderRadius: 12,
            background: "#0ea5a4",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 8,
            padding: "0px 14px",
          }}
        >
          DoveTail
        </div>
        <h2 style={{ margin: 0, fontSize: 20 }}>Welcome back</h2>
        <p style={{ margin: "6px 0 18px", color: "#666", fontSize: 13 }}>
          Sign in to continue to Dashboard
        </p>
      </div>

      <form onSubmit={submit}>
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. admin"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        {error && (
          <div style={{ color: "#b00020", marginBottom: 12, fontSize: 13 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: "#0ea5a4",
            color: "white",
            fontSize: 15,
            cursor: loading ? "wait" : "pointer",
            boxShadow: "0 6px 18px rgba(14,165,164,0.18)",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div
        style={{
          marginTop: 14,
          textAlign: "center",
          fontSize: 13,
          color: "#666",
        }}
      >
        For demo use <strong>admin / 1234</strong>
      </div>
    </div>
  );
}
