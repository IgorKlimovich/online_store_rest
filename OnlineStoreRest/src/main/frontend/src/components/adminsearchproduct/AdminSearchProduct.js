import classes from './AdminSearchProduct.module.css'

const AdminSearchProduct=()=>{
    return(
        <div>
            <details className={classes.detSearch}>
                <summary >Поиск</summary>
                <div className={classes.searchJs}>
                    <div>
                        <h2 >Поиск на странице, введите название
                            товара:</h2>
                    </div>
                    <div>
                        <input type="text" id="myInput" onKeyUp="search()"
                               className={classes.inputJs}/>
                    </div>
                </div>
            </details>
        </div>
    )
}
export default AdminSearchProduct;