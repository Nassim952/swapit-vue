import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email Invalid')
      .max(255)
      .required('Email requis'),
    password: Yup.string()
      .required('Mot de passe requis.') 
      .min(8, '8 chars minimum.')
      .matches(/[a-zA-Z0-9]/, 'les caractères doivent être alphanumériques'),
  });