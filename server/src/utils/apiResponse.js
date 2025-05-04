export const successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res, message, statusCode = 500, err ={}) => {
    return res.status(statusCode).json({
        success: false,
        message,
        err: {
            email: err?.email || '',
            userName: err?.userName || '',
            password: err?.password || '',
            avatar: err?.avatar || ''
        }
    });
};

export const validationErrorResponse = (res, errors, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message: "Validation Error",
        errors,
    });
};
