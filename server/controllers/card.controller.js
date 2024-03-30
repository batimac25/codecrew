
import Card from '../models/card.model.js';
import errorHandler from './error.controller.js';
import extend from 'lodash/extend.js'

const create = async (req, res) => {
    const card = new Card(req.body);
    try {
        await card.save();
        return res.status(200).json({ message: "Card successfully created!" });
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const update = async (req, res) => {
    try {
        let card = await Card.findById(req.params.cardId);
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.createdBy.toString() !== req.params.userId.toString()) {
            return res.status(403).json({ error: "User is not authorized" });
        }
        card = extend(card, req.body);
        await card.save();
        res.json(card);
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const remove = async (req, res) => {
    try {
        let card = await Card.findById(req.params.cardId);
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.createdBy.toString() !== req.params.userId.toString()) {
            return res.status(403).json({ error: "User is not authorized" });
        }
        let deletedCard = await card.deleteOne()
        res.json(deletedCard);
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const listByUserId = async (req, res) => {
    try {
        let cards = await Card.find({ createdBy: req.params.userId })
                              .populate('createdBy', '_id name')
                              .exec();
        res.json(cards);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, update, remove , listByUserId };
