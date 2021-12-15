const FormInput = ({ name, label, value, onChange, placeHolder }) => {
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
        </div>
    );
}

export default FormInput;