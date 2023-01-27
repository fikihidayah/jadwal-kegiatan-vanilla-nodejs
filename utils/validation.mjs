// Set error response
const setError = (res, validated) => {
  if (!validated.status) {
    res.statusCode = 403;
    res.write(
      JSON.stringify({
        status: 403,
        message: validated.message,
      })
    );
    res.end();
    return true;
  }
  return false;
};

export { setError };
