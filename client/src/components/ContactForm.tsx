import React, { useState, ChangeEvent, FormEvent } from "react";
import api from "../auth/api";
import LogoutButton from "./LogoutButton";

interface FormData {
  topic: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ topic: "", message: "" });
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setResponseMessage("");

    try {
      await api.post("/contact", formData);
      setResponseMessage("Message sent successfully!");
    } catch (err: any) {
      console.error("Contact form error:", err);
      setError(err.response?.data?.message || "Failed to send the message.");
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            id="topic"
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
        <LogoutButton />
    </div>
  );
};

export default ContactForm;
