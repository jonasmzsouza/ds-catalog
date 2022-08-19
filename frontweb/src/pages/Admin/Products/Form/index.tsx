import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
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
    control,
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
      price: String(formData.price).replace(',', '.'),
      imgUrl: formData.imgUrl.toLowerCase(),
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
              <Controller
                name="categories"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectCategories}
                    classNamePrefix="product-form-select"
                    className={`${errors.categories ? 'is-invalid' : ''}`}
                    isMulti
                    getOptionLabel={(category: Category) => category.name}
                    getOptionValue={(category: Category) => String(category.id)}
                  />
                )}
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>

            <div className="product-form-input-container">
              <Controller
                name="price"
                rules={{ required: 'Campo obrigatório' }}
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    placeholder="Preço"
                    className={`form-control base-input ${
                      errors.price ? 'is-invalid' : ''
                    }`}
                    disableGroupSeparators={true}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>

            <div className="product-form-input-container">
              <input
                {...register('imgUrl', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value:
                      /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/gi,
                    message: 'Deve ser uma URL válida',
                  },
                })}
                type="text"
                name="imgUrl"
                className={`form-control base-input ${
                  errors.imgUrl ? 'is-invalid' : ''
                }`}
                placeholder="Url da imagem do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.imgUrl?.message}
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
