import React, { useEffect, useState } from "react";
import topPageStyles from "../../styles/IndexPages/TopPage.module.scss";

const TopPage = () => {
  let [quotes, setQuotes] = useState({ text: "", author: "" });
  let [quotesDB, setQuotesDB] = useState([]);

  async function getRandomQuote() {
    let response = await fetch("https://type.fit/api/quotes");
    let json = await response.json();

    const total = json.length;
    const randomNumber = Math.floor(Math.random() * total);

    setQuotes(json[randomNumber]);
    setQuotesDB(json);
  }

  const getAnotherQuote = () => {
    const total = quotesDB.length;
    const randomNumber = Math.floor(Math.random() * total);
    setQuotes(quotesDB[randomNumber]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className={topPageStyles.container}>
      <span
        className={topPageStyles.quotes}
        onClick={() => {
          getAnotherQuote();
        }}
      >
        "{quotes.text}"
      </span>
      <span className={topPageStyles.author}>
        {quotes.author == null ? "anoynimous" : quotes.author}
      </span>
    </div>
  );
};

export default TopPage;
