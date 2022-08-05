import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import axios from 'axios'
import { setCookie } from 'nookies'
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'


import Header from "../components/header"


type Inputs = {
  name: string;
  password: string;
};

type loginResponse = {
  id: number,
  token: string
}

// バリデーション規則
const validate = yup.object({
  name: yup
      .string()
      .required('必須です')
      .matches(
          /^([a-zA-Z0-9]){4,8}$/,
          '半角英数字4〜8文字で入力してください',
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
      name: data.name,
      password: data.password,
    };

    const result =
      await axios.post('localhost:3001/users/login', reqObject);
    console.log('login result: ', result.data);
    const resultData: loginResponse = result.data;

    console.log(resultData.token);
    setCookie(undefined, 'AuthToken', resultData.token, {
      maxAge: 7 * 24 * 60 * 60,
    } );
    route.push('/foods');
    
    reset();

    } catch (err) {

    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className={styles.main}>
        <h1>ログインページ</h1>
        <h1>{props.data}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p>name</p>
        <input
          type={'text'}
          autoComplete="off"
          {...register('name')}/>
        <p>{errors.name?.message}</p>
        <p>password</p>
        <input
          type={'password'}
          autoComplete="off"
          {...register('password')}/>
        <p>{errors.password?.message}</p>
        <button type="submit">Submit</button>
      </form>
      
      </main>

    </div>
  )
}

export default Home

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    // トークンの取得
    
    // 表示するデータを取得する

    // 取得データをコンポーネントに渡す
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