 class UserResponse {
    constructor(user) {
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.email = user.email;
    }
  }
  
export default UserResponse;