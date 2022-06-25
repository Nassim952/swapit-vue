<template>
  <Formik :validator="validator" v-slot="{handleSubmit, errors, with_label}" :with_label="true">
    <label v-if="with_label"><span>Email</span></label>
    <Field name="email" type="email"> </Field>
    <small v-if="errors.email"> {{errors.email}} </small>
    <label v-if="with_label"><span>Objet</span></label>
    <Field name="objet" type="text" placeholder="Objet"> </Field>
    <small v-if="errors.objet"> {{errors.objet}} </small>
    <label v-if="with_label"><span>Description</span></label>
    <Field name="description" as="textArea"> </Field>
    <small v-if="errors.description"> {{errors.description}} </small>

    <Button :onClick='handleSubmit' type="submit" tiltle="Contacter"> </Button>
  </Formik>
</template>

<script>
  import Button from "../Buttons/Button.vue";
  import Formik from "../../lib/Formik.vue";
  import Field from "../../lib/Field.vue";
  export default {
    components: {
      Formik,
      Field,
      Button
    },props: {
      with_label: Boolean,
    },
    name: "Contact",
  };
</script>

<style scoped>
</style>