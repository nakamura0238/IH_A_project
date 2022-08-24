import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'

import axios from 'axios'
import { setCookie } from 'nookies'
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'


import Header from "../components/header"
import Link from 'next/link'


type Inputs = {
  email: string;
  password: string;
};

type loginResponse = {
  id: number,
  token: string
}

// バリデーション規則
const validate = yup.object({
  email: yup
      .string()
      .required('必須です')
      .matches(
          /^([a-zA-Z0-9@.]){4,}$/,
          '半角英数字4文字以上で入力してください',
      ),
  password: yup
      .string()
      .required('必須です')
      .matches(
          /^([a-zA-Z0-9]){6,}$/,
          '半角英数字6文字以上で入力してください',
      ),
});

const Home = (props: propsType) => {

  const route = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(validate),
  });

  // 送信処理
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {

      const reqObject = {
        email: data.email,
        password: data.password,
      };

      const result =
        await axios.post('http://localhost:3001/api/v1/users/login', reqObject);
      console.log('login result: ', result.data);
      const resultData: loginResponse = result.data;

      console.log(resultData.token);
      setCookie(undefined, 'AuthToken', resultData.token, {
        maxAge: 7 * 24 * 60 * 60,
      } );
      route.push('/foods');
      
      reset();

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1>ログイン</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p>email</p>
          <input
            type={'text'}
            autoComplete="off"
            {...register('email')}/>
          <p className={styles.error}>{errors.email?.message}</p>
          <p>password</p>
          <input
            type={'password'}
            autoComplete="off"
            {...register('password')}/>
          <p className={styles.error}>{errors.password?.message}</p>
          <div>
            <button type="submit">ログイン</button>
          </div>
        </form>

        <Link href={"/signup"}>
          <a className={styles.link}>新規登録</a>
        </Link>

      </main>

    </div>
  );
};

export default Home

export const getServerSideProps = async (context: NextPageContext) => {
  try {

    return {
      props: {
        data: "getServerSidePropsから受け取った"
      },
    };
    
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: "エラーが発生しました",
      },
    };
  }
};

type propsType = {
  data: string
}
