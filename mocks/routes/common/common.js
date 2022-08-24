module.exports = [
  {
    id: "before",
    url: "*",
    method: ["GET", "POST", "PUT", "PATCH"],
    variants: [
      {
        id: "*",
        handler: "middleware",
        options: {
          middleware: (_req, res, next, core) => {
            res.set("x-Content-Type", "application/json");
            core.logger.info("Custom header added by route variant middleware");
            next();
          },
        },
      },
      {
        id: "disabled",
        disabled: true,
      },
    ],
  },
];
