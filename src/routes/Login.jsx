import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormErrorBadge from "../components/FormErrorBadge";
import FormInput from "../components/FormInput";
import { UserContext } from "../context/UserProvider";
import { firebaseErrors } from "../utils/firebaseErrors";
import formValidations from "../utils/formValidations";
import Button from '../components/Button'

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, minLength, validateTrim } =
  formValidations();
  const {
    register,    
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = firebaseErrors(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <h1 className="text-center my-5 text-4xl">Login</h1>
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
        <Button type="submit" label="Login"/>        
      </form>
    </>
  );
};

export default Login;
