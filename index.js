const StoryblokClient = require('storyblok-js-client')

// Insert your oauth token and folder id
const Storyblok = new StoryblokClient({
  accessToken: process.env.PREVIEW_TOKEN
})

const startsWith = process.env.STARTS_WITH

const StoryblokApiHelper = {
  getAll(page) {
    return Storyblok.getStories({
      per_page: 25,
      starts_with: startsWith,
      page: page
    })
  }
}

async function getAllStories(){
  console.log('Beginn')
  console.log('--------')

  var page = 1
  var res = await StoryblokApiHelper.getAll(page)
  var all = res.data.stories
  var total = res.total
  var lastPage = Math.ceil((res.total / 25))

  while (page < lastPage){
    page++
    res = await StoryblokApiHelper.getAll(page)
    res.data.stories.forEach((story) => {
      all.push(story)
    })
  }

  console.log(`name;component`)

  for (var i = 0; i < all.length; i++) {
    console.log(`${all[i].name};${all[i].content.component}`)
  }

  return all
}

getAllStories().then((result) => {
  console.log('--------')
  console.log('Finished')
})