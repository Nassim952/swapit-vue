<template>
   <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2 v-if="!userData" class="font-semibold text-lg mr-auto">Create User</h2>
							<h2 v-else class="font-semibold text-lg mr-auto">Update	 User</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<form @submit.prevent="saveUser" class="mt-5">
				<div class="form">
						<div class="md:flex flex-row md:space-x-4 w-full text-xs">
							<div class="mb-3 space-y-2 w-full text-xs">
								<label  class="font-semibold text-gray-600 py-2">Username <abbr title="required">*</abbr></label>
								<input v-model="userData.username" placeholder="Frist Name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text" name="integration[shop_name]" id="integration_shop_name">
								<p class="text-red text-xs hidden">Please fill out this field.</p>
							</div>
						</div>
						<div class="mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600 py-2">Your email<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<div class="flex">
									<span class=" flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
										<span class="material-icons"></span>
                                   </span>
								</div>
								<input v-model="userData.email" type="email" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow" placeholder="abcxy@abc.com" required>
							</div>
							</div>
							<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">role</label>
									<select v-model="userData.roles" class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "   >
											<option value="ROLE_ADMIN">Admin</option>
											<option value="ROLE_USER">Utilisateur</option>
										
									</select>
									<p class="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
								</div>
								</div>
								
								<p class="text-xs text-red-500 text-right my-3">Les champs obligatoires sont marquer  <abbr title="Required field">*</abbr></p>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button @click="this.$router.push('/')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel </button>
									<button  type="submit" v-if='!userData' class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Create</button>
									<button v-else class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Update</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
 import {User} from '../../../lib/Services/User';
export default {
	name:'UserForm',
	props:{
		userId:{
			required:false,
			type:String
		},
	},
	data(){
		return{
			userData:{
				username:'',
				email:'',
				roles:[],
			},
		}
	},
	   created() {
            this.getUser();
        },
	methods:{
		submitForm(e){
			e.preventDefault()
			if(this.userId){
				this.updateUser()
			}else{
				this.createUser()
			}
		},
		createUser() {
			const data = {
				name:this.userData.name,
				email:this.userData.email,
			}
			const provider = new User();
			provider.postUser(data)
			.then((response)=>{
				console.log(response)
			})
			.catch(err=>{
				console.log(err)
			})
		},
		updateUser(){
			const data = {
				name:this.userData.name,
				email:this.userData.email,
			}
			const provider = new User();
			provider.patchUser(this.userData.id ,data)
			.then(response=>{
								console.log(response)

				// this.$router.push('/')
			})
			.catch(err=>{
				console.log(err)
			})
		},
		async getUser() {
			var provider = new User()
			provider.getUser(this.$route.params.id)
			.then((response)=>{
				this.userData = response
			})
			.catch(err=>{
				console.log(err)
			})
		},
		saveUser(){
			console.log(this.userData)
			if(this.userData){
				this.updateUser()
			}else{
				this.createUser()
			}
		},
	}
}
</script>

<style scoped>


</style>
