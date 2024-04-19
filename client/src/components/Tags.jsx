export const Section = ({ children = "Section", id, className }) => (
  <section id={id} className={`${className} px-3 py-2 lg:px-16`}>
    {children}
  </section>
);
Section.propTypes;

export const H1 = ({ children = "H1", className }) => (
  <h1 className={`${className} capitalize text-2xl font-semibold leading-loose`}>{children}</h1>
);
H1.propTypes;

export const H2 = ({ children = "H3", className }) => (
  <h2 className={`${className} capitalize text-xl font-medium leading-relaxed`}>{children}</h2>
);
H2.propTypes;

export const H3 = ({ children = "H3", className }) => (
  <h3 className={`${className} capitalize text-lg font-medium leading-relaxed`}>{children}</h3>
);
H3.propTypes;

export const Label = ({ children = "Label", id, className }) => (
  <label htmlFor={id} className={`${className} capitalize font-medium leading-relaxed`}>
    {children}
  </label>
);
Label.propTypes;

export const Input = ({
  className,
  type = "text",
  placeholder = "input",
  autoFocus,
  autoComplete = "off",
  id,
  value,
  onChange,
}) => (
  <input
    type={type}
    id={id}
    name={id}
    value={value}
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    onChange={onChange}
    placeholder={placeholder}
    className={`${className} border rounded p-2 w-full mb-2 focus:outline-cyan-200 bg-inherit`}
  />
);
Input.propTypes;

export const Textarea = ({ className, id, value, onChange, placeholder = "textarea" }) => (
  <textarea
    id={id}
    name={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${className} border rounded p-2 w-full mb-2 bg-inherit`}
  />
);
Textarea.propTypes;

export const Select = ({ children, className, id, value, onChange }) => {
  return (
    <select id={id} name={id} value={value} onChange={onChange} className={`${className} border rounded p-2 w-full mb-2`}>
      {children}
    </select>
  );
};
Select.propTypes;
