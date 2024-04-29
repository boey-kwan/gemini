

const isAuthenticated = (req, res, next) => {
  // TODO: Someone can set up a proper authentication system
  next();
};

export { isAuthenticated };