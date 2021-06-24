const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` 
router.get('/', (req, res) =>{
    Category.findAll({
        include: [{
            model: Product,
            attributes: ['id', 'product_name','price','stock','category)id']
        }]
    }).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

router.get('/:id', (req, res) => {
    Category.findOne({where: {id: req.params.id}}, {
        include: [{model: Product}]
    }).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    Category.create(req.body).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {where: {id: req.params.id}
    }).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

router.delete('/:id', (req, res) => {
    Category.destroy({where: {id: req.params.id}
    }).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

module.exports = router;