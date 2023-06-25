const Dealership = require('../models/dealership.model');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require('../libs/cloudinary/cloudinary.config');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const jwt = require('jsonwebtoken')

module.exports.getDealerships = async (req, res) => {
  try {
    const dealerships = await Dealership.find({});
    res.status(200).json({ success: true, dealerships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


module.exports.createDealership = async (req, res) => {
  console.log(req.body)
  try {
    const geoData = await geocoder.forwardGeocode({
      query: req.body.location,
      limit: 1,
    }).send();
    const token  = req.headers.authorization;
    const tokenValue = token.replace("Bearer ", "");
    const decodedToken = jwt.decode(tokenValue)
    console.log(decodedToken)
    const userId = decodedToken.id;
  
    const dealership = new Dealership(req.body);
    dealership.geometry = geoData.body.features[0].geometry;
    dealership.images = req.files.map((elem) => ({
      url: elem.path,
      filename: elem.filename,
    }));
    dealership.owner = userId;
    await dealership.save();
    res.status(201).json({ success: true, dealership });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.showDealership = async (req, res) => {
  try {
    const dealership = await Dealership.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }
    res.status(200).json({ success: true, dealership });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}



  module.exports.updateDealership = async (req, res) => {
    try {
      const { id } = req.params;
      const dealership = await Dealership.findById(id);
      
      if (!dealership) {
        return res.status(404).json({ error: 'Dealership not found' });
      }
      
      const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1,
      }).send();
      
      dealership.location = req.body.location;
      dealership.geometry = geoData.body.features[0].geometry;
      
      const imgs = req.files.map((elem) => ({
        url: elem.path,
        filename: elem.filename,
      }));
      dealership.images.push(...imgs);
      
      await dealership.save();
      
      if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
          await cloudinary.uploader.destroy(filename);
        }
        await dealership.updateOne({
          $pull: { images: { filename: { $in: req.body.deleteImages } } },
        });
      }
      
      res.status(200).json({ success: true, dealership });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };


module.exports.deleteDealership = async (req, res) => {
  try {
    const { id } = req.params;
    await Dealership.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong" });
}
};
