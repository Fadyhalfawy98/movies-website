const FormInput = ({ name, label, value, error, onChange, placeHolder }) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input id={name}
                   value={value}
                   type="text"
                   name={name}
                   onChange={onChange}
                   className="form-control"
                   placeholder={placeHolder}/>
            {error && <div
                className="alert alert-danger"
                role="alert">
                {error}
            </div>
            }
        </div>
    );
}

export default FormInput;