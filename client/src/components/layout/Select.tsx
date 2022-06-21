import { Options } from "../../typings/utils.type";

type SelectProps = {
  label: string;
  value: string;
  options: Options[];
  onChange: (...param: any) => void;
};

const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <div className="select-wrapper">
      <label htmlFor="defaultSelect">{label}</label>
      <select id="defaultSelect" value={value} onChange={onChange}>
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
