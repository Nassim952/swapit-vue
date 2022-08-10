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
        this.channelId = this.$route.params.id;
    }
  },
  methods: {
   async getChannel() {
   this.provider.getChannel(this.$route.params.id).then((response) => {
      if (response) {
        this.channel = response;
        console.log(this.channel);
        return response;
      }
    }).catch(function(error) {
      console.log(error);
    });
    // console.log(this.channel)
  },
    
  },
};
</script>

<style scoped>

</style>