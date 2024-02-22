const uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  req.body.filename = req.file.filename;
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.body.filename,
  });
};

export default uploadProductImage ;
