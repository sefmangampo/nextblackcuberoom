import React from "react";
import bottomPageStyles from "../../styles/IndexPages/BottomPage.module.scss";
import Link from "next/link";

export default function BottomPage() {
    return (<div className={bottomPageStyles.container}>

        <div className={bottomPageStyles.aboutContainer}>
            <div className={bottomPageStyles.intro}>
                I make web apps
            </div>
            <div className={bottomPageStyles.details}>
                <p> I like interaction and information.</p>
                <p>We make better decision when we are informed.</p>
                <p>Also, I like cats and have 5 of them.</p>
            </div>
        </div>

        <div className={bottomPageStyles.buttonContainer}>
            <Link href="more-about-me">
                <div className={bottomPageStyles.button}>
                    More...
                </div>
            </Link>
        </div>


    </div >);
}
