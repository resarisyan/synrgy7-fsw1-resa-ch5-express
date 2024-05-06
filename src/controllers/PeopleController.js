import fs from 'fs/promises';

class PeopleController {
  static storePeople = async (req, res) => {
    try {
      const data = await fs.readFile('./data/result.json', 'utf8');
      const parsedData = JSON.parse(data);
      const { name, username, email } = req.body;

      parsedData.push({
        id: parsedData.length + 1,
        name,
        username,
        email,
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
        data[peopleIndex] = {
          id: Number(req.params.id),
          name,
          username,
          email,
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
}

export default PeopleController;