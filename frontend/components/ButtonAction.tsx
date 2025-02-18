interface Props {
  name: string;
  activeValue: Boolean;
  action: Function;
}

const ButtonAction = (props: Props) => {
  return (
    <div
      onClick={() => props.action()}
      className={`flex items-center px-8 py-2 text-sm cursor-pointer rounded-3xl whitespace-nowrap ${
        !props.activeValue
          ? "text-white bg-slate-900"
          : "bg-slate-50 text-slate-500 border"
      }`}
    >
      {props.name}
    </div>
  );
};
export default ButtonAction;
