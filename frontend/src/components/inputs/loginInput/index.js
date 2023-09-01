import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";
//the end of import

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  //const desktopView with a query of 850px width
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  //start return
  return (
    <div className="input_wrap">
      {/* the next div will happen if the component is not in bottom */}
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          styles={{ transfrom: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        field={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {/* the next div will happen if the component is in bottom */}
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          styles={{ transfrom: "translateY(1px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView && "63%"}` }}
        ></i>
      )}
    </div>
  );
}
