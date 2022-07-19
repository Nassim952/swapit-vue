import * as Yup from 'yup';

export const RequestPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email Invalid')
      .max(255)
      .required('Email requis')
  });