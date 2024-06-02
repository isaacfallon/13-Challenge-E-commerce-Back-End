const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET request to obtain all tags while including associated Products
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET request to obtain one tag by its `id` value while including its associated products
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'There is no tag found with that ID.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST request to create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT request to update a tag by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
        { 
          tag_name: req.body.tag_name
        },
        { 
          where: { 
            id: req.params.id 
          } 
        }
    );

    res.json({ message: "Tag successfully updated." });

} catch (error) {
    res.status(400).json(error);
}
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'There is no tag found with that ID.' });
      return;
    }

    res.status(200).json({ message: 'Tag successfully deleted.'} );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
