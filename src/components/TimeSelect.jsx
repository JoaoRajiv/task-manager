import InputLabel from "./InputLabel";

export default function TimeSelect(props) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Período do dia</InputLabel>
      <select
        id="time"
        className="focus:border-brand-blue rounded-lg border border-solid border-brand-light-gray px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary"
        {...props}
      >
        <option value="" default>
          Selecione o período
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
}
