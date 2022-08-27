const CUSTOMERS = [
  {
    id: 1,
    firstName: "Kris",
    dateStart: "2020-01-29T17:18:01.123Z",
    dateEnd: "2020-01-29T17:18:01.123Z"
  },
  {
    id: 2,
    firstName: "Jack",
    dateStart: "2021-10-15T20:29:15.304Z",
    dateEnd: "2021-10-14T23:36:11.427Z",    
  },
  {
    id: 3,
    firstName: "Lynn",
    dateStart: "2022-01-14T19:51:08.145Z",
    dateEnd: "2021-12-05T19:51:46.153Z",    
  },
];

module.exports = [
  {
    id: "GET:customers",
    url: "/customers",
    method: "GET",
    variants: [
      {
        id: "*",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const page = +req.query.page || 1;
            const size = +req.query.pageSize || 5;
            const customers = Array.from(CUSTOMERS).reverse().filter((e,i)=> (page-1)*size <= i && i < Math.min(page*size, CUSTOMERS.length));
            res.status(200).send({customers, pagination: {page:page, pageSize: size, total: CUSTOMERS.length}});
          },
        },
      },
    ],
  },
  {
    id: "GET:customer",
    url: "/customers/:id",
    method: "GET",
    variants: [
      {
        id: "*",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const customerId = req.params.id;
            const customer = CUSTOMERS.find((customerData) => customerData.id === Number(customerId));            
            if (customer) {
              res.status(200).send(customer);
            } else {
              res.status(404).send({
                message: "User not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "POST:customer",
    url: "/customers",
    method: "POST",
    variants: [
      {
        id: "*",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            req.body.id = CUSTOMERS.length>0? 1 + CUSTOMERS.reduce((max,e)=> (max < e.id ? e.id : max) ,CUSTOMERS[0].id):1;
            CUSTOMERS.push(req.body);
            res.status(201).send();
          },
        },
      },
    ],
  },
  {
    id: "DELETE:customer",
    url: "/customers/:id",
    method: "DELETE",
    variants: [
      {
        id: "*",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const index = CUSTOMERS.findIndex((customer) => customer.id === +req.params.id);
            if (index < 0) {
              res.status(404).send({error:{message:'Customer not found'}});
            }
            if (index + 1 === 3){
              res.status(400).send({error:{message:'You cannot delete id = 3'}});  
              return;
            }
            CUSTOMERS.splice(index, 1);
            res.status(204).send();
          },
        },
      },
    ],
  },
];
