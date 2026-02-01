import styles from "./LoginScreen.module.css";

/* логотип */
import spotifyLogo from "../../assets/spotify-logo.png";

/* внутренности иконок (PNG, без фона) */
import appleIcon from "../../assets/icons/apple.png";
import googleIcon from "../../assets/icons/google.png";
import xIcon from "../../assets/icons/x.png";

function ProviderButton({ icon, alt }) {
  return (
    <button className={styles.iconBtn} type="button" aria-label={alt}>
      <span className={styles.iconBox}>
        <img
          className={styles.iconImg}
          src={icon}
          alt=""
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

export default function LoginScreen() {
  return (
    <div className={styles.page}>
      <section className={styles.frame}>
        <img
          className={styles.logo}
          src={spotifyLogo}
          alt="Spotify"
        />

        <h1 className={styles.title}>
          LIFE IS WASTED ON THE LIVING
        </h1>

        <div className={styles.signinText}>
          <div>Sign in</div>
          <div>with</div>
        </div>

        <div className={styles.providers}>
          <ProviderButton icon={appleIcon} alt="Apple" />
          <ProviderButton icon={googleIcon} alt="Google" />
          <ProviderButton icon={xIcon} alt="X" />
        </div>
      </section>
    </div>
  );
}
