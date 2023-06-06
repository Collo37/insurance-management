const Owner = require("../models/owners");

exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find().populate("vehicles").sort({ name: 1 });

    res.status(200).json({
      status: "Ok",
      data: owners,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: "Error",
      error,
    });
  }
};

exports.addNewOwner = async (req, res) => {
  try {
    const newOwner = new Owner(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ message: "Enter all required fields" });
    await newOwner.save();

    res.status(201).json({
      status: "Created",
      data: newOwner,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error,
    });
  }
};

exports.getAllOwnerIds = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json({
      mesage: "Success",
      data: owners.map((owner) => owner._id),
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error,
    });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const owner = await Owner.find({ _id: ownerId });

    const updates = req.body;

    if (!owner) return res.status(404).json({ message: "Owner not found" });

    await Owner.updateOne(
      { _id: ownerId },
      {
        $set: {
          ...updates,
        },
      }
    );

    res.json({ message: "Successfully updated user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
