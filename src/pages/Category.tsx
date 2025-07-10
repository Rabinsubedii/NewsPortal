import { useParams } from 'react-router-dom';

const Category = () => {
  const { type } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">Category: {type}</h1>
    </div>
  );
};

export default Category;
