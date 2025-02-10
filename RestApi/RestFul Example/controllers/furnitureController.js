const router = require('express').Router();
const  userModel  = require('../models/User');
const qs = require('querystring');

const furnitureService = require('../services/furnitureService');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const query = qs.parse(req.query.where);
    const ownerId = query.ownerId?.replace(/"/g, '');
    const furnitures = await furnitureService.getAll(ownerId);

    res.json(furnitures);
});

router.get('/:furnitureId', async (req, res) => {
    const furniture = await furnitureService.getOne(req.params.furnitureId);
    res.json(furniture);
});

router.put('/:furnitureId', async (req, res) => {
    const furnitureData = req.body;
    const furniture = await furnitureService.update(req.params.furnitureId, furnitureData);

    res.json(furniture);
});

router.delete('/:furnitureId', async (req, res) => {
    await furnitureService.delete(req.params.furnitureId);

    res.json({ok: true});
});

router.post('/', authMiddleware, async (req, res, next) => {
    const furnitureData = req.body;
    const { _id: userId } = req.user;

    try {
        const furniture = await furnitureService.create({ ...furnitureData, _ownerId: userId });

        const updateResult = await userModel.updateOne(
            { _id: userId },
            { $push: { furnitures: furniture._id } }
        );

        res.json(furniture);
    } catch (err) {
        console.error("Error:", err); 
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;
