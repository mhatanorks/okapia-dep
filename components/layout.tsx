import { Header } from "./header";
import { Footer } from "./footer";
import styles from "../styles/layout.module.css";

const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  return (
    <>
      {/* index.tsx に home入れる */}
      {home ? (
        <>
          <Header />
          <div className={styles.tour_trip_home}>{children}</div>
          <Footer />
        </>
      ) : (
        !home && (
          <>
            <Header />
            <div className={styles.tour_trip_contents}>{children}</div>
            <Footer />
          </>
        )
      )}
    </>
  );
};
export default Layout;
