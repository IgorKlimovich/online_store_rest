import Admin from "./components/admin/Admin";
import {
    ABOUT_ROUTE, ADMIN_CATEGORIES_ROUTE, ADMIN_CATEGORY_ROUTE, ADMIN_PRODUCT_ROUTE, ADMIN_PRODUCTS_ROUTE,
    ADMIN_ROUTE, ADMIN_USER_ROUTE, ADMIN_USERS_ROUTE,
    CONTACT_ROUTE, LOGIN_ROUTE,
    ORDER_ROUTE, PRODUCT_ROUTE,
    PRODUCTS_ROUTE, PROFILE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Orders from "./components/orders/Orders";
import Contacts from "./components/contacts/Contacts";
import About from "./components/about/About";
import ProductPage from "./components/product/ProductPage";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Search from "./components/search/Search";
import ProductCategories from "./components/category/ProductCategories";
import AdminProducts from "./components/adminproducts/AdminProducts";
import AdminCategories from "./components/admincategories/AdminCategories";
import AdminCategory from "./components/admincategory/AdminCategory";
import AdminProduct from "./components/adminproduct/AdminProduct";
import Products from "./components/products/Products";
import AdminUsers from "./components/adminusers/AdminUsers";
import AdminUser from "./components/adminuser/AdminUser.";
import Profile from "./components/profile/Profile";
import Order from "./components/order/Order";


export const authRoutes=[
    {
        path: PROFILE,
        Component:Profile
    },
    // {
    //     path: PROFILE+'/:id',
    //     Component:Profile
    // },
    {
        path: ADMIN_ROUTE,
        Component:Admin
    },
    {
        path: ORDER_ROUTE,
        Component:Orders
    },
    {
        path: ORDER_ROUTE+'/:id',
        Component:Order
    },
    {
        path: ADMIN_PRODUCTS_ROUTE,
        Component:AdminProducts
    },
    {
        path: ADMIN_USERS_ROUTE,
        Component:AdminUsers
    },
    {
        path: ADMIN_USER_ROUTE+'/:id',
        Component:AdminUser
    },
    {
        path: ADMIN_PRODUCT_ROUTE +'/:id',
        Component:AdminProduct
    }
]

export const publicRoutes=[
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: CONTACT_ROUTE,
        Component: Contacts
    },
    {
        path: SHOP_ROUTE,
        Component: Search
    },
    {
        path: PRODUCT_ROUTE+'/:id',
        Component:ProductPage
    },
    {
        path: PRODUCTS_ROUTE,
        Component:ProductCategories
    },
    {
        path: PRODUCTS_ROUTE+'/:id',
        Component:Products
    },
    {
      path: ADMIN_CATEGORIES_ROUTE,
      Component:AdminCategories
    },
    {
        path: ADMIN_CATEGORY_ROUTE+'/:id',
        Component:AdminCategory
    },
    {
        path: REGISTRATION_ROUTE,
        Component:Registration
    },
    {
        path: LOGIN_ROUTE,
        Component:Login
    }

]