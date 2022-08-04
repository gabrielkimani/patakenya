const express = require("express");
const router = express.Router();
const Ad = require("../models/adsModel");
const { isAuth } = require("../utils/jwtAuth.js");
const User = require("../models/userModel");

//insert message
router.post("/view-contact/:id", isAuth, async (req, res) => {
  const user = req.user._id;
  const ad = await Ad.findOne({ _id: req.params.id });
  const owner = ad.user;
  const username = await User.findOne({ _id: user });
  const viewed = await ad.contactViews.filter((x) => x.viewedBy === user);

  try {
    if (ad && user !== owner) {
      if (viewed && viewed.length === 0) {

        const savedAd = await ad.save({
          contactViews: ad.contactViews.push({
            msg: `${username.username} viewed Your contact`,
            date: new Date(),
            viewedBy: user,
          }),
        });

        if (savedAd) {
          res.send(savedAd);
        }
      }else{
        res.status(400).send("Already viewed");
      }
    }
  } catch (error) {
    res.send({ message: error });
  }
});

//whatsapp view
router.post("/view-whatsapp/:id", isAuth, async (req, res) => {
  const user = req.user._id;
  const ad = await Ad.findOne({ _id: req.params.id });
  const owner = ad.user;
  const username = await User.findOne({ _id: user });
  const viewed = await ad.whatsAppViews?.filter((x) => x.viewedBy === user);

  try {
    if (ad && user !== owner) {
      if (viewed && viewed.length === 0) {
        console.log(viewed);

        const savedAd = await ad.save({
          whatsAppViews: ad.whatsAppViews.push({
            msg: `${username.username} requested a chat on WhatsApp`,
            date: new Date(),
            viewedBy: user,
          }),
        });

        if (savedAd) {
          res.send(savedAd);
        }
      } else {
        res.status(400).send("Already viewed");
      }
    }
  } catch (error) {
    res.send({ message: error });
  }
});

//post a new adName
router.post("/new-ad", isAuth, async (req, res) => {
  const { adName, location, description, price, condition, images, category } =
    req.body;
  const newAd = new Ad({
    user: req.user._id,
    adName,
    location,
    description,
    price,
    condition,
    images,
    category,
  });

  try {
    const savedAd = await newAd.save();
    res.send(savedAd);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get all ads
router.get("/all-ads", async (req, res) => {
  try {
    const adName = req.query.adName || "";
    const order = req.query.order || "";
    const location = req.query.location || "";
    const category = req.query.category || "";
    const condition = req.query.condition || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const nameFilter = adName
      ? { adName: { $regex: adName, $options: "i" } }
      : {};
    const locationFilter = location ? { location } : {};
    const conditionFilter = condition ? { condition } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const ads = await Ad.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...locationFilter,
      ...conditionFilter,
    });

    if (!ads) return res.status(404).send({ message: "No ads found" });
    else return res.send(ads);
  } catch (error) {
    res.send(error);
  }
});

//get a single Ad
router.get("/ad/:id", async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id });
    if (!ad) return res.status(404).send({ message: "Ad not found" });
    res.send(ad);
  } catch (error) {
    res.send(error);
  }
});


router.delete('/:id', isAuth, async (req, res) => {
	const deletedAd = Ad.findById(req.params.id);
	if (deletedAd) {
		await deletedAd.deleteOne();
		res.send({ message: 'Ad Deleted' });
	} else {
		res.send({ message: 'Error deleting the Ad' });
	}
});

module.exports = router;
