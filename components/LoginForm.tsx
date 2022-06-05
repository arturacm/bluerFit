import { useState } from "react";
import type { FormEvent, ChangeEventHandler } from "react";
import { cpfMask } from "../utils/cpfMask";

const intialFormState = { cpf: "", year: "" };

function LoginForm() {
  const [form, setForm] = useState(intialFormState);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(form);
    setForm((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "cpf"
          ? cpfMask(event.target.value)
          : event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-4 p-2 rounded-md border-2 max-w-xl m-auto my-5"
    >
      <input
        type="text"
        className="border-2 rounded-md p-1"
        placeholder="cpf"
        name="cpf"
        onChange={handleChange}
        value={form.cpf}
      />
      <input
        type="number"
        min={1900}
        className="border-2 rounded-md p-1"
        placeholder="Ano de Nascimento"
        name="year"
        onChange={handleChange}
        value={form.year}
      />
      <input
        type="submit"
        className="cursor-pointer border-2 rounded-md p-1 bg-white"
      />
    </form>
  );
}

export default LoginForm;
