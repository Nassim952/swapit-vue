  <template>
    <div class="notification-container">
    <h3>Notifications
      <i class="material-icons dp48 right">settings</i>
    </h3>

    <input class="checkbox" type="checkbox" id="size_1" value="small" checked />
    <label class="notification new" for="size_1"><em>1</em> new <a href="">guest account(s)</a> have been created.<i class="material-icons dp48 right">clear</i></label>

    <input class="checkbox" type="checkbox" id="size_2" value="small" checked />
    <label class="notification new" for="size_2"><em>3</em> new <a href="">lead(s)</a> are available in the system.<i class="material-icons dp48 right">clear</i></label>
    
    <input class="checkbox" type="checkbox" id="size_3" value="small" checked />
    <label class="notification" for="size_3"><em>5</em> new <a href="">task(s)</a>.<i class="material-icons dp48 right">clear</i></label>

    <input class="checkbox" type="checkbox" id="size_4" value="small" checked />
    <label class="notification" for="size_4"><em>9</em> new <a href="">calendar event(s)</a> are scheduled for today.<i class="material-icons dp48 right">clear</i></label>

    <input class="checkbox" type="checkbox" id="size_5" value="small" checked />
    <label class="notification" for="size_5"><em>1</em> blog post <a href="">comment(s)</a> need approval.<i class="material-icons dp48 right">clear</i></label>  
  </div>
</template>

<script>
    export default {
        name: "Error",
        props:{
            variant: {
                type: String,
                default: 'white',
                validator: (val) => ["white", "black",].includes(val),
                },
            value:{
            type: String,
            default:' ',
            },
        },
    };
</script>

<style scoped>;
 .error {
	position:relative;
	margin-bottom:25px;
    color: #FE5F55;
}
</style>