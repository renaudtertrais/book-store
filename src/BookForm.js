import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';

function BookForm({ values: defaultValues, onSave }) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (field, isNumber) => e =>
    setValues({ ...values, [field]: isNumber ? parseFloat(e.target.value, 10) : e.target.value });

  const renderInput = (label, key, inputProps = {}) => (
    <Form.Item label={label}>
      <Input
        id={`BookForm__${key}`}
        type="text"
        value={values[key]}
        onChange={handleChange(key)}
        placeholder={label}
        {...inputProps}
      />
    </Form.Item>
  );

  return (
    <div className="BookForm">
      <Form
        labelCol={{
          sm: { span: 6 },
        }}
        wrapperCol={{
          sm: { span: 6 },
        }}
      >
        {renderInput('Title', 'title')}
        {renderInput('Author', 'author')}
        {renderInput('Price', 'price', {
          type: 'number',
          min: 0,
          step: 0.01,
          onChange: handleChange('price', true),
        })}
        <Form.Item
          wrapperCol={{
            sm: { span: 6, offset: 6 },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onSave(values)}
            disabled={['title', 'author', 'price'].some(key => !values[key])}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

BookForm.defaultProps = {
  values: {},
};

export default BookForm;
