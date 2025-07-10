import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ query: '' }}
      validationSchema={Yup.object({
        query: Yup.string()
          .required('Search cannot be empty')
          .matches(/^[a-zA-Z0-9\s]+$/, 'Only alphanumeric characters allowed'),
      })}
      onSubmit={(values) => {
        navigate(`/search?q=${encodeURIComponent(values.query)}`);
      }}
    >
      <Form className="flex gap-2 items-start mt-4">
        <div className="flex flex-col">
          <Field
            name="query"
            type="text"
            placeholder="Search news..."
            className="border border-gray-300 rounded px-4 py-2 w-64"
          />
          <ErrorMessage
            name="query"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
