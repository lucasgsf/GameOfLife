import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default LoadingSpinner;