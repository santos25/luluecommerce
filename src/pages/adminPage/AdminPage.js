import React from 'react';
import ProductHomePage from '../../components/Admin-components/products/ProductHomePage.component';
// import CreateProduct from '../../components/Admin-components/products/CreateProduct.component';
import { Route, Switch, useRouteMatch } from 'react-router-dom';


const AdminPage = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.url}>
                <ProductHomePage />
            </Route>
        </Switch>
    )
}

export default AdminPage;
