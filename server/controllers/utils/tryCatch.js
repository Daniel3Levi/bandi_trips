const tryCatch = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.json({
        success: false,
        message: 'Error: User registertion faild, try again later.',
      });
    }
  };
};

export default tryCatch;
