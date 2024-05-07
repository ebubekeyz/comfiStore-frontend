const TextAreaInput = ({ label, name }) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-32"
          name={name}
        ></textarea>
        <div className="label"></div>
      </label>
    </>
  );
};
export default TextAreaInput;
