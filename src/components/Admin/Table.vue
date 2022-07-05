<template>

  <table class="table table-striped" >
    <thead>
      <tr>
        <th v-for="(title, key) in titles" :key="title+key">
          {{title}}
        </th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data,key) in datas" :key="data.id+key">
        <td v-for="(value,key) in data" :key="value+key"> {{value}}</td>
        <td>
          <!-- <button type='button' class="buttonRead"  @click="readData" > Voir </button> -->
          <button type='button' class="buttonEdit" @click="$emit('edit', data)">Modifier</button>
          <button type='button' class="buttonDelete" @click="$emit('delete', data)">Suprimer</button>
          <!-- <button type='button' class="buttonDelete" @click="deleteData">Suprimer</button> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>

  export default {
    name: "Table",
    props: {
      datas: {
        type: Array,
      },
      titles: {
        type: Array,
      }
    },
    data() {
      return {}
    },
    inject: ['deleteData'],
  };
</script>
<style scoped>
  .buttonEdit {
    background-color: #FFBF00;
    color: #fff;
    border: none;

    margin-right: 5px;
    padding: 3px;
  }

  .buttonDelete {
    background-color: #D8214E;
    color: #fff;
    border: none;


    padding: 3px;
  }

  th {
    background-color: #6C809A;
    color: #fff;
  }
</style>