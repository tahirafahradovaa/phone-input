import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PHONE_REGEX = new RegExp(
  /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim
);

const Phone = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleValidate = (phoneNumber) => {
    if (PHONE_REGEX.test(phoneNumber)) {
      errors["phoneNumber"] = null;
    } else {
      errors["phoneNumber"] = "Invalid phone number. Please try again.";
    }
    return PHONE_REGEX.test(phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
      <div>
        <label htmlFor="phone-input">Phone Number</label>
        <Controller
          name="phone-input"
          control={control}
          rules={{
            validate: (value) => handleValidate(value),
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput value={value} onChange={onChange} id="phone-input" />
          )}
        />
        {!!errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
        )}
      </div>
    </form>
  );
};
export default Phone;
