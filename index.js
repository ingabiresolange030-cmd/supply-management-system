const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

const session = require('express-session');

const mysql2 = require('mysql2');
const bcrypt= require('bcrypt');
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'scms'
});

conn.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log('Database Connected Well');
    }
});

/* ==========================
   GET ALL SUPPLIERS
========================== */
app.get('/supplier', (req, res) => {
    const sql = 'SELECT * FROM supplier';

    conn.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

/* ==========================
   ADD SUPPLIER
========================== */
app.post('/supplier', (req, res) => {

    const {
        supplierCode,
        supplierName,
        telephone,
        address,
        email
    } = req.body;

    const sql = `
        INSERT INTO supplier
        (supplierCode, supplierName, telephone, address, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    conn.query(
        sql,
        [supplierCode, supplierName, telephone, address, email],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Supplier added successfully'
            });
        }
    );
});

/* ==========================
   UPDATE SUPPLIER
========================== */
app.put('/supplier/:supplierCode', (req, res) => {

    const code = req.params.supplierCode;

    const {
        supplierName,
        telephone,
        address,
        email
    } = req.body;

    const sql = `
        UPDATE supplier
        SET supplierName=?,
            telephone=?,
            address=?,
            email=?
        WHERE supplierCode=?
    `;

    conn.query(
        sql,
        [supplierName, telephone, address, email, code],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Supplier updated successfully'
            });
        }
    );
});

/* ==========================
   DELETE SUPPLIER
========================== */
app.delete('/supplier/:supplierCode', (req, res) => {

    const code = req.params.supplierCode;

    const sql = 'DELETE FROM supplier WHERE supplierCode=?';

    conn.query(sql, [code], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Supplier deleted successfully'
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.get('/shipment', (req, res) => {
    const sql = 'SELECT * FROM shipment';

    conn.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});
app.post('/shipment', (req, res) => {

    const {
        shipmentNumber,
        shipmentDate,
        shipmentStatus,
        destination
    } = req.body;

    const sql = `
        INSERT INTO shipment
        (shipmentNumber, shipmentDate, shipmentStatus, destination)
        VALUES (?, ?, ?, ?)
    `;

    conn.query(
        sql,
        [
            shipmentNumber,
            shipmentDate,
            shipmentStatus,
            destination
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Shipment saved successfully'
            });
        }
    );
});
app.put('/shipment/:shipmentNumber', (req, res) => {

    const shipmentNumber = req.params.shipmentNumber;

    const {
        shipmentDate,
        shipmentStatus,
        destination
    } = req.body;

    const sql = `
        UPDATE shipment
        SET shipmentDate=?,
            shipmentStatus=?,
            destination=?
        WHERE shipmentNumber=?
    `;

    conn.query(
        sql,
        [
            shipmentDate,
            shipmentStatus,
            destination,
            shipmentNumber
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Shipment updated successfully'
            });
        }
    );
});
app.delete('/shipment/:shipmentNumber', (req, res) => {

    const shipmentNumber = req.params.shipmentNumber;

    const sql = `
        DELETE FROM shipment
        WHERE shipmentNumber=?
    `;

    conn.query(sql, [shipmentNumber], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Shipment deleted successfully'
        });
    });
});
app.get("/delivery", (req, res) => {
  const sql = "SELECT * FROM delivery ORDER BY deliveryDate DESC";

  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
app.post("/delivery", (req, res) => {
  const {
    deliveryCode,
    deliveryDate,
    quantityDelivered,
    deliveryStatus,
    shipmentNumber,
  } = req.body;

  const sql = `
    INSERT INTO delivery
    (deliveryCode, deliveryDate, quantityDelivered, deliveryStatus, shipmentNumber)
    VALUES (?, ?, ?, ?, ?)
  `;

  conn.query(
    sql,
    [
      deliveryCode,
      deliveryDate,
      quantityDelivered,
      deliveryStatus,
      shipmentNumber,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Delivery added successfully",
      });
    }
  );
});
app.put("/delivery/:deliveryCode", (req, res) => {
  const deliveryCode = req.params.deliveryCode;

  const {
    deliveryDate,
    quantityDelivered,
    deliveryStatus,
    shipmentNumber,
  } = req.body;

  const sql = `
    UPDATE delivery
    SET deliveryDate = ?,
        quantityDelivered = ?,
        deliveryStatus = ?,
        shipmentNumber = ?
    WHERE deliveryCode = ?
  `;

  conn.query(
    sql,
    [
      deliveryDate,
      quantityDelivered,
      deliveryStatus,
      shipmentNumber,
      deliveryCode,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Delivery updated successfully",
      });
    }
  );
});
app.delete("/delivery/:deliveryCode", (req, res) => {
  const deliveryCode = req.params.deliveryCode;

  const sql =
    "DELETE FROM delivery WHERE deliveryCode = ?";

  conn.query(sql, [deliveryCode], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Delivery deleted successfully",
    });
  });
});
app.get("/delivery/:deliveryCode", (req, res) => {
  const deliveryCode = req.params.deliveryCode;

  const sql =
    "SELECT * FROM delivery WHERE deliveryCode = ?";

  conn.query(sql, [deliveryCode], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});
app.get("/dashboard", async (req, res) => {
  try {
    conn.query(
      `
      SELECT
      (SELECT COUNT(*) FROM supplier) AS suppliers,
      (SELECT COUNT(*) FROM shipment) AS shipments,
      (SELECT COUNT(*) FROM delivery) AS deliveries
      `,
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        res.json(result[0]);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Dashboard loading failed",
    });
  }
});
app.get("/reports", (req, res) => {
  const { from, to } = req.query;

  let shipmentSql = "SELECT * FROM shipment";
  let deliverySql = "SELECT * FROM delivery";

  if (from && to) {
    shipmentSql =
      "SELECT * FROM shipment WHERE shipmentDate BETWEEN ? AND ?";

    deliverySql =
      "SELECT * FROM delivery WHERE deliveryDate BETWEEN ? AND ?";
  }

  conn.query("SELECT * FROM supplier", (err, suppliers) => {
    if (err) {
      return res.status(500).json(err);
    }

    conn.query(
      shipmentSql,
      from && to ? [from, to] : [],
      (err, shipments) => {
        if (err) {
          return res.status(500).json(err);
        }

        conn.query(
          deliverySql,
          from && to ? [from, to] : [],
          (err, deliveries) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              suppliers,
              shipments,
              deliveries,

              summary: {
                totalSuppliers: suppliers.length,
                totalShipments: shipments.length,
                totalDeliveries: deliveries.length,
              },
            });
          }
        );
      }
    );
  });
});
app.use(session({
  secret: "salepro_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.post("/register", async (req, res) => {

  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

  conn.query(sql, [username, hashedPassword], (err) => {

    if (err) return res.json({ success: false });

    res.json({
      success: true,
      message: "Account created"
    });
  });
});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  conn.query(sql, [username], async (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false, message: "DB error" });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const user = result[0];

    try {

      const match = await bcrypt.compare(password, user.password);

      console.log("MATCH:", match);

      if (!match) {
        return res.json({
          success: false,
          message: "Wrong password"
        });
      }

      req.session.user = {
        id: user.userid,
        username: user.username
      };

      return res.json({
        success: true,
        user: req.session.user
      });

    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Error comparing password"
      });
    }
  });
});


// ================= GET SESSION =================
app.get("/me", (req, res) => {

  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});


// ================= LOGOUT =================
app.post("/logout", (req, res) => {

  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });

});