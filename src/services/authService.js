export const authService = {
  login(email, password) {
    if (email === "test@test.com" && password === "123456") {
      return {
        success: true,
        token: "fake-jwt-token",
        user: { email }
      }
    }
    return {
      success: false,
      message: "Invalid email or password." 
    }
  }
}