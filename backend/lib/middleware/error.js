export default (err, req, res) => {
  const status = err.status || 500;

  res.status(status);

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.send({
    status,
    message: err.message,
  });
};
