const formValidations = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    minLength: {
      value: 6,
      message: "Min 6 characters",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "Spaces are not accepted";
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "Passwords don't match",
      };
    },
  };
};

export default formValidations;
