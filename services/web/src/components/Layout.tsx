import React, {ReactNode} from 'react';
import styles from '../styles/common.module.css';
import Header from "../components/header"
import Footer from './footer';

type Props = {
  children: ReactNode;
}

const Layout = ({children, ...props}: Props) => {
  return (
    <div className={styles.container} {...props}>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout
