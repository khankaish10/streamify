const errorHandler = (err, req, res, next) => {
    console.error("Error:", err); // Log the error for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
      err
    });
  };
  
  export default errorHandler;