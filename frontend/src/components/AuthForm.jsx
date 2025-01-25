import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "participant", // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isLogin
                ? "http://localhost:4000/api/auth/login"
                : "http://localhost:4000/api/auth/register";

            const { data } = await axios.post(url, formData);

            if (!isLogin) {
                alert("Account created! Please log in.");
                setIsLogin(true);
            } else {
                alert("Login successful");
                // Save JWT token in localStorage or handle authentication
                localStorage.setItem("token", data.token);
            }
        } catch (err) {
            alert(err.response.data.message || "Something went wrong");
        }
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? "Login" : "Signup"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="participant">Participant</option>
                            <option value="organizer">Organizer</option>
                        </select>
                    </div>
                )}
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                    ? "Need an account? Sign Up"
                    : "Already have an account? Login"}
            </button>
        </div>
    );
};

export default AuthForm;
