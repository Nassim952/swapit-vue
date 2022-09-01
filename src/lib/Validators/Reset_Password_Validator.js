import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Mot de passe requis.')
    .min(8, '8 chars minimum.')
    .matches(/[a-zA-Z0-9]/, 'Caractères alphanumériques requis'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'MDP non identique')
    .required('Confirmation requise'),
});