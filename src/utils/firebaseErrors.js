export const firebaseErrors = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "User is already registered",
      };

    case "aut/invalid-email":
      return {
        code: "email",
        message: "Invalid email format",
      };

    case "auth/missing-email":
      return {
        code: "email",
        message: "Missing email address",
      };

    case "auth/wrong-password":
      return {
        code: "password",
        message: "Invalid Password",
      };

    case "auth/user-not-found":
      return {
        code: "email",
        message: "User is not registered",
      };

    default:
      return {
        code: "email",
        message: "Server error",
      };
  }
};
