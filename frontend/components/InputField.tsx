import { forwardRef } from "react";

interface Props {
  type: string;
  label: string;
  fullwidth: boolean;
  disabled: boolean;
  defaultValue: string | number | readonly string[] | undefined;
  onchange: Function | undefined;
}

const InputField = forwardRef((props: Props, ref: any) => {
  const _onChange = (
    value: string | number | readonly string[] | undefined
  ) => {
    if (props.onchange) {
      props.onchange(value);
    }
  };
  return (
    <div
      className={`flex flex-col gap-2 ${
        props.fullwidth ? "w-full" : "md:w-2/3"
      }`}
    >
      <span className="text-slate-600 font-light text-sm">{props.label}</span>
      <input
        type={props.type}
        ref={ref}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        onChange={(e) => _onChange(e.target.value)}
        className={`outline-none text-slate-600 rounded-xl px-4 py-2 border border-slate-300 focus:bg-slate-100 ${
          props.disabled ? "bg-slate-200" : "bg-slate-50"
        }`}
      />
    </div>
  );
});

export default InputField;
