import React from "react";
import Select, { components, MenuPlacement } from "react-select";

import { B2, B6 } from "@/common/typography";

import { InputProps } from "./Input";

export type OptionType = {
  value: string;
  label: string;
};

export interface InputDropdownProps extends InputProps {
  className?: string;
  required?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  optionList: OptionType[];
  menuPlacement?: MenuPlacement;
  valueSelected: OptionType | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChangeSelect: (option: string | OptionType | null, name: string) => void;
}

const InputDropdown = ({
  name,
  label,
  value,
  onBlur,
  required,
  className,
  optionList,
  placeholder,
  isClearable,
  isSearchable,
  menuPlacement,
  onChangeSelect,
  error,
}: InputDropdownProps) => {
  const { ValueContainer } = components;

  const IconDropdown = ({ children, ...props }: any) => {
    return (
      <ValueContainer {...props}>
        <>{children}</>
      </ValueContainer>
    );
  };

  return (
    <div className={`relative flex w-full flex-col ${className}`}>
      <label>
        {label && (
          <B2
            className="mb-1 select-none"
            color="text-[#01205A]"
            fontWeight="font-bold"
          >
            {label}
          </B2>
        )}
      </label>
      <Select
        className={`w-full "my-2"`}
        components={{ ValueContainer: IconDropdown }}
        isClearable={isClearable}
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "Sin opciones" : "No hay resultados"
        }
        options={optionList}
        placeholder={placeholder}
        required={required}
        name={name}
        onBlur={onBlur}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "40px",
            border: "1px solid #D3CCCC",
            borderRadius: "5px",
            fontSize: "1rem",
            backgroundColor: "white",
            boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1);",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0px 8px",
            color: "#999999",
          }),
          clearIndicator: (base) => ({
            ...base,
            padding: "0 8px",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: "0 8px",
          }),
          placeholder: (base) => ({ ...base, color: "#999999" }),
          option: (base) => ({
            ...base,
            fontSize: "1rem",
            color: "#999999",
          }),
        }}
        value={
          value ? optionList.find((option) => option.label === value) : value
        }
        onChange={(option) => onChangeSelect(option, name)}
      />
      {!!error && <B6 color="text-red-400" margin="mt-1">{`${error}`}</B6>}
    </div>
  );
};

export default InputDropdown;
