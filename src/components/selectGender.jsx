import React from "react";

const SelectGender = ({ value1, value2, value3, value4, label1, label2, label3, label4, label, id }) => {
    return(
        <div className="form-group">
            <label className="form-choose-label"
                   htmlFor={ id }>{label}</label>

            <select className="custom-select" required>
                <option value={value1}>{label1}</option>
                <option value={value2}>{label2}</option>
                <option value={value3}>{label3}</option>
                <option value={value4}>{label4}</option>
            </select>
        </div>
    );
}

export default SelectGender;