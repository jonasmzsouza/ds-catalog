import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend } from 'utils/requests';
import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing
        ? formData.imgUrl
        : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      history.push('/admin/products');
    });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="base-card product-form-card">
      <h2 className="product-form-title">Dados do Produto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="product-form-input-container">
              <input
                {...register('name', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                name="name"
                className={`form-control base-input ${
                  errors.name ? 'is-invalid' : ''
                }`}
                placeholder="Nome do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>

            <div className="product-form-input-container">
              <Select
                options={selectCategories}
                classNamePrefix="product-form-select"
                isMulti
                getOptionLabel={(category: Category) => category.name}
                getOptionValue={(category: Category) => String(category.id)}
              />
            </div>

            <div className="product-form-input-container">
              <input
                {...register('price', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                name="price"
                className={`form-control base-input ${
                  errors.price ? 'is-invalid' : ''
                }`}
                placeholder="Preço"
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-form-textarea-container">
              <textarea
                {...register('description', {
                  required: 'Campo obrigatório',
                })}
                name="description"
                className={`form-control base-input ${
                  errors.description ? 'is-invalid' : ''
                }`}
                placeholder="Descrição"
              />
              <div className="invalid-feedback d-block">
                {errors.description?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col product-form-buttons-container">
            <button className="btn btn-outline-danger" onClick={handleCancel}>
              CANCELAR
            </button>
            <button className="btn btn-primary text-white">SALVAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
