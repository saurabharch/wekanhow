---
title: REST API Integrations
pageTitle: REST API Integrations
description: "Learn all about GraphQL and why it is an API technology that's superior to REST. It is not only for React & Javascript developers but can be used for any API."
question: Which of these statements is true?
answers: ["GraphQL is a database technology", "GraphQL can only be used together with SQL", "GraphQL was invented by Facebook", "GraphQL was developed by Netflix and Coursera"]
correctAnswer: 2
videoId: oCT4HOJsUZQ
duration: 5
---

## In Wekan code

wekan/models/integrations.js at bottom

```
  // Get all integrations in board
  JsonRoutes.add('GET', '/api/boards/:boardId/integrations', function(req, res) {
    try {
      const paramBoardId = req.params.boardId;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      const data = Integrations.find({ boardId: paramBoardId }, { fields: { token: 0 } }).map(function(doc) {
        return doc;
      });

      JsonRoutes.sendResult(res, {code: 200, data});
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Get a single integration in board
  JsonRoutes.add('GET', '/api/boards/:boardId/integrations/:intId', function(req, res) {
    try {
      const paramBoardId = req.params.boardId;
      const paramIntId = req.params.intId;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      JsonRoutes.sendResult(res, {
        code: 200,
        data: Integrations.findOne({ _id: paramIntId, boardId: paramBoardId }, { fields: { token: 0 } }),
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Create a new integration
  JsonRoutes.add('POST', '/api/boards/:boardId/integrations', function(req, res) {
    try {
      const paramBoardId = req.params.boardId;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      const id = Integrations.insert({
        userId: req.userId,
        boardId: paramBoardId,
        url: req.body.url,
      });

      JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          _id: id,
        },
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Edit integration data
  JsonRoutes.add('PUT', '/api/boards/:boardId/integrations/:intId', function (req, res) {
    try {
      const paramBoardId = req.params.boardId;
      const paramIntId = req.params.intId;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      if (req.body.hasOwnProperty('enabled')) {
        const newEnabled = req.body.enabled;
        Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
          {$set: {enabled: newEnabled}});
      }
      if (req.body.hasOwnProperty('title')) {
        const newTitle = req.body.title;
        Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
          {$set: {title: newTitle}});
      }
      if (req.body.hasOwnProperty('url')) {
        const newUrl = req.body.url;
        Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
          {$set: {url: newUrl}});
      }
      if (req.body.hasOwnProperty('token')) {
        const newToken = req.body.token;
        Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
          {$set: {token: newToken}});
      }
      if (req.body.hasOwnProperty('activities')) {
        const newActivities = req.body.activities;
        Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
          {$set: {activities: newActivities}});
      }

      JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          _id: paramIntId,
        },
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Delete subscribed activities
  JsonRoutes.add('DELETE', '/api/boards/:boardId/integrations/:intId/activities', function (req, res) {
    try {
      const paramBoardId = req.params.boardId;
      const paramIntId = req.params.intId;
      const newActivities = req.body.activities;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
        {$pullAll: {activities: newActivities}});

      JsonRoutes.sendResult(res, {
        code: 200,
        data: Integrations.findOne({_id: paramIntId, boardId: paramBoardId}, { fields: {_id: 1, activities: 1}}),
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Add subscribed activities
  JsonRoutes.add('POST', '/api/boards/:boardId/integrations/:intId/activities', function (req, res) {
    try {
      const paramBoardId = req.params.boardId;
      const paramIntId = req.params.intId;
      const newActivities = req.body.activities;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      Integrations.direct.update({_id: paramIntId, boardId: paramBoardId},
        {$addToSet: {activities: { $each: newActivities}}});

      JsonRoutes.sendResult(res, {
        code: 200,
        data: Integrations.findOne({_id: paramIntId, boardId: paramBoardId}, { fields: {_id: 1, activities: 1}}),
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });

  // Delete integration
  JsonRoutes.add('DELETE', '/api/boards/:boardId/integrations/:intId', function (req, res) {
    try {
      const paramBoardId = req.params.boardId;
      const paramIntId = req.params.intId;
      Authentication.checkBoardAccess(req.userId, paramBoardId);

      Integrations.direct.remove({_id: paramIntId, boardId: paramBoardId});
      JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          _id: paramIntId,
        },
      });
    }
    catch (error) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: error,
      });
    }
  });
```
