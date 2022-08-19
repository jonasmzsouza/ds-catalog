import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'utils/requests';
import './styles.css';

const Form = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl:
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
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
