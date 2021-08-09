import React from "react";
import Link from "next/link";
import midPageStyles from "../../styles/IndexPages/MidPage.module.scss";

export default function MidPage({ projects }) {
  const generateProjectList = () => {
    return projects.map((item) => {
      return (
        <li>
          <div className={midPageStyles["list-item"]}>
            <div className={midPageStyles["list-title"]}> {item.title}</div>
            <div className={midPageStyles["list-description"]}>
              {" "}
              {item.description}
            </div>
            <div className={midPageStyles["list-link"]}>
              <Link href={`/${item.slug}`}>
                <div className={midPageStyles.button}>{item.slug}</div>
              </Link>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className={midPageStyles.container}>
      <div className={midPageStyles.content}>
        <div className={midPageStyles.intro}>
          Here's the list of some of my side projects during this pandemic
        </div>
        <ul className={midPageStyles.list}>
          <div className={midPageStyles["list-item-header"]}>
            <div className={midPageStyles["list-item-header-title"]}>Title</div>
            <div className={midPageStyles["list-item-header-desc"]}>
              Description
            </div>
            <div className={midPageStyles["list-item-header-link"]}>Link</div>
          </div>
          {generateProjectList()}
        </ul>
      </div>
    </div>
  );
}
