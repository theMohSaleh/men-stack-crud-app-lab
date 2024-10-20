const Cat = require('../models/cat');

const index = async (req, res) => {
    const allCats = await Cat.find();
    res.render("cats/index.ejs", { cats: allCats });
}

const newCat = (req, res) => {
    res.render("cats/new.ejs");
}

const getCat = async (req, res) => {
    const foundCat = await Cat.findById(req.params.CatId);
    res.render("cats/show.ejs", { Cat: foundCat });
}

const showCat = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Cat.create(req.body);
    res.redirect("/cats"); // redirect to index cats
}

const editCat = async (req, res) => {
    const foundCat = await Cat.findById(req.params.CatId);
    res.render('cats/edit.ejs', {
        cat: foundCat
    });
}

const updateCat = async (req, res) => {
    const formData = req.body;
    if (formData.isReadyToEat === 'on') {
        formData.isReadyToEat = true;
    } else {
        formData.isReadyToEat = false;
    }
    await Cat.findByIdAndUpdate(req.params.CatId, formData)

    res.redirect(`/cats/${req.params.CatId}`)
}

const deleteCat = async (req, res) => {
    await Cat.findByIdAndDelete(req.params.CatId);
    res.redirect("/cats");
}

module.exports = {
    index,
    new: newCat,
    get: getCat,
    show: showCat,
    edit: editCat,
    update: updateCat,
    delete: deleteCat,
}