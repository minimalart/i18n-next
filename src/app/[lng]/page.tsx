
import styles from "./page.module.css";
import { getTranslation } from '../i18n'
import Link from "next/link";
import { languages } from "../i18n/settings";

export type HomeParams = {
  params: {
    lng: string;
  };
}

export default async function Home({ params }: HomeParams) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, "global")

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Currently you are on {lng} lng
          </li>
          <li>
            {t("title")}
          </li>
          <li>
            {t("description")}
          </li>
            {languages.map((l) => (
              <li key={l}>
                <Link key={l} href={`/${l}`}>
                  {t("changeLang")} {l}
                </Link>
              </li>
            ))}
        </ol>

        
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
