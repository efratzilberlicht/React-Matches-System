

/* eslint-disable no-underscore-dangle */
const express = require('express');
const fs = require('fs');
const router = express.Router();
const BASE_DIR = __dirname.replace('middlewares', '');
const jsonPath = `${BASE_DIR}\\data\\data.json`;
const bodyParser = require('body-parser');

router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/list', (req, res) => {
  setTimeout(() => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
      res.end(data);
    });
  }, 600);
});

router.get('/get/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const item = _getItem(list, id);
    res.end(JSON.stringify(item));
  });
});

router.post('/add', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const newList = _addItem(list, item);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});

router.post('/update/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const newList = _updateItem(list, id);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});

router.post('/delete/:id', (req, res) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const newList = _deleteItem(list, id);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPath, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(jsonData);
      } else {
        res.end(data);
      }
    });
  });
});

// Private functions
const _getItem = (list, id) => {
  const currentItem = list.find(item => item.id.toString() === id.toString());
  return currentItem;
};

const _updateItem = (list, id) => {
  const newList = [...list];
  newList.find(item => item.id.toString() === id.toString()).status = false;
  return newList;
};

const _deleteItem = (list, id) => {
  const newList = [...list];
  const currentItemIndex = list.findIndex(
    item => item.id.toString() === id.toString(),
  );
  newList.splice(currentItemIndex, 1);
  return newList;
};

const _addItem = (list, addedItem) => {
  const item = { status: true, ...addedItem };
  const newList = [...list];
  newList.push(item);
  return newList;
};

module.exports = router;