import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(2, 'Trop Court!')
      .max(50, 'Trop Long!')
      .required('login requis'),
    lastName: Yup.string()
      .min(2, 'Trop Court!')
      .max(50, 'Trop Long!'), 
    email: Yup.string()
      .email('Email Invalid')
      .max(255)
      .required('Email requis'),
    password: Yup.string()
      .required('Mot de passe requis.') 
      .min(8, '8 chars minimum.')
      .matches(/[a-zA-Z0-9]/, 'Caractères alphanumériques requis'),
    password_confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de identiques requis')
      .required('Confirmation requise'),
    
  });