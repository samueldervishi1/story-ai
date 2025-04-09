import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/input.module.css";

const Input = ({ setGeneratedStory }) => {
  const [storyPrompt, setStoryPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxLength = 500;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setStoryPrompt(value);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!storyPrompt.trim()) {
      setError("Please enter a story prompt");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}`, {
        message: storyPrompt,
      });
      setGeneratedStory(response.data.reply);
    } catch (error) {
      console.error("Error generating story:", error);
      setError("Something went wrong. Please try again.");
      setGeneratedStory("");
    }

    setLoading(false);
  };

  const handleClear = () => {
    setStoryPrompt("");
    setError(null);
  };

  return (
    <div className={styles.input}>
      <textarea
        value={storyPrompt}
        onChange={handleChange}
        placeholder="Enter your story prompt... (e.g., 'A magical forest where trees can talk')"
        rows="8"
        cols="50"
        maxLength={maxLength}
      />
      <div className={styles.counter}>
        {storyPrompt.length}/{maxLength} characters
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttonGroup}>
        <button
          onClick={handleSubmit}
          disabled={loading || !storyPrompt.trim()}
          className={loading ? styles.loading : ""}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Generating...
            </>
          ) : (
            "Generate Story"
          )}
        </button>
        <button
          onClick={handleClear}
          disabled={loading || !storyPrompt.trim()}
          className={styles.clearButton}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Input;