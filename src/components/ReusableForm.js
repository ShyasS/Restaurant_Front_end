/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ReusableTable.css';

const ReusableForm = ({ onSubmit, formFields, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // eslint-disable-next-line no-unused-vars
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <Form.Group key={field.name} controlId={field.name}>
          <Form.Label>{field.label}</Form.Label>

          {field.type === 'select' ? (
            <Form.Control
              as="select"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
            >
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          ) : (
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
              style={
                field.type === 'checkbox'
                  ? { borderRadius: '50%', width: '20px', height: '20px' }
                  : {}
              }
            />
          )}
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReusableForm;

// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const ReusableForm = ({ onSubmit, formFields, initialValues }) => {
//   const [formData, setFormData] = useState(initialValues || {});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {formFields.map((field) => (
//         <Form.Group key={field.name} controlId={field.name}>
//           <Form.Label>{field.label}</Form.Label>
//           <Form.Control
//             type={field.type}
//             placeholder={field.placeholder}
//             name={field.name}
//             value={formData[field.name] || ''}
//             onChange={handleInputChange}
//             required={field.required}
//           />
//         </Form.Group>
//       ))}
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default ReusableForm;
