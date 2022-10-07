const router = require('express').Router();
const services = require('./../../../services');

const apiCall = (req, res, next) => {
  if (req.query && req.query.q) {
    services.getProductsByQuery(req.query.q).then((result) => {
      res.data = result.data;
      next();
    });
  } else if (req.params && req.params.id) {
    const productPromise = services.getProductById(req.params.id);
    const productDescriptionPromise = services.getProductDescriptionById(req.params.id);
    Promise.all([productPromise, productDescriptionPromise]).then(
      (result) => {
        const itemCondition =  result[0].condition
        const mapping = {};
        const categoryId = result[0].data.category_id;
        services.getProductCategoryById(categoryId).then(
          (categories) => {

            res.data = Object.assign(
              {},
              result[0].data,
              result[1].data,
              { categories: categories && categories.data.path_from_root }
            );

            mapping.item = {
              id: res.data.id,
              title: res.data.title,
              price: {
                currency: res.data.currency_id,
                amount: res.data.price.toFixed(0),
                decimals: res.data.price % 1
              },
              picture: res.data.pictures.length && res.data.pictures[0],
              condition: itemCondition,
              free_shipping: res.data.shipping && res.data.shipping.free_shipping,
              sold_quantity: res.data.sold_quantity,
              description: res.data.plain_text,
            };
            res.json(mapResponseID(mapping,res.data.categories));
          }
        );

      }
    );
  }
};

const responseMiddleware = (req, res, next) => {
  const mapping = {};
  let categories ;
  categories = res.data.filters.find(
    filter => filter.id === "category"
  );
  mapping.items = res.data.results;
  mapping.categories = {};
  res.json(mapResponse(res.data.results,categories));
};

const mapItem = ({
  id,
  title,
  currency_id,
  price,
  thumbnail,
  condition,
  shipping,
  address,
  sold_quantity,
  category_id
}) => {
  return {
    id,
    title,
    condition,
    price: {
      currency: currency_id,
      amount: price
    },
    picture: thumbnail,
    free_shipping: shipping.free_shipping,
    address: address ? address.state_name : null,
    sold_quantity,
    category_id
  };
};

const mapResponse = (items, categories) => {
  return {
    author: {
      name: "Marlon",
      lastname: "Baldovino"
    },
    categories: categories.values[0].path_from_root,
    items: items.map(item => mapItem(item))
  };
};

const mapResponseID = (items, categories) => {
  return {
    author: {
      name: "Marlon",
      lastname: "Baldovino"
    },
    categories: categories,
    item: items.item
  };
};

// api/items/:id
router.get(
  '/:id?',
  apiCall
);

// api/items/
router.get(
  '/',
  apiCall,
  responseMiddleware
);


module.exports = router;
