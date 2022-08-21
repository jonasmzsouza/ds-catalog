import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Category } from 'types/category';
import { requestBackend } from 'utils/requests';
import './styles.css';

type ProductFilterData = {
  name: String;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const onSubmit = (formData: ProductFilterData) => {
    console.log('ENVIOU', formData);
  };

  return (
    <div className="base-card product-filter-card">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="input-group product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            name="name"
            className="form-control base-input"
            placeholder="Nome do produto"
          />
          <button className="input-group-text">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  placeholder="Categoria"
                  classNamePrefix="product-form-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary">
            Limpar <span>Filtro</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
