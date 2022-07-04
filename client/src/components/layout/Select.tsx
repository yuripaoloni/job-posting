import { Options } from "../../typings/utils.type";

type SelectProps = {
  label: string;
  value: string;
  options: Options[];
  onChange: (...param: any) => void;
  disabled?: boolean
};

const Select = ({ label, value, options, onChange, disabled }: SelectProps) => {
  return (
    <div className="select-wrapper">
      <label htmlFor="defaultSelect">{label}</label>
      <select id="defaultSelect" value={value} onChange={onChange} disabled={disabled ? disabled : false}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
