import Publisher from '../Connexion/Publisher';
import VueSimpleAlert from 'vue-simple-alert';

class UserAdmin extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.VUE_APP_ADMIN_JWT
    });
  }

  async getUsers(ids = null, properties = null, filters = null) {
    const response = await this.get(this.formatEndPoint('users', ids, properties, filters));
    return response;
  }

  async getUser(id, properties = null) {
    const response = await this.get(this.formatEndPoint('users', id, properties));
    return response;
  }

  async checkEmailIfExist(email) {
    this.getUsers(null, null, { 'email': email }).then(response => {
      response = response.shift();
      if (response) {
        this.generateTokenPassword(response.id);
      }
      else {
        VueSimpleAlert.fire({
          title: 'Erreur',
          text: 'Cet email n\'existe pas !',
          type: 'error',
        })
      }
    })
  }

  async generateTokenPassword(id) {
    await this.patch(`${'users'}/${id}/generate-token-password`, {}).then((response) => {
      if (response) {
        VueSimpleAlert.fire({
          title: 'Email envoyé !',
          text: 'Un email vous a été envoyé pour réinitialiser votre mot de passe',
          type: 'success',
        }).then(() => {
          window.location.href = '/signin';
        })
      }
      else {
        VueSimpleAlert.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue, veuillez réessayer',
          type: 'error',
        })
      }
    }).catch(() => {
      VueSimpleAlert.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue, veuillez réessayer',
        type: 'error',
      })
    })
  }

  async patchUser(id, data) {
    const response = await this.patch(this.formatEndPoint('users', id), data);
    return response;
  }

  async setTokenResetPasswordToNull(id) {
    const response = await this.patch(`${'users'}/${id}/set-token-reset-password-to-null`, {});
    return response;
  }
}

export { UserAdmin };
