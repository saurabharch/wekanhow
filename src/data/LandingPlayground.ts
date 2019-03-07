export const simpleQuery = (endpoint: string) => `\
---
endpoint: ${endpoint}
disabled: false
---
{
  Board(id: "cixos5gtq0ogi0126tvekxo27") {
    id
    title
    actors {
      name
    }
  }
}
---
{
  "data": {
    "Board": {
      "id": "cixos5gtq0ogi0126tvekxo27",
      "title": "Website - Pages",
      "actors": [
        {
          "name": "Home - page"
        },
        {
          "name": "Contact - page"
        },
        {
          "name": "Services - page"
        },
        {
          "name": "Aboutus - page"
        },
        {
          "name": "Solutions - page"
        }
      ]
    }
  }
}`
