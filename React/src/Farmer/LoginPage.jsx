import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Mock login logic
    console.log("Logging in with", { email, password });

    // Clear form (optional)
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "sans-serif"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "14px"
  }
};
