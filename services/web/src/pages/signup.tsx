
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
};

type loginResponse = {
  id: number,
  email: string
}

// バリデーション規則
const validate = yup.object({
  email: yup
      .string()
      .required('必須です')
      .matches(
          /^([a-zA-Z0-9@.]){4,256}$/,
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

const Signup = () => {
  const route = useRouter()

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

      const result = await axios.post('http://localhost:3001/api/v1/users', reqObject);
      console.log('login result: ', result.data);
      const resultData: loginResponse = result.data;
      route.push('/');

      reset();

    } catch (err) {
      console.log(err)
    }

  };

  return (
    <>
      <h1>サインアップページ</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>name</p>
        <input
          type={'text'}
          autoComplete="off"
          {...register('email')}/>
        <p>{errors.email?.message}</p>
        <p>password</p>
        <input
          type={'password'}
          autoComplete="off"
          {...register('password')}/>
        <p>{errors.password?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Signup