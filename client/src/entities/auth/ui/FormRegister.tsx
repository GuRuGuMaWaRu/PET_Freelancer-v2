import { useLocation, useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  LOADING_STATE,
  ILocationState,
  IRegisterFormInputs,
} from "shared/types";
import { Field, SInput, SubmitButton } from "shared/ui";
import { useAuth } from "app";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const formSchema = yup.object().shape({
  name: yup.string().required("You must specify a name"),
  email: yup.string().required("You must specify an email"),
  password: yup
    .string()
    .required("You must specify a password")
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, getCharacterValidationError("number"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  console.log("location.state", location.state);
  const from = (location.state as ILocationState)?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(formSchema),
  });

  const submit: SubmitHandler<IRegisterFormInputs> = (data) => {
    auth.register(data, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field label="Name" error={errors.name}>
        <SInput
          type="text"
          id="name"
          autoComplete="name"
          autoFocus
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name")}
        ></SInput>
      </Field>
      <Field label="Email" error={errors.email}>
        <SInput
          type="email"
          id="email"
          autoComplete="username"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email")}
        ></SInput>
      </Field>
      <Field label="Password" error={errors.password}>
        <SInput
          type="password"
          id="password"
          autoComplete="current-password"
          aria-describedby="password-requirements"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
        ></SInput>
      </Field>
      <Field label="Repeat password" error={errors.confirmPassword}>
        <SInput
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          {...register("confirmPassword")}
        ></SInput>
      </Field>
      <SubmitButton isLoading={auth.loadingState === LOADING_STATE.LOADING}>
        Register
      </SubmitButton>
    </form>
  );
}

export { RegisterForm };
