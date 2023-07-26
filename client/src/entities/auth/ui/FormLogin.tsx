/** @jsxImportSource @emotion/react */
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field, SInput, SubmitButton } from "shared/ui";
import { LOADING_STATE, ILocationState, ILoginFormInputs } from "shared/types";
import { useAuth } from "app";
import { useLocation, useNavigate } from "react-router";

const formSchema = yup.object().shape({
  email: yup.string().required("You must specify an email"),
  password: yup.string().required("You must specify a password"),
});

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = (location.state as ILocationState)?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(formSchema),
  });

  const formSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    auth.login(data, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <Field label="Email" error={errors.email}>
        <SInput
          type="email"
          id="email"
          autoComplete="username"
          autoFocus
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email")}
        ></SInput>
      </Field>
      <Field label="Password" error={errors.password}>
        <SInput
          type="password"
          id="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
        ></SInput>
      </Field>
      <SubmitButton isLoading={auth.loadingState === LOADING_STATE.LOADING}>
        Login
      </SubmitButton>
    </form>
  );
}

export { LoginForm };
