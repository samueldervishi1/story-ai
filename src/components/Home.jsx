import React, { useState } from "react";
import Input from "./Input";
import Output from "./Output";
import styles from "../styles/home.module.css";

const Home = () => {
  const [generatedStory, setGeneratedStory] = useState("");

  return (
    <div className={styles.home}>
      <div className={styles.stars}></div>
      <div className={styles.magicOrb}></div>
      <div className={styles.splitLayout}>
        <div className={styles.leftSide}>
          <div className={styles.content}>
            <h1>Welcome to the Enchanted Story Generator</h1>
            <p className={styles.colorChange}>
              Unleash your imagination and let the magic of AI craft a unique
              tale just for you. Enter your prompt and watch as your story comes
              to life!
            </p>
            <Input setGeneratedStory={setGeneratedStory} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <Output story={generatedStory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;