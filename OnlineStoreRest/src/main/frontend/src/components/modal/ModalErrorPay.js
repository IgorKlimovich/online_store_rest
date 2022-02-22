
const ModalErrorPay = ({visible, setVisible}) => {
  const rootClasses = ['modal'];
  if (visible === true) {
    rootClasses.push('active');
  }
  return(
      <div id="openModalErrorNoMoney" className={rootClasses.join(' ')}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" >Ошибка платежа</h3>
              <a onClick={() => setVisible(false)}
                 title="Close" id="noMoney" className="close">×</a>
            </div>
            <div className="modal-body">
              <div>
                <h3 >Операция не выполнена</h3>
              </div>
              <div>
                <button className="modal-btn-yes no-money-btn" type="submit"
                        onClick={() => setVisible(false)}     >Хорошо
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ModalErrorPay