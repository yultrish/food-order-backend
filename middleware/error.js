const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: err.message 
      }
    });
  };
  
  export default handleError;
  