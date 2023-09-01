const express = require("express");
const path = require("path");

const adminAnimalsRoutes = require('./routes/adminAnimals.routes.js');
const adminCategoriesRoutes = require('./routes/adminCategories.routes.js');
const adminOrdersReviewRoutes = require('./routes/adminOrdersReview.routes.js');
const adminProductsRoutes = require('./routes/adminProducts.routes.js');
const adminiUsersRoutes = require('./routes/adminUsers.routes.js');
const clientCartRoutes = require('./routes/clientCart.routes.js');
const clientCartItemRoutes = require('./routes/clientCartItems.routes.js');
const clientOrderItemRoutes = require('./routes/clientOrderItems.routes.js');
const clientOrdersRoutes = require('./routes/clientOrders.routes.js');
const clientUsersRoutes = require('./routes/clientUsers.routes.js');

const app = express();
const PORT = process.env.PORT || 3001;

//el middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "/../client/dist")));

//my routes
app.use("/admin/animals", adminAnimalsRoutes);
app.use("/admin/categories", adminCategoriesRoutes);
app.use("/admin/ordersReview", adminOrdersReviewRoutes);
app.use("/admin/products", adminProductsRoutes);
app.use("/admin/users", adminiUsersRoutes);
app.use("/client/cartItem", clientCartItemRoutes);
app.use("/client/cart", clientCartRoutes);
app.use("/client/orderItem", clientOrderItemRoutes);
app.use("/client/orders", clientOrdersRoutes);
app.use("/client/users", clientUsersRoutes);       

//handles el erro middlewares
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!`);
});