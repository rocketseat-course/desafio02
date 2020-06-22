const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = { 
    id: uuid(), 
    title: title, 
    url: url, 
    techs: techs, 
    likes: 0 
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const index = repositories.findIndex(r => r.id === id);
  const repository = repositories.find(r => r.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  };

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(r => r.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  };

  repositories.splice(index, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const index = repositories.findIndex(r => r.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  };

  repositories[index].likes = repositories[index].likes + 1;

  return response.json(repository);
});

module.exports = app;
