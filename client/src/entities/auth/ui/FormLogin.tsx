/** @jsxImportSource @emotion/react */
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field, SInput, SubmitButton } from "shared/ui";
import { ILoginFormInputs } from "shared/types";
import { useFormNotifications } from "shared/lib";

const formSchema = yup.object().shape({
  email: yup.string().required("You must specify an email"),
  password: yup.string().required("You must specify a password"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(formSchema),
  });
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useFormNotifications(fetcher.data, isLoading);

  const formSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    fetcher.submit(formData, {
      action: "/auth/login",
      method: "post",
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
      <SubmitButton isLoading={isLoading}>Login</SubmitButton>
    </form>
  );
};

export { LoginForm };
