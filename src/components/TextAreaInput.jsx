const TextAreaInput = ({ label, name, id, text }) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          id={id}
          className="textarea textarea-bordered h-32"
          name={name}
        >
          {text}
        </textarea>
        <div className="label"></div>
      </label>
    </>
  );
};
export default TextAreaInput;
