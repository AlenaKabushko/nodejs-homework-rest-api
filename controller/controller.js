const { Contacts } = require('../models/schemaMongoose');

const getListContacts = async (req, res, next) => { 
    const user = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = page === 1 ? 0 : limit * (page - 1)

    const contacts = await Contacts.find({
        owner: user._id
    })
        .skip(Number(skip))
        .limit(Number(limit))
    
    return res.json(contacts)    
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params
    const user = req.user
    const contact = await Contacts.findById(
        contactId,
        'name phone number email favorite',
        {owner: user._id}
    )
    return res.json(contact);
}

const removeContact = async (req, res, next) => {
    const { contactId } = req.params
    await Contacts.findByIdAndRemove(contactId)

    return res.json({message: `Contact with ID ${contactId} deleted successfully`})
}

const addContact = async (req, res, next) => {
    const { name, email, phone, favorite } = req.query
    const user = req.user
    const contact = await Contacts.create({ name, email, phone, favorite, owner: user._id})

    return res.status(201).json(contact)
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params
    const contact = await Contacts.findByIdAndUpdate(contactId, req.query, { new: true })

    return res.status(201).json(contact)
}

const addContactToFav = async (req, res, next) => {
    const { contactId } = req.params

    const contact = await Contacts.findByIdAndUpdate(contactId, {favorite: req.query.favorite}, { new: true})
    return res.status(200).json(contact)
}

module.exports = {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    addContactToFav
}
