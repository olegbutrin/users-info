import { useFormik } from "formik";
import { useState } from "react";
import { TUser } from "../../types";

import "./UserDetails.scss";

interface IUserDetailsComponent {
  title: string;
  user: TUser;
  onSave: (user: TUser) => void;
  onCancel: () => void;
}

interface IUserField {
  label: string;
  id: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: any;
}

interface ISubmitBtn {
  className: string;
  value: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const UserField = ({ label, id, type, value, onChange }: IUserField) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea id={id} name={id} onChange={onChange} value={value} />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          onChange={onChange}
          value={value}
          required
        />
      )}
    </>
  );
};

const SubmitButton = ({ className, value, type, onClick }: ISubmitBtn) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {value}
    </button>
  );
};

const UserDetails = ({
  title,
  user,
  onSave,
  onCancel,
}: IUserDetailsComponent) => {
  const [formEditable, setFormEditable] = useState<boolean>(false);

  const formEditableHandler = () => {
    setFormEditable(!formEditable);
  };

  const formik = useFormik({
    initialValues: { ...user },
    onSubmit: (values) => {
      onSave(values as TUser);
    },
  });

  const submitBtnProps: ISubmitBtn = formEditable
    ? {
        className: "btn-success",
        value: "Отправить",
        type: "submit",
        onClick: () => {},
      }
    : {
        className: "btn-inactive",
        value: "Отменить",
        type: "button",
        onClick: onCancel,
      };

  return (
    <div className="UserDetails">
      <div className="rowFlex">
        <h3>{title}</h3>
        <button className="btn" onClick={formEditableHandler}>
          Редактировать
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <fieldset className="formDiv" disabled={!formEditable}>
          <UserField
            key={"name"}
            label="Name"
            id={"name"}
            type={"text"}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <UserField
            key={"username"}
            label="User Name"
            id={"username"}
            type={"text"}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <UserField
            key={"email"}
            label="E-Mail"
            id={"email"}
            type={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <UserField
            key={"street"}
            label="Street"
            id={"[address.street]"}
            type={"text"}
            value={formik.values.address.street}
            onChange={formik.handleChange}
          />
          <UserField
            key={"city"}
            label="City"
            id={"[address.city]"}
            type={"text"}
            value={formik.values.address.city}
            onChange={formik.handleChange}
          />
          <UserField
            key={"zipcode"}
            label="Zip code"
            id={"[address.zipcode]"}
            type={"text"}
            value={formik.values.address.zipcode}
            onChange={formik.handleChange}
          />
          <UserField
            key={"phone"}
            label="Phone"
            id={"phone"}
            type={"text"}
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <UserField
            key={"website"}
            label="Website"
            id={"website"}
            type={"text"}
            value={formik.values.website}
            onChange={formik.handleChange}
          />
          <UserField
            key={"comment"}
            label="Website"
            id={"comment"}
            type={"textarea"}
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
        </fieldset>
        <div className="rowFlex" style={{ justifyContent: "flex-end" }}>
          {formEditable && (
            <button
              className="btn"
              style={{ marginRight: "10px" }}
              type={"button"}
              onClick={() => {
                formik.resetForm();
              }}
            >
              Восстановить
            </button>
          )}
          <SubmitButton {...submitBtnProps} />
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
