import * as Yup from 'yup';

export const RequestContact = Yup.object().shape({
  objet: Yup.string()
    .min(2, 'Trop Court! Minimum 2 caractères')
    .max(50, 'Trop Long! Maximum 50 caractères'),
  description: Yup.string()
    .min(2, 'Trop Court! Minimum 2 caractères')
    .max(500, 'Trop Long! Maximum 500 caractères'),
});