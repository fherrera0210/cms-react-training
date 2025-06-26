interface MarvelCreator {
  resourceURI: string
  name: string
  role: string
}

interface MarvelComic {
  id: number
  title: string
  issueNumber: number
  publishDate: string
  creators: MarvelCreator[]
  thumbnail: string
}

interface ComicData {
  id: string
  title: string
  coverImage: string
  author: string
  issue: number
  description: string
  publishDate: string
}

const marvelComicsData: MarvelComic[] = [
  {
    id: 100213,
    title: "Hulk Vs. Thor: Banner Of War  (Trade Paperback)",
    issueNumber: 0,
    publishDate: "2022-10-19T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/12712",
        name: "Donny Cates",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/14143",
        name: "Nadia Shammas",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/14285",
        name: "Martin Coccolo",
        role: "penciller",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/4989",
        name: "Nic Klein",
        role: "penciller",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/b0/634d57a98bda4.jpg",
  },
  {
    id: 95773,
    title: "Avengers Forever (2021) #8",
    issueNumber: 8,
    publishDate: "2022-08-24T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/11463",
        name: "Jason Aaron",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/2133",
        name: "Tom Brevoort",
        role: "editor",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/c/f0/630507910522f.jpg",
  },
  {
    id: 99641,
    title: "Avengers 1,000,000 BC (2022) #1",
    issueNumber: 1,
    publishDate: "2022-08-17T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/11463",
        name: "Jason Aaron",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/649",
        name: "Ed Mcguinness",
        role: "penciler (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/70/62f3c6a4b53d9.jpg",
  },
  {
    id: 103360,
    title: "Avengers Unlimited Infinity Comic (2022) #6",
    issueNumber: 6,
    publishDate: "2022-08-09T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/14319",
        name: "David Pepose",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/2133",
        name: "Tom Brevoort",
        role: "editor",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/50/62bf34456dee0.jpg",
  },
  {
    id: 89751,
    title: "Thor By Donny Cates Vol. 4: God Of Hammers (Trade Paperback)",
    issueNumber: 0,
    publishDate: "2022-07-27T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/12712",
        name: "Donny Cates",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/4989",
        name: "Nic Klein",
        role: "penciller (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/c/20/62dac5ca5d357.jpg",
  },
  {
    id: 92201,
    title: "Avengers (2018) #57",
    issueNumber: 57,
    publishDate: "2022-07-13T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/11463",
        name: "Jason Aaron",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/12426",
        name: "Javier Garron",
        role: "penciler (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/62b9e0de53718.jpg",
  },
  {
    id: 103356,
    title: "Avengers Unlimited Infinity Comic (2022) #2",
    issueNumber: 2,
    publishDate: "2022-07-12T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/14319",
        name: "David Pepose",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/12644",
        name: "Alan Robinson",
        role: "penciller (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/7/80/629f7ff23856e.jpg",
  },
  {
    id: 100379,
    title: "Jane Foster & the Mighty Thor (2022) #2",
    issueNumber: 2,
    publishDate: "2022-07-06T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/14017",
        name: "Torunn Gronbekk",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/13651",
        name: "Michael Dowling",
        role: "inker",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/3/30/62b9e0725e403.jpg",
  },
  {
    id: 105643,
    title: "Strange Tales: Thor & Jane Foster Infinity Comic (2022) #1",
    issueNumber: 1,
    publishDate: "2022-07-06T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/9550",
        name: "Tim Seeley",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/12741",
        name: "Ramon Bachs",
        role: "penciller (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/c/70/62a1f4c5c8ce7.jpg",
  },
  {
    id: 102424,
    title: "Thor: The Saga Of Gorr The God Butcher (Trade Paperback)",
    issueNumber: 0,
    publishDate: "2022-06-29T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/11463",
        name: "Jason Aaron",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/182",
        name: "Esad Ribic",
        role: "penciller (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/30/62b5f83107a6c.jpg",
  },
  {
    id: 101198,
    title: "Thor: Lightning and Lament (2022) #1",
    issueNumber: 1,
    publishDate: "2022-06-29T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/1282",
        name: "Ralph Macchio",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/658",
        name: "Ron Lim",
        role: "penciler (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/c/20/62b9e0abe47c3.jpg",
  },
  {
    id: 100174,
    title: "Thor: God of Thunder - The God Butcher Infinity Comic (2022) #3",
    issueNumber: 3,
    publishDate: "2022-06-21T00:00:00-0400",
    creators: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/11463",
        name: "Jason Aaron",
        role: "writer",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/182",
        name: "Esad Ribic",
        role: "penciller (cover)",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/7/60/6287bd87e66a7.jpg",
  },
]

function generateDescription(title: string): string {
  if (title.includes("Thor")) {
    return "The God of Thunder faces his greatest challenges yet in this epic tale of heroism, sacrifice, and the power of Mjolnir."
  }
  if (title.includes("Avengers")) {
    return "Earth's Mightiest Heroes assemble to face threats that no single hero could withstand alone."
  }
  if (title.includes("Hulk")) {
    return "The incredible Hulk unleashes his unlimited strength in battles that will shake the very foundations of the Marvel Universe."
  }
  if (title.includes("Jane Foster")) {
    return "Jane Foster wields the power of Thor in this compelling story of courage, determination, and heroic legacy."
  }
  return "An epic Marvel adventure featuring your favorite superheroes in action-packed storytelling."
}

function transformMarvelData(marvelComics: MarvelComic[]): ComicData[] {
  return marvelComics.map((comic) => {
    // Get primary writer
    const writer = comic.creators.find((creator) => creator.role === "writer")
    const author = writer ? writer.name : "Marvel Comics"

    // Format publish date
    const date = new Date(comic.publishDate)
    const publishDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })

    // Generate description based on title
    const description = generateDescription(comic.title)

    return {
      id: comic.id.toString(),
      title: comic.title,
      coverImage: comic.thumbnail,
      author,
      issue: comic.issueNumber,
      description,
      publishDate,
    }
  })
}

export const marvelComics = transformMarvelData(marvelComicsData)
