const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
  try {
    const [items] = await Item.getAllItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.getAllItemsToChoose = async (req, res) => {
//   try {
//     const items = await Item.getAllItemsToChoose();
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.addItem = async (req, res) => {
  await Item.createItem(req.body);
  res.status(201).json({ message: 'Item added' });
};

exports.deleteItem = async (req, res) => {
  await Item.deleteItem(req.params.id);
  res.json({ message: 'Item deleted' });
};

// exports.getItemsId = async (req, res) => {
//   try {
//     const catId = req.params.id;
//     const itemIds = await Item.getItemId(catId);
//     res.json(itemIds);
//   } catch (error) {
//     console.error('Error fetching item IDs:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };