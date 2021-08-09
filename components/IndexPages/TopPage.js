import React, { useEffect, useState } from "react";
import topPageStyles from "../../styles/IndexPages/TopPage.module.scss";

const TopPage = ({ quotesRes }) => {
  let [quotes, setQuotes] = useState({ text: "", author: "" });
  let [quotesDB, setQuotesDB] = useState([]);

  useEffect(() => {
    if (quotesRes.length > 0) {
      const total = quotesRes.length;
      const randomNumber = Math.floor(Math.random() * total);

      setQuotes(quotesRes[randomNumber]);
      setQuotesDB(quotesRes);
    }
  }, []);

  const getAnotherQuote = () => {
    const total = quotesDB.length;
    const randomNumber = Math.floor(Math.random() * total);
    setQuotes(quotesDB[randomNumber]);
  };

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

export const getStaticProps = async () => {
  let response = await fetch("https://type.fit/api/quotes");
  let quotesRes = await response.json();

  if (!quotesRes) {
    console.log("no res");
    return {
      notFound: true,
    };
  }

  return {
    props: {
      quotesRes,
    },
  };
};

export default TopPage;
