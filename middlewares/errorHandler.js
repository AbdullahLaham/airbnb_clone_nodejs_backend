export const errorHandler = async (req, res, next) => {
 let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
 res.statusCode(statusCode);
 res.json({
    message: err?.message,
    stack: err?.stack,
 })

} 
export const notFound = async (err, req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next();
}