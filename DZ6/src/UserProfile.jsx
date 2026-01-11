import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setErrorText("");

      const response = await axios.get("https://randomuser.me/api/");
      const fetchedUser = response.data?.results?.[0] ?? null;

      setUser(fetchedUser);
    } catch (error) {
      setErrorText("Failed to load user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !user) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (errorText && !user) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{errorText}</p>
        <button className={styles.button} onClick={fetchUser}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Profile</h2>

      {user ? (
        <div className={styles.card}>
          <img
            className={styles.avatar}
            src={user.picture?.large}
            alt="User avatar"
          />

          <div className={styles.info}>
            <p className={styles.name}>
              {user.name?.title} {user.name?.first} {user.name?.last}
            </p>

            <p className={styles.text}>
              <span className={styles.label}>Email:</span> {user.email}
            </p>

            <p className={styles.text}>
              <span className={styles.label}>Phone:</span> {user.phone}
            </p>

            <p className={styles.text}>
              <span className={styles.label}>Location:</span>{" "}
              {user.location?.country}, {user.location?.city}
            </p>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}

      <button className={styles.button} onClick={fetchUser} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load new user"}
      </button>

      {errorText && user ? <p className={styles.error}>{errorText}</p> : null}
    </div>
  );
}
