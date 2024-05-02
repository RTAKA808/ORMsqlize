const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData= await Category.findAll({
    include:[{model:Product}],
  });
  console.log(categoryData)
  res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData=await Category.findByPk(req.params.id,{
      include:[{model:Product}]
    });
    if(!categoryData){
      res.status(404).json({message:'No Category Found With That ID'});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const categoryData=await Category.create({
      category_name: req.body.category_name});
  res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData=await Category.update(req.body, {
      where:{
        id:req.params.id,
      },
    });
    if(!categoryData){
      res.status(404).json({message: 'No Category With This ID'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData=await Category.destroy({
      where:{
        id: req.params.id,
      }
    });
    if(!categoryData){
      res.status(404).json({message:'No Category Found With This ID'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
