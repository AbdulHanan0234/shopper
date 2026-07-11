import { ShopContext } from './ShopContextCreate'
import all_product from '../Components/Assets/all_product'

const ShopContextProvider = (props) => {
    const contextValue = { all_product }
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;