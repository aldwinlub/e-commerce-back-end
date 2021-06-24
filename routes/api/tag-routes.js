const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// the /api/tag endpoint

// finds all tags
router.get('/', (req, res) => {
    Tag.findAll({
        include: 
            {
                model: Product,
                attributes: ['product_name', 'price', 'stock', 'category_id']
            }    
    }).then((tag) => {
        res.status(200).json(tag)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

// finds a tag by its id
router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['product_name', 'price', 'stock', 'category_id']
        }
    }).then((tag) => {
        res.status(200).json(tag)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

// creates a new tag
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    }).then((tag) => {
        res.status(200).json(tag)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

// updates a tag's name byt its id
router.put('/:id', (req, res) => {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    }).then((tag) => {
        res.status(200).json(tag)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

// delets a tag by its id
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {id: req.params.id}
    }).then((tag) => {
        res.status(200).json(tag)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

module.exports = router;