import React, {ReactNode} from 'react';
import styles from '../styles/common.module.css';
import Header from "../components/header"

type Props = {
  children: ReactNode;
}

const Layout = ({children, ...props}: Props) => {
  return (
    <div className={styles.container} {...props}>
      <Header></Header>
      {children}
    </div>
  );
};

export default Layout
