<template>
	<div class="user-form-container">
		<div
			class="user-form z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
			<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
				<div class="grid  gap-8 grid-cols-1">
					<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2 v-if="!userData" class="font-semibold text-lg mr-auto">Creer un Utilisateur</h2>
							<h2 v-else class="font-semibold text-lg mr-auto">Modifier un utilisateur</h2>
						</div>
						<form @submit.prevent="saveUser" class="mt-5">
							<div class="form">
								<div class="md:flex flex-row md:space-x-4 w-full text-xs">
									<div class="mb-3 space-y-2 w-full text-xs">
										<label class="label-user-form py-2">Id utilisateur <abbr
												title="required">*</abbr></label>
										<div class="flex flex-wrap items-stretch w-full mb-4 relative">
											<input v-model="userData.username" placeholder="Frist Name"
												class="input-user-form" required="required" type="text"
												name="integration[shop_name]" id="integration_shop_name">
										</div>
									</div>
								</div>
								<div class="mb-3 space-y-2 w-full text-xs">
									<label class="label-user-form py-2">Email utilisateur<abbr
											title="required">*</abbr></label>
									<div class="flex flex-wrap items-stretch w-full mb-4 relative">
										<input v-model="userData.email" type="email" class="input-user-form"
											placeholder="abcxy@abc.com" required>
									</div>
								</div>
								<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
									<div class="w-full flex flex-col mb-3">
										<label class="label-user-form py-2">Role utilisateur</label>
										<div class="flex flex-wrap items-stretch w-full mb-4 relative">
											<select @change="addRole($event)" class="input-user-form">
												<option value='ROLE_ADMIN'>Admin</option>
												<option value='ROLE_USER'>Utilisateur</option>
											</select>
										</div>
									</div>
									<div class="role-container" v-for="(role, key) in userData.roles" :key="role + key">
										<p class="role-user" id="error">{{ role }}</p>
										<button @click="removeRole(key)" class="remove-role-btn">
											<img src="../../../assets/images/bin.png" height="10" width="10">
										</button>
									</div>
								</div>

								<p class="info-champs">Les champs obligatoires sont marquer <abbr
										title="Required field">*</abbr></p>
								<div class="btn-form-container">
									<router-link to="/admin">
										<button class="btn-form">Annuler</button>
									</router-link>
									<button type="submit" v-if='!userData' class="btn-form">Créer</button>
									<button v-else class="btn-form">Modifier</button>
								</div>
								<button @click="showExhanges = !showExchanges" v-if='!showExchanges'
									class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Mes
									echanges</button>
							</div>
						</form>
						<button @click="updateShowExchanges" v-if='!showExchanges'
							class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Mes
							echanges</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showExchanges" class="exchange-form">
			<ExchangeForm />
		</div>
	</div>
</template>

<script>
import ExchangeForm from "./exchangeForm.vue";
import { User } from '../../../lib/Services/User';
export default {
	name: 'UserForm',
	components: {
		ExchangeForm
	},
	data() {
		return {
			userData: {
				username: '',
				email: '',
				roles: [],
			},
			showExchanges: true,
		}
	},
	created() {
		this.getUser();
	},
	methods: {
		submitForm(e) {
			e.preventDefault()
			if (this.userId) {
				this.updateUser()
			} else {
				this.createUser()
			}
		},
		createUser() {
			const data = {
				username: this.userData.username,
				email: this.userData.email,
				roles: this.userData.roles,
				id: this.userData.id
			}
			const provider = new User();
			provider.postUser(data)
				.then(() => {
				})
				.catch(() => {
					this.$fire({
						title: 'Erreur',
						text: 'Une erreur est survenue',
						type: 'error'
					})
				})
		},
		updateUser() {
			const data = {
				username: this.userData.username,
				email: this.userData.email,
				roles: this.userData.roles,
				id: this.userData.id
			}
			const provider = new User();
			provider.patchUser(this.userData.id, data)
				.then(() => {
				})
				.catch(() => {
					this.$fire({
						title: 'Erreur',
						text: 'Une erreur est survenue',
						type: 'error'
					})
				})
		},
		async getUser() {
			var provider = new User()
			provider.getUser(this.$route.params.id)
				.then((response) => {
					delete response.password;
					this.userData = response
				})
				.catch(() => {
					this.$fire({
						title: 'Erreur',
						text: 'Une erreur est survenue',
						type: 'error'
					})
				})
		},
		saveUser() {
			if (this.userData) {
				this.updateUser()
			} else {
				this.createUser()
			}
		},
		addRole(e) {
			if (e.target.value) {
				if (this.userData.roles.indexOf(e.target.value) == -1) {
					this.userData.roles.push(e.target.value)
				}
			}
		},
		removeRole(key) {
			this.userData.roles.splice(key, 1)
		},

		updateShowExchanges() {
			this.showExchanges = !this.showExchanges
		}
	}
}
</script>

<style scoped>
.user-form-container {
	display: flex;
	justify-content: space-between;
	margin-bottom: 50px;
}

.exchange-form {
	box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
	background-color: white;
	width: 70%;
	margin-right: 20px;
}

.user-form {
	width: 30%;
}

.input-user-form {
	padding: 0 1rem;
	border: 1px solid #e2e2e2;
	border-radius: 10px;
	transition: all ease-in 0.1s;
}

.input-user-form:focus {
	outline-color: #FF5D12;
	transform: translateX(5px);
}

.label-user-form {
	font-size: 12px;
}

.role-user {
	border-radius: 10px;
	padding: 10px;
	font-size: 12px;
	background-color: #e2e2e2;
	color: white;
}

.role-container {
	display: flex;
	justify-content: space-between;
}

.remove-role-btn {
	background-color: rgb(252, 87, 87);
	border: none;
	padding: 5px 10px;
	height: 35px;
	transition: all 0.3s ease;
	border-radius: 10px;
}

.remove-role-btn:hover {
	background-color: rgb(173, 0, 0);
}

.info-champs {
	font-size: 10px;
}

.btn-form {
	background-color: rgb(0, 0, 0);
	border: none;
	padding: 5px 10px;
	height: 35px;
	transition: all 0.3s ease;
	border-radius: 10px;
	color: white;
}

.btn-form:hover {
	background-color: rgba(0, 0, 0, 0.385);
}

.btn-form-container {
	display: flex;
	justify-content: space-between;
}
</style>
