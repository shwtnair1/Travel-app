import styles from './page.module.css';
import { FlightSearch } from '../components/FlightSearch';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FlightSearch />
      </main>
    </div>
  );
}
