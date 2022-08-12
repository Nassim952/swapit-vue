import * as Yup from 'yup';

export const EditProfileSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Trop Court! Minimum 2 caractères')
      .max(50, 'Trop Long! Maximum 50 caractères')
      .required('Nom d\'utilisateur requis'),
  });