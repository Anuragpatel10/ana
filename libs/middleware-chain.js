/* eslint consistent-return:0 */

const next = (middlewares, index, req, res) => {
  const middleware = middlewares[index];

  return (err) => {
    if (err) return res.send(err);
    if (res.statusCode === 200 && !res.finished) {
      if (!middleware) return;

      try {
        const result = middleware.handler.call(
          middleware.context,
          req,
          res,
          next(middlewares, index + 1, req, res)
        );
        if (result instanceof Promise) {
          // async support
          result.catch(res.send);
        }
      } catch (err) {
        res.send(err);
      }
    } else if (!res.finished) {
      res.end();
    }
  };
};

module.exports = next;
