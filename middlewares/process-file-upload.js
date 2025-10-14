export const processFileUpload = (err, req, res, next) => {
    if(req.file){
        const subFolder = req.file.destination.split('/').pop();
        req.fileRelativePath = `${subFolder}/${req.file.filename}`
    }
    next()
}