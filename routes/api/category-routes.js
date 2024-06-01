const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET request to obtain all categories while including associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET request to obtain one category by its `id` value while including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There is no category found with that ID.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST request to create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT request to update a category by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
        { 
          category_name: req.body.category_name 
        },
        { 
          where: { 
            id: req.params.id 
          } 
        }
    );

    res.json({ message: "Category successfully updated." });

} catch (error) {
    res.status(400).json(error);
}
});

// DELETE request to delete a category by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There is no category found with that ID.' });
      return;
    }

    res.status(200).json({ message: 'Category successfully deleted.'} );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
