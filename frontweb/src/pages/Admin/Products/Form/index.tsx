import './styles.css';

const Form = () => {
  return (
    <div className="base-card product-form-card">
      <h2 className="product-form-title">Dados do Produto</h2>
      <form action="">
        <div className="row">
          <div className="col-lg-6">
            <div className="product-form-input-container">
              <input
                type="text"
                name="name"
                className="form-control base-input"
                placeholder="Nome do Produto"
              />
            </div>
            <div className="product-form-input-container">
              <input
                type="text"
                name="price"
                className="form-control base-input"
                placeholder="Preço"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-form-textarea-container">
              <textarea
                name="description"
                className="form-control base-input"
                placeholder="Descrição"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col product-form-buttons-container">
            <button className="btn btn-outline-danger">CANCELAR</button>
            <button className="btn btn-primary text-white">SALVAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
