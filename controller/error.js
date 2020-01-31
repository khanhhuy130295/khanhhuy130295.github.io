exports.error404 = (req, res, next)=>{
    res.status(404).render('404Page',{pageTitle: 'Page Not Found'})
};