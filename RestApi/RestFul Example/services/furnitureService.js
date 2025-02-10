const Furniture = require('../models/Furniture');

exports.getAll = (ownerId) => {
    let query = Furniture.find();
    if(ownerId) {
        query = query.find({owner: ownerId});
    }
    return Furniture.find(query);
}

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.update = (furnitureId, furnitureData) => Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);