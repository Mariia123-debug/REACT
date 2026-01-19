import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote } from "../features/quote/quoteSlice";
import styles from "./Quote.module.css";

export default function Quote() {
  const dispatch = useDispatch();
  const { quote, author, status, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {status === "loading" && <p className={styles.muted}>Loading…</p>}

        {status === "failed" && (
          <div className={styles.errorBox}>
            <p className={styles.errorTitle}>Error</p>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {status !== "loading" && status !== "failed" && quote && (
          <>
            <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
            <p className={styles.author}>— {author}</p>
          </>
        )}
      </div>

      <button
        className={styles.button}
        onClick={handleNewQuote}
        disabled={status === "loading"}
      >
        New quote
      </button>
    </div>
  );
}
