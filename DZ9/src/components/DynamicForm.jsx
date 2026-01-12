import { useForm } from "react-hook-form";
import styles from "./DynamicForm.module.css";

export default function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstField: "",
      secondField: "",
    },
    mode: "onBlur",
  });

  const firstValue = watch("firstField");

  // Условие показа второго поля:
  // пример: показываем, если в первом поле минимум 3 символа
  const shouldShowSecond = (firstValue ?? "").trim().length >= 3;

  const onSubmit = (data) => {
    // здесь ваша логика отправки
    // для проверки — выводим в консоль
    console.log("Form submit:", data);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="firstField">
            First field
          </label>

          <input
            id="firstField"
            className={styles.input}
            placeholder="Минимум 3 символа"
            {...register("firstField", {
              required: "Поле обязательно",
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
          />

          {errors.firstField && (
            <p className={styles.error}>{errors.firstField.message}</p>
          )}
        </div>

        {shouldShowSecond && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="secondField">
              Second field
            </label>

            <input
              id="secondField"
              className={styles.input}
              placeholder="Например, email"
              {...register("secondField", {
                required: "Второе поле обязательно (раз появилось)",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Введите корректный email",
                },
              })}
            />

            {errors.secondField && (
              <p className={styles.error}>{errors.secondField.message}</p>
            )}
          </div>
        )}

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
