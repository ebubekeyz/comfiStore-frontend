const FormInput = ({ label, name, type, defaultValue, size, id, onChange }) => {
  return (
    <div className="form-control ">
      <label className="label capitalize">
        <span className="label-text">{label}</span>
      </label>

      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        type={type}
        onChange={onChange}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
