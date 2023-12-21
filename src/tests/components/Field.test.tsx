import { fireEvent, render } from '@testing-library/react';
import Field from '#/components/Field';
import { vi } from 'vitest';

describe('Componente Field', () => {
  const events = {
    handleChange(
      evt:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) {
      return evt;
    }
  };

  test('Debe renderizarse sin error', () => {
    const wrapper = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  test('Se muestra el label correctamente', () => {
    const { getByLabelText } = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput={null}
      />
    );
    expect(getByLabelText(/Name/i)).toBeInTheDocument();
  });

  test('Debe mostrarse el mensaje de error', () => {
    const wrapper = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput="Error message"
      />
    );

    expect(wrapper.getByText(/Error message/i)).toBeInTheDocument();
  });

  test('Debe llamar al evento handleChange al momento de ingresar un valor al campo', () => {
    const handleChangeSpy = vi.spyOn(events, 'handleChange');
    const wrapper = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput={null}
      />
    );
    expect(handleChangeSpy).not.toHaveBeenCalled();
    fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'John' } });
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  test('Debe mostrar el valor inicial correctamente', () => {
    const { getByTestId } = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value="John"
        classBox=""
        handleChange={events.handleChange}
        errorInput={null}
      />
    );
    expect(getByTestId('name').nodeValue).toBe('John');
  });

  test('Debe aplicar la clase de error al campo de entrada cuando hay un error', () => {
    const { getByTestId } = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput="Error message"
      />
    );
    expect(getByTestId('name')).toHaveClass('border-2 border-rose-500 text-rose-500');
  });

  test('No debe aplicar la clase de error al campo de entrada cuando no hay un error', () => {
    const { getByTestId } = render(
      <Field
        type="text"
        label="Name"
        name="name"
        value=""
        classBox=""
        handleChange={events.handleChange}
        errorInput={null}
      />
    );
    expect(getByTestId('name')).not.toHaveClass('border-2 border-rose-500 text-rose-500');
  });
});
