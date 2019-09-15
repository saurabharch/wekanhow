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
    avatar: require('../assets/graphics/contributors/saurabh.jpg'),
    bio:
      "Experienced nodejs Developer who enjoys learning and using many other techs. Years ago fell in love in Graph Databases now sharing this emotion with Codes.",
    link: 'https://twitter.com/saurabh19867276',
    // tslint:disable-next-line:object-literal-sort-keys
    job: 'Fullstack Developer @ raindigi.com',
    name: 'saurabh kashyap'
  },
]

export default keyBy(authors, 'name')
