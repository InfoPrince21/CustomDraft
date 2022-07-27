import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';


const withFormik = Formik({
  mapPropsToValues: () => ({ color: "" }),
  validationSchema: Yup.object().shape({
    color: Yup.string().required("Color is required!")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
});

const MyForm = props => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: "block" }}>
        Color
      </label>
      <select
        name="colorss"
        value={values.color}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: "block" }}
      >
        <option value="" label="Select a color">
          Select a color{" "}
        </option>
        <option value="red" label="red">
          {" "}
          red
        </option>
        <option value="blue" label="blue">
          blue
        </option>
        >
        <option value="green" label="green">
          green
        </option>
      </select>
      {errors.color && <div className="input-feedback">{errors.color}</div>}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

    </form>
  );
};

const BasicForm = withFormik(MyForm);

// Helper styles for demo


const DatePicker = () => (
  <div className="app">
    <h1>
      Basic{" "}
      <a
        href="https://github.com/jaredpalmer/formik"
        target="_blank"
        rel="noopener"
      >
        Formik
      </a>{" "}
      Demo
    </h1>

    <BasicForm />
  </div>
);

export default DatePicker;
