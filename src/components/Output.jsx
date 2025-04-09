import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/output.module.css";

const Output = ({ story }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const indexRef = useRef(0);

  const cleanStory = story?.replace(/\*+$/, "").trim() || "";

  const formatStoryText = (text) => {
    if (!text) return "";

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  };

  useEffect(() => {
    if (!cleanStory) return;

    setDisplayedText("");
    indexRef.current = 0;

    const interval = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex >= cleanStory.length) {
        clearInterval(interval);
        return;
      }

      setDisplayedText((prev) => prev + cleanStory.charAt(currentIndex));
      indexRef.current += 1;

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [cleanStory]);

  const handleCopy = () => {
    if (cleanStory) {
      navigator.clipboard.writeText(cleanStory);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.outputWrapper}>
      <div className={styles.header}>
        <h2>Generated Story:</h2>
        {cleanStory && (
          <button className={styles.copyButton} onClick={handleCopy}>
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        )}
      </div>

      <div ref={containerRef} className={styles.storyContainer}>
        <pre
          className={styles.storyText}
          dangerouslySetInnerHTML={{
            __html:
              formatStoryText(displayedText) || "Your story will appear here.",
          }}
        />
      </div>
    </div>
  );
};

export default Output;