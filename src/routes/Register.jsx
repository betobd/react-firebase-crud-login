import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { firebaseErrors } from "../utils/firebaseErrors";
import FormErrorBadge from "../components/FormErrorBadge";
import formValidations from "../utils/formValidations";
import FormInput from "../components/FormInput";
import Button from '../components/Button'


const Register = () => {
  const { registerUser } = useContext(UserContext);
  const { required, minLength, validateTrim, validateEquals } =
    formValidations();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
    } catch (error) {
      console.log(error.code);
      const { code, message } = firebaseErrors(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <h1 className="text-center my-5 text-4xl"> Register </h1>
      <FormErrorBadge error={errors.firebase} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="email@otf.com"
          {...register("email", {
            required,
          })}
          label="Email"
          error={errors.email}
        />
        <FormErrorBadge error={errors.email} />
        <FormInput
          type="password"
          placeholder="password"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label="Password"
          error={errors.password}
        />
        <FormErrorBadge error={errors.password} />
        <FormInput
          type="password"
          placeholder="Confirm password"
          {...register("reppassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repeat Password"
          error={errors.reppassword}
        />
        <FormErrorBadge error={errors.reppassword} />
        <Button type="submit" label="Register"/>         
      </form>
    </>
  );
};

export default Register;
