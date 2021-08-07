import Head from "next/head";

import Nav from "../components/Nav";

import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <>
      <Nav />
      <div className={styles["home-container"]}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100;0,400;1,400&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <section id="quotes" className={styles.topPage}>
          section 1
        </section>
        <section id="projects" className={styles.midPage}>
          section 2
        </section>
        <section id="about" className={styles.bottomPage}>
          section3
        </section>
      </div>
    </>
  );
};

export default Home;
