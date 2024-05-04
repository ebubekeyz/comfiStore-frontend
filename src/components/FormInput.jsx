const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control ">
      <label className="label capitalize">
        <span className="label-text">{label}</span>
      </label>

      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
