
import Success from '../../Checkout';
import Order from '../../Checkout';
import Cart from '../cart';
import Counter from '../counter/counter';
import Login from '../Login';
import PaginatedProduct from '../paginatedproducts';
import Products from '../Products';
import EditProduct from '../Products/ProductsCard/Editproduct';
import ProtectedRoute from '../protectedRoute';
import Signup from '../Signup';
import TwoFactorAuth from '../Signup/twofactorauthentication';

const routes = [
    {
        path: '',
        element: <PaginatedProduct />,

    },
    {
        path: 'scan',
        element: <TwoFactorAuth />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        path: 'product/edit/:id',
        element: <EditProduct />
    },
    {
        path: "cart",
        element: <ProtectedRoute />,
        children: [
            { path: "getcartitems", element: <Cart /> },
            { path: 'checkout/success', element: <Success /> }
        ]
    },
    {
        path: "login",
        element: <Login />
    },
];
export default routes;
