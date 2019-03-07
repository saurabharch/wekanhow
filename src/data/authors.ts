import * as keyBy from 'lodash/keyBy'

export interface Author {
  avatar: string
  name: string
  job: string
  bio: string
  link: string
}

const authors: Author[] = [
  {
    avatar: require('../assets/graphics/contributors/nikolas.jpg'),
    bio:
      "Nikolas is a developer and head of content at Prisma. He is excited about GraphQL as a new API technology and has a passion for learning and sharing knowledge.",
    job: 'Developer @ Prisma',
    link: 'https://twitter.com/nikolasburk',
    name: 'Nikolas Burk',
  },
  {
    avatar: require('../assets/icons/howtographql.svg'),
    bio:
      "Experienced nodejs Developer who enjoys learning and using many other techs. Years ago fell in love in Graph Databases now sharing this emotion with Codes.",
    link: 'https://twitter.com/saurabh19867276',
    job: 'Fullstack Developer @ raindigi.com',
    name: 'saurabh kashyap'
  },
]

export default keyBy(authors, 'name')
