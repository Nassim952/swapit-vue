<template>
    <div>
        <Chat :channelId="channelId"/>
    </div>
</template>

<script>
import Chat from "../components/Chat/Game_chat.vue";
import { Channel } from "../lib/Services/Channel";
export default {
    components: {
        Chat,
    },
    data: () => ({
      provider: new Channel(),
      channelId: null,
    }),
    created() {
    if (this.$route.params?.id){
        this.channelId = atob(this.$route.params.id);
    }
  },
  methods: {
   async getChannel() {
   this.provider.getChannel(this.$route.params.id).then((response) => {
      if (response) {
        this.channel = response;
        return response;
      }
    })
  }
  },
};
</script>

<style scoped>

</style>