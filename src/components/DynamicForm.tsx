import { useForm } from "react-hook-form";
import { userFormSchema } from "../config/userFormSchema";
import type { User } from "../types/user";
import { demoUsers } from "../data/demoUsers";

interface Props {
  onSubmit: (data: User) => void;
  defaultValues?: User;
  title: string;
}

function DynamicForm({ onSubmit, defaultValues, title }: Props) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues,
  });

  const fillDemoData = () => {
    const random = demoUsers[Math.floor(Math.random() * demoUsers.length)];

    setValue("firstName", random.firstName);
    setValue("lastName", random.lastName);
    setValue("phone", random.phone);
    setValue("email", random.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-3">{title}</h5>

      {userFormSchema.map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">{field.label}</label>

          <input
            type={field.type}
            className="form-control form-control-lg"
            {...register(field.name as keyof User, {
              required: field.required ? `${field.label} is required` : false,
              pattern:
                field.type === "email"
                  ? {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  }
                  : field.name === "phone"
                    ? {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be number and of 10 digits",
                    }
                    : undefined,
            })}
          />

          {errors[field.name as keyof User] && (
            <p className="text-danger small">
              {errors[field.name as keyof User]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary me-2 ms-2"
        onClick={fillDemoData}
      >
        Demo Fill
      </button>

    </form>
  );
}

export default DynamicForm;
