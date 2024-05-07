import fs from 'fs/promises';

class PeopleController {
  static index = async (req, res) => {
    try {
      const data = await fs.readFile('./data/result.json', 'utf8');
      const peoples = JSON.parse(data);
      res.render('index', {
        peoples,
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  static storePeople = async (req, res) => {
    try {
      const data = await fs.readFile('./data/result.json', 'utf8');
      const parsedData = JSON.parse(data);
      const { name, username, email } = req.body;
      if (!req.file) {
        return res.status(400).send({
          success: false,
          message: 'File must be uploaded',
        });
      }
      const { filename } = req.file;
      parsedData.push({
        id: parsedData.length + 1,
        name,
        username,
        email,
        image: filename,
      });

      await fs.writeFile(
        './data/result.json',
        JSON.stringify(parsedData),
        'utf8'
      );
      return res.status(201).send({
        success: true,
        message: 'People Created',
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static getAllPeople = async (req, res) => {
    try {
      const data = await fs.readFile('./data/result.json', 'utf8');
      return res.status(200).send(JSON.parse(data));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static getPeopleById = async (req, res) => {
    try {
      const rawData = await fs.readFile('./data/result.json', 'utf8');
      const data = JSON.parse(rawData);
      const people = data.find((people) => people.id === Number(req.params.id));
      if (people) {
        return res.status(200).send({
          success: true,
          data: people,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `People with id ${id} Not Found`,
        });
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static updatePeople = async (req, res) => {
    try {
      const rawData = await fs.readFile('./data/result.json', 'utf8');
      const data = JSON.parse(rawData);
      const peopleIndex = data.findIndex(
        (people) => people.id === Number(req.params.id)
      );
      const { name, username, email } = req.body;

      if (peopleIndex !== -1) {
        const image = req.file ? req.file.filename : data[peopleIndex].image;
        data[peopleIndex] = {
          id: Number(req.params.id),
          name,
          username,
          email,
          image,
        };
        await fs.writeFile('./data/result.json', JSON.stringify(data), 'utf8');
        return res.status(200).send({
          success: true,
          message: 'People Updated',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `People with id ${id} Not Found`,
        });
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static deletePeople = async (req, res) => {
    try {
      const rawData = await fs.readFile('./data/result.json', 'utf8');
      const data = JSON.parse(rawData);
      const peopleIndex = data.findIndex(
        (people) => people.id === Number(req.params.id)
      );
      if (peopleIndex !== -1) {
        const imagePath = `./public/uploads/${data[peopleIndex].image}`;
        await fs.unlink(imagePath);
        data.splice(peopleIndex, 1);
        await fs.writeFile('./data/result.json', JSON.stringify(data), 'utf8');
        return res.status(200).send({
          success: true,
          message: 'People Deleted',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `People with id ${id} Not Found`,
        });
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static uploadFile = async (req, res) => {
    try {
      if (req.file) {
        return res.status(200).send({
          success: true,
          message: 'File Uploaded',
          data: req.file,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'File must be uploaded',
        });
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  static cdnUploadImage = async (req, res) => {
    try {
      if (req.file) {
        const fileBase64 = req.file.buffer.toString('base64');
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, async (error, result) => {
          if (error) {
            console.error(error);
            return [];
          }
          return res.status(200).send({
            success: true,
            message: 'File Uploaded',
            data: result,
          });
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'File must be uploaded',
        });
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}

export default PeopleController;
